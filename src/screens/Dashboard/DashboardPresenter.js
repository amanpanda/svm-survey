import React from 'react';
import './Dashboard.css';
import { Header } from '../';
import { Button } from 'antd';
import { auth } from 'utilities/firebase';

const DashboardPresenter = (props) => {
  return (
    <div className='dashboard-wrapper'>
      <Header title='Dashboard'/>
      <div className='dashboard-content'>
        <div className='create-container'>
          <Button
            type="primary"
            icon="plus" 
            size='large'
            shape="round"
            className='create'
            onClick={() => console.log(auth.currentUser)}
          >
            Create
          </Button>
        </div>
        <div className='view-survey-container'>
          <div className='view-survey'>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPresenter;
