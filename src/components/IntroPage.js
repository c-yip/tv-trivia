export default function IntroPage(props) {
  return (
    <div className='intro-page'>
      <div className='intro-text'>
        <h1 className='title'>TV TRIVIA</h1>
        <p className='message'>Put your totally useful TV knowledge to the test!</p>
      </div>
      <button className='start-btn' onClick={props.startGame}>Start quiz</button>
    </div>
  )
}