import React, {
  createContext,
  useReducer,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { quizReducer, initialState } from "../reducers/QuizReducer";
import {
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "../reducers/types.js";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const currentSection = useMemo(
    () =>
      state.answerState[state.currentQuestion] &&
      state.answerState[state.currentQuestion].position,
    [state.answerState, state.currentQuestion]
  );

  const sectionOneQuestions = useMemo(
    () =>
      Object.values(state.answerState).filter(
        (q) =>
          q.position === "section1" && state.answeredQuestions.includes(q.id)
      ),
    [state.answerState, state.answeredQuestions]
  );

  const sectionTwoQuestions = useMemo(
    () =>
      Object.values(state.answerState).filter(
        (q) =>
          q.position === "section2" && state.answeredQuestions.includes(q.id)
      ),
    [state.answerState, state.answeredQuestions]
  );

  const setError = useCallback((error) => {
    dispatch({
      type: SET_ERROR,
      error,
    });
  }, []);

  const chooseAnswer = useCallback(
    (questionKey, answer) => {
      setError(null);
      dispatch({
        type: SET_CURRENT_ANSWER,
        question: questionKey,
        answer,
      });
    },
    [setError]
  );
  const setShowResults = useCallback(() => {
    dispatch({
      type: SET_SHOW_RESULTS,
      showResults: true,
    });
  }, []);
  const submitAnswer = useCallback(() => {
    const questions = Object.keys(state.answerState);
    let currentQuestionIndex = questions.findIndex(
      (q) => state.currentQuestion === q
    );
    if (!state.answerState[state.currentQuestion].answer) {
      setError("Please answer the question");
      return;
    }

    if (
      (state.currentQuestion === "businessModel" &&
        state.answerState.businessModel.answer === "B2C") ||
      (state.currentQuestion === "allAgeBrackets" &&
        state.answerState.businessModel.answer === "B2B") ||
      (state.currentQuestion === "haveInvestment" &&
        state.answerState.haveInvestment.answer === "no")
    ) {
      currentQuestionIndex += 1;
    }
    if (!questions[currentQuestionIndex + 1]) {
      setShowResults();
    }
    dispatch({
      type: SET_CURRENT_QUESTION,
      currentQuestion: questions[currentQuestionIndex + 1],
    });
  }, [state.answerState, state.currentQuestion, setError, setShowResults]);

  const resetQuiz = useCallback(() => {
    dispatch({
      type: RESET_QUIZ,
    });
  }, []);

  const values = useMemo(
    () => ({
      state,
      sectionOneQuestions,
      sectionTwoQuestions,
      currentSection,
      chooseAnswer,
      submitAnswer,
      setError,
      setShowResults,
      resetQuiz,
    }),
    [
      state,
      sectionOneQuestions,
      sectionTwoQuestions,
      currentSection,
      chooseAnswer,
      submitAnswer,
      setError,
      setShowResults,
      resetQuiz,
    ]
  );

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const {
    state,
    sectionOneQuestions,
    sectionTwoQuestions,
    currentSection,
    chooseAnswer,
    submitAnswer,
    setError,
    setShowResults,
    resetQuiz,
  } = useContext(QuizContext);
  return {
    state,
    sectionOneQuestions,
    sectionTwoQuestions,
    currentSection,
    chooseAnswer,
    submitAnswer,
    setError,
    setShowResults,
    resetQuiz,
  };
};

export default QuizProvider;
