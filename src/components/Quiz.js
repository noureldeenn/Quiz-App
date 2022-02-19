import React, { useCallback } from "react";

import Progress from "./Progress";
import Question from "./Question";
import { useQuizContext } from "../context/QuizContext";

const Quiz = () => {
  const {
    sectionOneQuestions,
    sectionTwoQuestions,
    currentSection,
    state,
    resetQuiz,
  } = useQuizContext();

  const renderResultsData = () => {
    return Object.values(state.answerState)
      .filter((q) => q.answer)
      .map((question) => {
        return (
          <div key={question.id}>
            {question.text} - {question.answer}
          </div>
        );
      });
  };

  const sendRequest = useCallback(async () => {
    const answers = Object.values(state.answerState)
      .filter((s) => s.answer)
      .map((s) => ({
        question: s.text,
        answer: s.answer,
      }));
    const data = await fetch(
      "https://mocki.io/v1/89a9ef59-9b4a-4bd3-9cc6-cfcf4cd8e290",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      }
    ).then((res) => res.json());

    console.log({ data });
  }, [state.answerState]);

  if (state.showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={sendRequest}>
          Save
        </button>
        <button className="btn btn-primary" onClick={resetQuiz}>
          Restart
        </button>
      </div>
    );
  }
  return (
    <div className="container">
      <Progress />
      {currentSection === "section1"
        ? sectionOneQuestions.map((question) => (
            <Question
              question={question}
              isActive={state.currentQuestion === question.id}
            />
          ))
        : sectionTwoQuestions.map((question) => (
            <Question
              question={question}
              isActive={state.currentQuestion === question.id}
            />
          ))}
    </div>
  );
};

export default Quiz;
