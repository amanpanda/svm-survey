import React from 'react';
import _ from 'lodash';
import { Button, Input } from 'antd';
import { ViewType, QuestionTypes } from 'constants/survey';
import MultipleChoice from './MultipleChoice';
import FreeResponse from './FreeResponse';

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
  } = props;

  const {
    surveyTitle,
    questions,
  } = surveyData;
  return (
    <div>
      <Button
        type="primary"
        icon="plus" 
        size='large'
        shape="round"
        className='hi'
        onClick={() => addMultChoice()}
      >
        Add multiple choice
      </Button>
      <Button
        icon="plus" 
        size='large'
        shape="round"
        className='hi'
        onClick={() => addFreeRes()}
      >
        Add free response
      </Button>
      <Input 
        size="large"
        placeholder="Survey title goes here."
        onChange={e => editSurveyTitle(e)}
        value={surveyTitle}
      />
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
    </div>
  )
};

export default CreateSurveyPresenter;
