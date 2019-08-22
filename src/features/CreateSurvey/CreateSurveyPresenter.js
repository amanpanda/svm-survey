import React from 'react';
import _ from 'lodash';
import { Button, Input, Dropdown, Menu, Icon } from 'antd';
import { ViewType, QuestionTypes } from 'constants/survey';
import MultipleChoice from './MultipleChoice';
import FreeResponse from './FreeResponse';
import './CreateSurvey.css';

const CreateSurveyPresenter = (props) => {
  const { 
    surveyData,
    editSurveyTitle,
    addMultChoice,
    addFreeRes,
    deleteQuestion,
    editQuestionStatement,
    addMultChoiceOption,
    removeMultChoiceOption,
    editMultChoiceOption,
    submitting,
    disablePublish,
    onSubmit,
  } = props;

  const {
    surveyTitle,
    questions,
  } = surveyData;

  const menu = (
    <Menu onClick={({ key }) => {
      if (key === '1') addMultChoice();
      else addFreeRes();
    }}>
      <Menu.Item key="1">
        Multiple Choice
      </Menu.Item>
      <Menu.Item key="2">
        Free Response
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className='title-wrapper'>
        <Input 
          size="large"
          placeholder="Survey title goes here."
          onChange={e => editSurveyTitle(e)}
          value={surveyTitle}
        />
      </div>
      {_.map(questions, (q, idx) => {
        if (q.type === QuestionTypes.MULTIPLE_CHOICE) {
          return (
            <MultipleChoice key={idx}
              {...{
                idx,
                questionData: surveyData.questions[idx],
                deleteQuestion,
                editQuestionStatement,
                addMultChoiceOption,
                removeMultChoiceOption,
                editMultChoiceOption,
              }}
            />
          )
        } else if (q.type === QuestionTypes.FREE_RESPONSE) {
          return (
            <FreeResponse key={idx}
              {...{
                idx,
                questionData: surveyData.questions[idx],
                deleteQuestion,
                editQuestionStatement,
              }}
            />
          )
        }
      })}
      <div className='add-question-wrapper'>
        <Dropdown overlay={menu}>
          <Button>
            Add a Question <Icon type="edit" />
          </Button>
        </Dropdown>
      </div>
      <div className='publish-wrapper'>
        <Button
          loading={submitting}
          type="primary"
          disabled={disablePublish}
          onClick={() => onSubmit(surveyData)}
        >
          Publish Survey
        </Button>
      </div>
    </div>
  )
};

export default CreateSurveyPresenter;
