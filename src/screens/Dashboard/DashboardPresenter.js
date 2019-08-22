import React from 'react';
import './Dashboard.css';
import { Header } from '../';
import { Button, Modal } from 'antd';
import { auth } from 'utilities/firebase';
import { CreateSurvey } from 'features';
import { ViewType } from 'constants/survey';

const DashboardPresenter = (props) => {
  const {
    submitting,
    showModal,
    setShowModal,
    submitNewSurvey,
  } = props;

  return (
    <div className='dashboard-wrapper'>
      <Header title='Dashboard'/>
      <div className='dashboard-content'>
         <Modal
          title="Create a New Survey"
          visible={showModal}
          confirmLoading={submitting}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="close" onClick={() => setShowModal(false)}>
              Cancel
            </Button>,
          ]}
        >
          <CreateSurvey 
            view={ViewType.CREATE}
            onSubmit={(surveyData) => submitNewSurvey(surveyData)}
          />
        </Modal>
        <div className='create-container'>
          <Button
            type="primary"
            icon="plus" 
            size='large'
            shape="round"
            className='create'
            onClick={() => setShowModal(true)}
          >
            Create
          </Button>
        </div>
        <div className='view-survey-container'>
          <div className='view-survey'>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPresenter;
