import {
  compose,
  setDisplayName,
  mapProps,
  lifecycle,
  withProps,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import _ from 'lodash';
import CreateSurveyPresenter from './CreateSurveyPresenter';
import { ViewType, QuestionTypes } from 'constants/survey';

export default compose(
  setDisplayName('CreateSurveyPresenter'),
  withStateHandlers(({ view }) => {
    if (view === ViewType.EDIT) {
      // We're editing a survey, return surveyData from firestore
      return { surveyData: {} };
    } else if (view === ViewType.CREATE) {
      return {
        surveyData: {
          surveyTitle: '',
          questions: [],
        }
      }
    }
  }, {
    editSurveyTitle: ({ surveyData }, _props) => (s) => {
      s.preventDefault();
      return {
        surveyData: {
          ...surveyData,
          surveyTitle: s.target.value,
        },
      };
    },
    addMultChoice: ({ surveyData }, _props) => () => ({
      surveyData: {
        ...surveyData,
        questions: [...surveyData.questions, {
          type: QuestionTypes.MULTIPLE_CHOICE,
          questionStatement: '',
          answerChoices: ['', ''],
        }]
      }
    }),
    addFreeRes: ({ surveyData }, _props) => () => ({
      surveyData: {
        ...surveyData,
        questions: [...surveyData.questions, {
          type: QuestionTypes.FREE_RESPONSE,
          questionStatement: '',
        }]
      }
    }),
    deleteQuestion: ({ surveyData }, _props) => (idx) => {
      const { questions } = surveyData;
      questions.splice(idx, 1);
      return {
        surveyData: {
          ...surveyData,
          questions,
        }
      }
    },
    editQuestionStatement: ({ surveyData }, _props) => (s, idx) => {
      s.preventDefault();
      const { questions } = surveyData;
      questions[idx].questionStatement = s.target.value;
      return {
        surveyData: {
          ...surveyData,
          questions,
        }
      }
    },
    addMultChoiceOption: ({ surveyData }, _props) => (idx) => {
      const { questions } = surveyData;
      questions[idx].answerChoices.push('');
      return {
        surveyData: {
          ...surveyData,
          questions,
        }
      }
    },
    removeMultChoiceOption: ({ surveyData }, _props) => (idx) => {
      const { questions } = surveyData;
      questions[idx].answerChoices.pop();
      return {
        surveyData: {
          ...surveyData,
          questions,
        }
      }
    },
    editMultChoiceOption: ({ surveyData }, _props) => (s, questionIdx, optionIdx) => {
      s.preventDefault();
      const { questions } = surveyData;
      questions[questionIdx].answerChoices[optionIdx] = s.target.value;
      return {
        surveyData: {
          ...surveyData,
          questions,
        },
      };
    },
  }),
)(CreateSurveyPresenter);
  