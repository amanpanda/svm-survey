import React from 'react';
import { compose } from 'recompose';
import SideBar from 'screens/SideBar';
import './styles.css';

const withSideBar = () => WrappedComponent => (props) => {
  return (
    <div className='frame'>
      <SideBar />
      <WrappedComponent {...props} />
    </div>
  )
};

const enhance = WrappedComponent => compose(
  withSideBar(),
)(WrappedComponent);

export default enhance;
