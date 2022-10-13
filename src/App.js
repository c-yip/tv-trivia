import React, { useState, useEffect } from "react";
import './App.css';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizData, setQuizData] = useState();

  function startGame() {
    setQuizStart(prev => !prev);
  }

  // fetch quiz data from API and add to state
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=14&type=multiple')
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, []);

  console.log(quizData);

  return (
    <main>
      {quizStart && <IntroPage startGame={startGame}/>}    
      {!quizStart && <QuizPage />}
      {/* footer */}
    </main>
  );
}

export default App;
