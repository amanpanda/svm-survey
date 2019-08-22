import React from 'react';
import { Input, Button } from 'antd';

const FreeResponse = (props) => {
  const {
    idx,
    questionData: { questionStatement },
    deleteQuestion,
    editQuestionStatement,
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
    </div>
  );
};

export default FreeResponse;
