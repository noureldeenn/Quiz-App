import React from "react";
import { useQuizContext } from "../context/QuizContext";
import Answer from "./Answer";

function Question({ question, isActive }) {
  const { state, submitAnswer, chooseAnswer } = useQuizContext();
  const renderError = () => {
    if (!state.error) {
      return;
    }

    return <div className="error">{state.error}</div>;
  };

  const handleChange = (e) => {
    chooseAnswer(question.id, e.target.value);
  };
  return (
    <>
      <h1>{question.text}</h1>
      {question.options.map((answer) => (
        <Answer
          questionKey={question.id}
          answer={answer}
          isActive={isActive}
          selected={question.answer === answer}
        />
      ))}
      {question.type === "INPUT" ? (
        <input type="number" onChange={handleChange} min="0" />
      ) : null}
      {renderError()}
      {isActive ? (
        <button className="btn btn-primary" onClick={submitAnswer}>
          Submit
        </button>
      ) : null}
    </>
  );
}

export default Question;
