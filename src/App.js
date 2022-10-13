import React, { useState, useEffect } from "react";
import './App.css';
import { nanoid } from 'nanoid';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizData, setQuizData] = useState();

  function startGame() {
    setQuizStart(prev => !prev);
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=14&type=multiple')
      .then(res => res.json())
      .then(data => setQuizData(
        data.results.map((question, index) => {
          return {
            id: nanoid(),
            question: question.question,
            answers: 
              [{answer: question.correct_answer, correct: true},
              {answer: question.incorrect_answers[0], correct: false},
              {answer: question.incorrect_answers[1], correct: false},
              {answer: question.incorrect_answers[2], correct: false}]
          }
        })
      ))
  }, []);

  console.log(quizData);

  return (
    <main>
      {quizStart && <IntroPage startGame={startGame}/>}    
      {!quizStart && 
        <div className="quiz-page">
          {quizData.map((question, index) => {
            return <QuizPage key={index} question={question} id={question.id}/>
          })}
          <button className="check-answers-btn">Check answers</button>
        </div>
      }
      {/* footer */}
    </main>
  );
}

export default App;
