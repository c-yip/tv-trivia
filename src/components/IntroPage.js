export default function IntroPage(props) {
  function getHighScore(array) {
    const highScore = Math.max(...array);
    return highScore;
  }

  function getPreviousScore(array) {
    const previousScore = array[array.length - 1];
    return previousScore;
  }

  function getAverageScore(array) {
    const averageScore = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    return averageScore;
  }
  
  return (
    <div className='intro-page row'>
      <div className='intro-text'>
        <h1 className='title'>TV TRIVIA</h1>
        <p className='message'>Put your totally useful TV knowledge to the test!</p>
      </div>
      {props.gameReady && <button className='start-btn' onClick={props.startGame}>Start quiz</button>}

      <h3 className="p-2">{`Your high score: ${getHighScore(props.scoreArray)}`}</h3>
      <h3 className="p-2">{`Your previous score: ${getPreviousScore(props.scoreArray)}`}</h3>
      <h3 className="p-2">{`Your average score: ${getAverageScore(props.scoreArray)}`}</h3>
    </div>
  )
}