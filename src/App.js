import React from "react";
import QuizProvider from "./context/QuizContext";
import Quiz from "./components/Quiz";

import "./App.css";

function App() {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
}

export default App;
