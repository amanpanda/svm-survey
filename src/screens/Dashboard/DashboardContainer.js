import {
  compose,
  setDisplayName,
  withState,
  withHandlers,
} from 'recompose';
import DashboardPresenter from './DashboardPresenter';
import {
  withSideBar,
  withAuthRequired,
} from 'hocs';

export default compose(
  setDisplayName('DashboardPresenter'),
  withSideBar,
  withAuthRequired,
  withState('submitting', 'setSubmitting', false),
  withState('showModal', 'setShowModal', false),
  withHandlers({
    submitNewSurvey: ({
      setSubmitting,
      setShowModal,
    }) => () => {
      setSubmitting(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitting(false);
      }, 2000);
    },
  }),
)(DashboardPresenter);
