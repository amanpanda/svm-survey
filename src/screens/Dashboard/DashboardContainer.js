import {
  compose,
  setDisplayName,
  withState,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose';
import _ from 'lodash';
import {
  withSideBar,
  withAuthRequired,
  withAlerts,
  withSurvey,
} from 'hocs';
import { firestore } from 'utilities/firebase';
import { SurveyTypes } from 'constants/survey';

import DashboardPresenter from './DashboardPresenter';

export default compose(
  setDisplayName('DashboardPresenter'),
  withSideBar,
  withAuthRequired,
  withAlerts,
  withState('loading', 'setLoading', true),
  withStateHandlers(() => ({ surveyList: [] }), {
    setSurveyList: () => surveyList => ({ surveyList }),
  }),
  lifecycle({
    async componentDidMount() {
      const {
        setSurveyList,
        setLoading,
      } = this.props;
      this.surveysListener = await firestore.collection('surveys').onSnapshot(qs => {
        setLoading(true);
        const surveyList = _.map(qs.docs, (doc, key) => ({ 
          ...doc.data(),
          key,
          documentId: doc.id,
        }));
        setSurveyList(surveyList);
        setLoading(false);
      });
    },
    componentWillUnmount () {
      this.surveysListener();
    },
  }),
  withState('submitting', 'setSubmitting', false),
  withState('showModal', 'setShowModal', false),
  withHandlers({
    submitNewSurvey: ({
      setSubmitting,
      setShowModal,
      setError,
      setSuccess,
    }) => async (surveyData) => {
      setSubmitting(true);
      const timestamp = Date.now()
      const preppedSurvey = {
        ...surveyData,
        numberOfSubmissions: 0,
        createdAtTimestamp: timestamp,
        lastUpdatedTimestamp: timestamp,
        lastSubmissionTimestamp: null,
        live: true,
        surveyType: SurveyTypes.GENERAL,
      }
      try {
        const res = await firestore.collection('surveys').add({
          ...preppedSurvey,
        });
        setShowModal(false);
        setSuccess("Successfully published survey!");
      } catch {
        setError("Something went wrong while trying\
          to publish the survey. Please try again later.")
      } finally {
        setSubmitting(false);
      }
    },
  }),
  withSurvey(),
)(DashboardPresenter);
