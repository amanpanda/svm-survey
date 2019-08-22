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
    <div>
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
      </div>
      <Input
        placeholder="What is your question?"
        value={questionStatement}
        onChange={e => editQuestionStatement(e, idx)}
      />
      <div>
        {_.map(answerChoices, (ac, acIdx) => (
          <div key={acIdx}>
            <Input
              placeholder="Write a possible answer choice here."
              value={ac}
              onChange={e => editMultChoiceOption(e, idx, acIdx)}
            />
          </div>
        ))}
      </div>
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
  );
};

export default MultipleChoice;
