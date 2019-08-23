import React from 'react';
import { formatTimestamp } from 'utilities/stringManipulation';

export const QuestionTypes = Object.freeze({
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  FREE_RESPONSE: 'FREE_RESPONSE',
});

export const SurveyTypes = Object.freeze({
  GENERAL: 'GENERAL',
  ASSET: 'ASSET',
});

export const ViewType = Object.freeze({
  EDIT: 'EDIT',
  CREATE: 'CREATE',
});

export const ViewTypeInfo = Object.freeze({
  [ViewType.EDIT]: {
    Header: 'Edit this survey:',
    SubmitButtonText: 'Update',
    Instructions: 'Edit information for an existing survey. Please refrain\
      from using this feature unless absolutely necessary as it may create data\
      inconsistency. Existing submissions will persist.',
  },
  [ViewType.CREATE]: {
    Header: 'Create a new survey:',
    SubmitButtonText: 'Create',
    Instructions: 'Define the questions for a new survey. While you will be able\
      to edit these later, please be mindful to input questions properly as editing\
      can lead to data inconsistency.',
  },
});

export const SurveyFields = Object.freeze({
  SURVEY_TITLE: 'Survey Title',
  CREATED_AT: 'Created At',
  LAST_UPDATED_AT: 'Last Update At',
  LAST_SUBMISSION_AT: 'Last Submission At',
  NUM_SUBMISSIONS: 'Number of Submissions',
  QUESTIONS: 'Questions',
});


export const SurveyColumns = [
  {
    title: 'Survey Title',
    dataIndex: 'surveyTitle',
    key: 'surveyTitle',
    width: 300,
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdatedTimestamp',
    key: 'lastUpdatedTimestamp',
    render: (timestamp) => (
      <p>{formatTimestamp(timestamp)}</p>
    ),
    width: 250,
  },
  {
    title: 'Entries',
    dataIndex: 'numberOfSubmissions',
    key: 'numberOfSubmissions',
    width: 50,
  },
  {
    title: 'Last Submission',
    dataIndex: 'lastSubmissionTimestamp',
    key: 'lastSubmissionTimestamp',
    render: (timestamp) => {
      if (!timestamp) return ;
      else return <p>{formatTimestamp(timestamp, true)}</p>;
    },
    width: 150,
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (p) => {
      console.log("p in action: ", p);
      return <p>aklsmd</p>
    },
    width: 150,
  },
];

