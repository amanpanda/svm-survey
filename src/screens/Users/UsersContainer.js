import {
  compose,
  setDisplayName,
} from 'recompose';
import UsersPresenter from './UsersPresenter';
import { withSideBar, withAuthRequired } from 'hocs';

export default compose(
  setDisplayName('UsersContainer'),
  withSideBar,
  withAuthRequired,
)(UsersPresenter);
