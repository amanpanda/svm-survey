import {
  compose,
  setDisplayName,
} from 'recompose';
import AssetsPresenter from './AssetsPresenter';
import { withSideBar, withAuthRequired } from 'hocs';

export default compose(
  setDisplayName('AssetsContainer'),
  withSideBar,
  withAuthRequired,
)(AssetsPresenter);
