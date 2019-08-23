import React from 'react';
import './Dashboard.css';
import { Header } from '../';
import { Button, Modal, Spin, Table } from 'antd';
import { CreateSurvey } from 'features';
import { ViewType } from 'constants/survey';

const DashboardPresenter = (props) => {
  const {
    loading,
    submitting,
    showModal,
    setShowModal,
    submitNewSurvey,
    surveyList,
    columns,
  } = props;
  return (
    <div className='dashboard-wrapper'>
      <Header title='Dashboard'/>
      <div className='dashboard-content'>
        <Modal
          title="Create a New Survey"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={[]}
        >
          <CreateSurvey 
            {...{ submitting }}
            view={ViewType.CREATE}
            onSubmit={(surveyData) => submitNewSurvey(surveyData)}
          />
        </Modal>
        <div className='create-container'>
          <Button
            type="primary"
            icon="plus" 
            size='large'
            shape="round"
            className='create'
            onClick={() => setShowModal(true)}
          >
            Create
          </Button>
        </div>
        <div className='view-survey-container'>
          <div className='view-survey'>
            <Table
              dataSource={surveyList}
              {...{ loading, columns }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPresenter;
