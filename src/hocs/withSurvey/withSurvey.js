import React from 'react';
import _ from 'lodash';
import {
  compose,
  withState,
  mapProps,
  withHandlers,
} from 'recompose';
import {
  Modal,
  Tag,
  Switch,
  Button,
  Popconfirm,
  Select,
  Option,
  Popover,
  Icon,
} from 'antd';
import { withAlerts } from 'hocs';
import { CreateSurvey } from 'features';
import { firestore } from 'utilities/firebase';
import { ViewType, SurveyTypes } from 'constants/survey';
import { formatTimestamp } from 'utilities/stringManipulation';

const withSurvey = isAssetScreen => WrappedComponent => (props) => {
  const {
    showEditModal,
    setShowEditModal,
    editSubmitting,
    toggleSurveyVisibility,
    exportSurveyData,
    deleteSurveyData,
    toggleEnableSurvey,
    surveyInitialData,
    submitEditedSurvey,
  } = props;

  let columns = [
    {
      title: !isAssetScreen ? 'Survey Title' : 'Subcategories',
      dataIndex: 'surveyTitle',
      key: 'surveyTitle',
      width: 250,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdatedTimestamp',
      key: 'lastUpdatedTimestamp',
      render: (timestamp) => <p>{formatTimestamp(timestamp)}</p>,
      width: 200,
    },
    {
      title: 'Entries',
      dataIndex: 'numberOfSubmissions',
      key: 'numberOfSubmissions',
      width: 25,
    },
    {
      title: 'Last Submission',
      dataIndex: 'lastSubmissionTimestamp',
      key: 'lastSubmissionTimestamp',
      render: (timestamp) => {
        if (!timestamp) return ;
        else return <p>{formatTimestamp(timestamp, true)}</p>;
      },
      width: 150,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (surveyData) => {
        const { live } = surveyData;
        return (
          <div className='actions-wrapper'>
            {!isAssetScreen && (<Switch 
              checked={live}
              // size="small"
              onClick={() => toggleSurveyVisibility(surveyData)}
            >&nbsp;&nbsp;Live</Switch>)}
            <Popover
              placement="bottom"
              title={"Options"}
              trigger="click"
              content={(
                <div>
                  <Button 
                    size="small"
                    type="link"
                    onClick={() => exportSurveyData(surveyData)}
                  >
                    Export CSV
                  </Button>
                  <Button 
                    size="small"
                    type="link"
                    onClick={() => toggleEnableSurvey(surveyData)}
                  >
                    Edit
                  </Button>
                  {!isAssetScreen && (<Popconfirm
                    title="Are you sure delete this survey? All submissions will also be deleted."
                    onConfirm={() => deleteSurveyData(surveyData)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                     <Button 
                      size="small"
                      type="link"
                    >
                      Delete
                    </Button>
                  </Popconfirm>)}
                </div>
              )}
            >
                <Button 
                  icon="form"
                  size="small"
                  type="dashed"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Edit
                </Button>
            </Popover>
          </div>
        )
      },
      width: 200,
    },
  ];
  if (isAssetScreen) {
    columns = _.filter(columns, c => c.title != 'Last Updated');
  }

  return (
    <div>
      { showEditModal && <Modal
        title="Edit Survey"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={[]}
      >
        <CreateSurvey 
          {...{ submitting: editSubmitting, surveyInitialData }}
          view={ViewType.EDIT}
          onSubmit={(surveyData) => submitEditedSurvey(surveyData)}
        />
      </Modal>}
      <WrappedComponent
        {...props}
        columns={columns}
      />
    </div>
  )
};

const enhance = (isAssetScreen) => WrappedComponent => compose(
  withState('showEditModal', 'setShowEditModal', false),
  withState('editSubmitting', 'setEditSubmitting', false),
  withAlerts,
  withState('surveyInitialData', 'setSurveyInitialData', {
    surveyTitle: '',
    questions: [],
  }),
  withHandlers({
    toggleEnableSurvey: ({
      setShowEditModal,
      setSurveyInitialData
    }) => (surveyData) => {
      setSurveyInitialData({ ...surveyData });
      setShowEditModal(true)
    },
    toggleSurveyVisibility: ({
      setError,
      setSuccess,
    }) => async (surveyData) => {
      const {
        live: currentLiveState,
        surveyType,
        documentId,
      } = surveyData;
      if (surveyType === SurveyTypes.GENERAL) {
        try {
          const res = await firestore.collection('surveys').doc(documentId).update({
            live: !currentLiveState
          });
          if (currentLiveState) {
            setSuccess("The survey is no longer live.");
          } else {
            setSuccess("The survey is live!");
          }
        } catch (err) {
          setError("Something went wrong while trying\
            to update the survey. Please try again later.")
        }
      } 
    },
    exportSurveyData: ({
      setError,
      setSuccess,
    }) => (surveyData) => {
      // To do.
      console.log("Call csv build here.")
    },
    deleteSurveyData: ({
      setError,
      setSuccess,
    }) => async (surveyData) => {
      const {
        live: currentLiveState,
        surveyType,
        documentId,
      } = surveyData;
      if (surveyType === SurveyTypes.GENERAL) {
        try {
          const res = await firestore.collection('surveys').doc(documentId).delete();
          setSuccess("Successfully deleted survey.")
        } catch (err) {
          setError("Something went wrong while trying\
            to delete the survey. Please try again later.")
        }
      }
    },
    submitEditedSurvey: ({
      setError,
      setSuccess,
      setEditSubmitting,
      setShowEditModal,
    }) => async (surveyData) => {
      setEditSubmitting(true)
      const {
        live: currentLiveState,
        surveyType,
        documentId,
      } = surveyData;
      const timestamp = Date.now()
      if (surveyType === SurveyTypes.GENERAL) {
        try {
          const res = await firestore.collection('surveys').doc(documentId).set({
            ...surveyData,
            lastUpdatedTimestamp: timestamp,
          });
          setSuccess("Successfully updated survey.");
          setShowEditModal(false);
        } catch (err) {
          setError("Something went wrong while trying\
            to update the survey. Please try again later.")
        } finally {
          setEditSubmitting(false);
        }
      } else if (surveyType === SurveyTypes.ASSET) { // To do.
        const {
          category,
          subcategory
        } = surveyData;
        const toWriteId = category + ' ' + subcategory;
        try {
          const res = await firestore.collection('assets').doc(toWriteId).set({
            ...surveyData,
            lastUpdatedTimestamp: timestamp,
          });
          setSuccess("Successfully updated survey.");
          setShowEditModal(false);
        } catch (err) {
          setError("Something went wrong while trying\
            to update the survey. Please try again later.")
        } finally {
          setEditSubmitting(false);
        }
      }
    },
  }),
  withSurvey(isAssetScreen),
)(WrappedComponent);

export default enhance;
