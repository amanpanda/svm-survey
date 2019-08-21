import {
  compose,
  setDisplayName,
  withProps,
  withHandlers,
} from 'recompose';
import SideBarPresenter from './SideBarPresenter';
import { withRouter } from 'react-router-dom';
import { auth } from 'utilities/firebase';

export default compose(
  setDisplayName('SideBarPresenter'),
  withRouter,
  withProps(({ location }) => {
    const currPath = location.pathname;
    return { currPath };
  }),
  withHandlers({
    onLogOut: ({ history }) => async () => {
      try {
        const res = auth.signOut();
        console.log("res log out: ", res);
        history.push('/');
      } catch (err) {
        console.log("err logging out: ", err);
      }
    },
  }),
)(SideBarPresenter);
