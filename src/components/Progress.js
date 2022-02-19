import React from "react";
import { useQuizContext } from "../context/QuizContext";

function Progress() {
  const { currentSection } = useQuizContext();
  return <h2>Section {currentSection === "section1" ? 1 : 2} of 2</h2>;
}

export default Progress;
