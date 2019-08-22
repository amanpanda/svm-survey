import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';

const MultipleChoice = (props) => {
  const {
    idx,
    questionData: {
      answerChoices,
      questionStatement,
    },
    deleteQuestion,
    editQuestionStatement,
    addMultChoiceOption,
    removeMultChoiceOption,
    editMultChoiceOption,
  } = props;
  return (
    <div className='question-wrapper'>
      <div className='question-header'>
        <p className='question-title'>Question {idx + 1}</p>
        <Button
          ghost
          type="danger"
          shape="round" 
          icon="delete"
          onClick={() => deleteQuestion(idx)}
          className='delete-question'
        />
      </div>
      <div className='survey-section-wrapper'>
        <Input
          placeholder="What is your question?"
          value={questionStatement}
          onChange={e => editQuestionStatement(e, idx)}
        />
      </div>
      <div className='survey-section-wrapper'>
        <Button
          shape="circle"
          icon="plus"
          onClick={() => answerChoices.length < 10 ? addMultChoiceOption(idx) : null}
        />
        <Button
          shape="circle"
          icon="minus"
          onClick={() => answerChoices.length > 2 ? removeMultChoiceOption(idx) : null}
        />
      </div>
      <div className='survey-section-wrapper'>
        {_.map(answerChoices, (ac, acIdx) => (
          <div key={acIdx} className='mcq-option'>
            <Input
              placeholder="Write a possible answer choice here."
              value={ac}
              onChange={e => editMultChoiceOption(e, idx, acIdx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
