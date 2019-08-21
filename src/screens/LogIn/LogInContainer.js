import {
  compose,
  setDisplayName,
  withHandlers,
  withState,
} from 'recompose';
import LogInPresenter from './LogInPresenter';
import { Form } from 'antd';
import { auth } from 'utilities/firebase';
import { withRouter } from 'react-router-dom';
import { withAlerts } from 'hocs';

export default compose(
  setDisplayName('LogInContainer'),
  Form.create({ name: 'normal_login' }),
  withRouter,
  withState('disableLogIn', 'setDisableLogIn', false),
  withAlerts,
  withHandlers({
    onSubmit: ({ form, history, setDisableLogIn, setError }) => (e) => {
      e.preventDefault();
      const { validateFields } = form;
      validateFields(async (err, values) => {
        const { username, password } = values;
        setDisableLogIn(true);
        try {
          const res = await auth.signInWithEmailAndPassword(username, password);
          setDisableLogIn(false);
          history.push('/Dashboard');
        } catch (err) {
          const { code } = err;
          setDisableLogIn(false);
          setError("Could not log in. Your username and password combination was incorrect.")
        } 
      });
    },
  }),
)(LogInPresenter);
