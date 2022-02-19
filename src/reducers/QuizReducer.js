import {
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "./types.js";

const initialState = {
  answerState: {
    businessModel: {
      id: "businessModel",
      text: "Is your business model B2C or B2B or both?",
      options: ["B2C", "B2B", "both"],
      type: "SELECT",
      position: "section1",
      answer: null,
    },
    allAgeBrackets: {
      id: "allAgeBrackets",
      text: "Do you target all age brackets?",
      options: ['yes', 'no'],
      type: "SELECT",
      position: "section1",
      answer: null,
    },
    allIndustries: {
      id: "allIndustries",
      text: "Do you target all industries?",
      options: ['yes', 'no'],
      type: "SELECT",
      position: "section1",
      answer: null,
    },
    haveInvestment: {
      id: "haveInvestment",
      text: "Did you have an investment?",
      options: ['yes', 'no'],
      position: "section2",
      type: "SELECT",
      answer: null,
    },
    quantityOfInvestment: {
      id: "quantityOfInvestment",
      text: "how much was the investment?",
      options: [],
      type: "INPUT",
      position: "section2",
      answer: null,
    },
  },
  currentQuestion: "businessModel",
  answeredQuestions: ["businessModel"],
  error: null,
  showResults: false,
};

function quizReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        answerState: {
          ...state.answerState,
          [action.question]: {
            ...state.answerState[action.question],
            answer: action.answer,
          },
        },
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.currentQuestion,
        answeredQuestions: [...state.answeredQuestions, action.currentQuestion]
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.showResults,
      };
    case RESET_QUIZ:
      return initialState;
    default:
      return state;
  }
}

export { quizReducer, initialState };
