import React from 'react';
import {
  compose, 
  withHandlers } from 'recompose';
import { ToastContainer, toast } from 'react-toastify';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const withAlerts = WrappedComponent => (props) => {
  return (
    <div className='with-alerts'>
      <WrappedComponent {...props} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  )
};

const enhance = WrappedComponent => compose(
  withAlerts,
  withHandlers({
    setError: () => msg => toast.error(msg, toastConfig),
    setInfo: () => msg => toast.info(msg, toastConfig),
    setSuccess: () => msg => toast.success(msg, toastConfig),
  }),
)(WrappedComponent);

export default enhance;
