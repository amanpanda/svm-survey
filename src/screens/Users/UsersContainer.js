import {
  compose,
  setDisplayName,
  withState,
  withProps,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';
import _ from 'lodash';
import UsersPresenter from './UsersPresenter';
import { Form } from 'antd';
import {
  auth,
  firestore,
} from 'utilities/firebase';
import { withSideBar, withAuthRequired, withAlerts } from 'hocs';

export default compose(
  setDisplayName('UsersContainer'),
  Form.create({ name: 'normal_login' }),
  withSideBar,
  withAuthRequired,
  withAlerts,
  withState('loading', 'setLoading', false),
  withStateHandlers(() => ({ usersList: [] }), {
    setUsersList: () => usersList => ({ usersList }),
  }),
  lifecycle({
    async componentDidMount() {
      const {
        setUsersList,
        setLoading,
      } = this.props;
      this.usersListener = await firestore.collection('users').onSnapshot(qs => {
        setLoading(true);
        const usersList = _.map(qs.docs, (doc, key) => ({
          key,
          ...doc.data(),
        }));
        setUsersList(usersList);
        setLoading(false);
      });
    },
    componentWillUnmount () {
      this.usersListener();
    },
  }),
  withStateHandlers(() => ({
    username: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  }),{
    setIsAdmin: () => (isAdmin) => ({ isAdmin }),
    setUsername: () => (s) => ({ username: s.target.value }),
    setPassword: () => (s) => ({ password: s.target.value }),
    setConfirmPassword: () => (s) => ({ confirmPassword: s.target.value }),
    clearAllFields: () => () => ({
      username: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
    }),
  }),
  withProps(({ username, password, confirmPassword }) => {
    if (username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      return { disableSubmit: true };
    } else if (!_.endsWith(username, '@smartvillagemovement.org')) {
      return { disableSubmit: true };
    } else if (password.length < 6 || password !== confirmPassword) {
      return { disableSubmit: true };
    } else return { disableSubmit: false };
  }),
  withHandlers({
    submitNewUser: ({ username, password, isAdmin, setError, setSuccess, clearAllFields }) => async () => {
      try {
        const res = await auth.createUserWithEmailAndPassword(username, password);
        const {
          user: {
            email,
            uid,
          },
        } = res;
        await firestore.collection('users').doc(uid).set({
          email,
          uid,
          isAdmin,
        });
        setSuccess("Successfully created new user.");
        clearAllFields();
      } catch (error) {
        setError("Something went wrong while trying to create the new user.");
      } 
    },
  }),
)(UsersPresenter);
