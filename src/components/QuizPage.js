export default function QuizPage(props){
  function replaceQuotesAndApostrophes(string) {
    const question = string;
    const newQuestion = question.replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&uacute;/, 'ú')
      .replace(/&aacute;/, 'á')
      .replace(/&eacute;/, 'é')
      .replace(/&iacute;/, 'í')
      .replace(/&oacute;/, 'ó');
    return newQuestion;
  }

  const answerElements = props.question.answers.map((answer, index) => (
      <div className="choices" key={index}>
        <input
          className="btn-check" 
          type="radio" 
          name={props.id} 
          id={props.id + index} 
          value={answer.correct} 
          onChange={(e) => props.handleChange(e)} 
        />

        <label 
          htmlFor={props.id + index}
          className="btn btn-primary"
        >{replaceQuotesAndApostrophes(answer.answer)}
        </label>
      </div>
    )
  );

  return (
    <div className="question-answers p-3">
      <h3 className="p-3">{replaceQuotesAndApostrophes(props.question.question)}</h3>
      <div className="answers p-3 d-flex gap-2 d-flex flex-column flex-md-row">
        {answerElements}
      </div>
    </div>
  )
}