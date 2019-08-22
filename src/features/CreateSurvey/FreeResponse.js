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
    <div>
      <h1>Question {idx + 1}</h1>
      <Button
        ghost
        type="danger"
        shape="round" 
        icon="delete"
        onClick={() => deleteQuestion(idx)}
      >
        Delete
      </Button>
      <Input
        placeholder="What is your question?"
        value={questionStatement}
        onChange={e => editQuestionStatement(e, idx)}
      />
    </div>
  );
};

export default FreeResponse;
