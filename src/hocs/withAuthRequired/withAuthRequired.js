import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import { auth } from 'utilities/firebase';

const enhance = WrappedComponent => compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      const { history } = this.props;
      auth.onAuthStateChanged(user => {
        if (!user) {
          history.push('/');
        }
      });
    }
  }),
)(WrappedComponent);

export default enhance;
