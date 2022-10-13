export default function QuizPage(props){
  function replaceQuotesAndApostrophes(string) {
    const question = string;
    const newQuestion = question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    return newQuestion;
  }

  const answerElements = props.question.answers.map((answer, index) => (
      <div className="choices" key={index}>
        <input 
          type="radio" 
          name={props.id} 
          id={props.id} 
          value={answer.correct} 
          onChange={(e) => props.handleChange(e)} 
        />

        <label htmlFor={props.id}>{replaceQuotesAndApostrophes(answer.answer)}</label>
      </div>
    )
  );

  return (
    <div className="question-answers">
      <h3>{replaceQuotesAndApostrophes(props.question.question)}</h3>
      {answerElements}
    </div>
  )
}