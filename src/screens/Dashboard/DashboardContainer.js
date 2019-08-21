import {
  compose,
  setDisplayName,
  lifecycle,
} from 'recompose';
import DashboardPresenter from './DashboardPresenter';
import {
  withSideBar,
  withAuthRequired,
} from 'hocs';

let welcomeShown = false;

export default compose(
  setDisplayName('DashboardPresenter'),
  withSideBar,
  withAuthRequired,
)(DashboardPresenter);
