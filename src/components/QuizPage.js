export default function QuizPage(props){
  function replaceQuotesAndApostrophes(string) {
    const question = string;
    const newQuestion = question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    return newQuestion;
  }

  const answerElements = props.question.answers.map((answer, index) => (
      <div className="choice" key={index}>
        <input type="radio" name={props.id} id={answer.answer} value={answer.answer} />
        <label htmlFor={props.id}>{answer.answer}</label>
      </div>
    )
  );

  console.log(props.question.answers[0].answer);

  return (
    <div className="question-answers">
      <h3>{replaceQuotesAndApostrophes(props.question.question)}</h3>
      {answerElements}
    </div>
  )
}