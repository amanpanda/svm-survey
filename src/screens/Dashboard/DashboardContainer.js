import {
  compose,
  setDisplayName,
  withState,
  withHandlers,
} from 'recompose';
import {
  withSideBar,
  withAuthRequired,
  withAlerts,
} from 'hocs';
import { firestore } from 'utilities/firebase';

import DashboardPresenter from './DashboardPresenter';

export default compose(
  setDisplayName('DashboardPresenter'),
  withSideBar,
  withAuthRequired,
  withAlerts,
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
        lastSubmissionTimestamp: null
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
)(DashboardPresenter);
