import React, { useState, useEffect } from "react";
import './App.css';
import { nanoid } from 'nanoid';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [quizStart, setQuizStart] = useState(true);
  const [quizData, setQuizData] = useState();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=14&type=multiple')
      .then(res => res.json())
      .then(data => setQuizData(
        data.results.map((question) => {
          return {
            id: nanoid(),
            question: question.question,
            answers: 
              [{answer: question.correct_answer, correct: true},
              {answer: question.incorrect_answers[0], correct: false},
              {answer: question.incorrect_answers[1], correct: false},
              {answer: question.incorrect_answers[2], correct: false}],
            correctAnswer: false,
          }
        }),

        setGameReady(true)
      ))
  }, []);

  function mixAnswers(array) {
    const mixedArray = array.sort(() => Math.random() - 0.5);
    return mixedArray;
  }

  function startGame() {
    setQuizStart(prev => !prev);
    setQuizData(prev => prev.map((question) => {
      return {
        ...question,
        answers: mixAnswers(question.answers)
      }
    }))
  }

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setQuizData(prev => {
      return prev.map((question) => question.id === name ? {
        ...question,
        correctAnswer: type === 'checkbox' ? checked : value
      } : question)
    })
  }

  function showWhichAnswersAreCorrect() {
    quizData.map(question => question.answers.map((answer, index) => {
      let answerElement = document.getElementById(question.id + index);
      
      if (answer.correct === true) {
        answerElement.nextSibling.style.color = 'green';
      }

      if (answerElement.checked && answer.correct === false) {
        answerElement.nextSibling.style.color = 'red';
      }
    }))
  }
  
  function calculateScore() {
    const correctAnswers = quizData.filter((question) => question.correctAnswer === 'true');
    setScore(correctAnswers.length);
    showWhichAnswersAreCorrect();
    setGameOver(true);
  }

  console.log(quizData);
  console.log('score: ', score);

  return (
    <main>
      {quizStart && <IntroPage startGame={startGame} gameReady={gameReady}/>}    
      {!quizStart && 
        <div className="quiz-page">
          {quizData.map((question, index) => {
            return <QuizPage key={index} question={question} id={question.id} handleChange={handleChange}/>
          })}
          {!gameOver ? <button className="check-answers-btn" onClick={calculateScore}>Check answers</button> : 
            <button className="play-again-btn">Play again</button>}
          {gameOver && <h3 className="score-message">{`You scored ${score}/5!`}</h3>}
        </div>
      }
      {/* footer */}
    </main>
  );
}

export default App;
