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
  const [gameReset, setGameReset] = useState(false);
  const [scoreArray, setScoreArray] = useState(
    () => JSON.parse(localStorage.getItem("localScores")) || []
  );

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
  }, [gameReset]);

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
        answerElement.nextSibling.style.backgroundColor = 'green';
        answerElement.nextSibling.style.borderColor = 'green';
      }

      if (answerElement.checked && answer.correct === false) {
        answerElement.nextSibling.style.backgroundColor = 'red';
        answerElement.nextSibling.style.borderColor = 'red';
      }
    }))
  }
  
  function calculateScore() {
    const correctAnswers = quizData.filter((question) => question.correctAnswer === 'true');
    setScore(correctAnswers.length);
    setScoreArray(prev => [...prev, correctAnswers.length]);
    showWhichAnswersAreCorrect();
    setGameOver(true);
  }

  function resetGame() {
    setQuizStart(true);
    setQuizData();
    setScore(0);
    setGameOver(false);
    setGameReady(false);
    setGameReset(prev => !prev);
  }

  function scoreMessage() {
    if (score === 5) {
      return `${score}/5, a perfect score! You watch TOO much TV!`;
    } else if (score === 4) {
      return `${score}/5, that's a log time watching TV!`;
    } else if (score === 3) {
      return `${score}/5, you're pretty good at this!`;
    } else if (score === 2) {
      return `${score}/5, yep, you're a TV watcher!`;
    } else if (score === 1) {
      return `${score}/5, go watch more TV!`;
    } else if (score === 0) {
      return `${score}/5, I guess TV really is dead...`;
    }
  }

  useEffect(() => {
    localStorage.setItem('localScores', JSON.stringify(scoreArray));
  }, [scoreArray]);

  return (
    <main className="container-fluid">
      {quizStart && <IntroPage startGame={startGame} gameReady={gameReady} scoreArray={scoreArray}/>}    
      {!quizStart && 
        <div className="quiz-page container-fluid">
          <div className="row">
            {quizData.map((question, index) => {
              return <QuizPage key={index} question={question} id={question.id} handleChange={handleChange}/>
            })}
          </div>
          
          <div className="row p-3 d-flex gap-2 justify-content-center">
            {gameOver && <h2 className="score-message">{scoreMessage()}</h2>}
            {!gameOver ? <button className="check-answers-btn btn btn-outline-primary btn-lg w-50" onClick={calculateScore}>Check answers</button> : 
              <button className="play-again-btn btn btn-outline-primary btn-lg w-50" onClick={resetGame}>Play again</button>}
          </div>
        </div>
      }
      {/* footer */}
    </main>
  );
}

export default App;
