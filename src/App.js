import React, { useState } from "react";
import './App.css';
import IntroPage from './components/IntroPage';

function App() {
  const [quizStart, setQuizStart] = useState(true);
  
  function startGame() {
    setQuizStart(prev => !prev);
  }

  return (
    <main>
      {quizStart && <IntroPage startGame={startGame}/>}    
      {!quizStart && <p>questions page</p>}
    </main>
  );
}

export default App;
