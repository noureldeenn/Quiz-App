import React from "react";
import { useQuizContext } from "../context/QuizContext";

function Answer({ answer, selected, questionKey, isActive }) {
  const { chooseAnswer } = useQuizContext();
  let classes = ["answer"];

  const handleClick = (e) => {
    chooseAnswer(questionKey, e.target.value);
  };

  if (selected) {
    classes.push("selected");
  }
  return (
    <button
      value={answer}
      disabled={!isActive}
      className={classes.join(" ")}
      onClick={handleClick}
    >
      {answer}
    </button>
  );
}

export default Answer;
