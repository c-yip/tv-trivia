import React, { useState } from "react";
import './App.css';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [quizStart, setQuizStart] = useState(true);
  
  function startGame() {
    setQuizStart(prev => !prev);
  }

  return (
    <main>
      {quizStart && <IntroPage startGame={startGame}/>}    
      {!quizStart && <QuizPage />}
    </main>
  );
}

export default App;
