import React, { useState } from "react";
import QuizProvider from "./context/QuizContext";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  return (
    <QuizProvider>
      {showBtn && (
        <div className="container">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowQuiz(true);
              setShowBtn(false);
            }}
          >
            generate business
          </button>
        </div>
      )}
      {showQuiz && <Quiz />}
    </QuizProvider>
  );
}

export default App;
