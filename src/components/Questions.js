import {useQuiz} from "../context/QuizContext";

export function Questions({children}) {
  const {questions, step} = useQuiz();

  return (
    <div>
      <h4>{questions[step - 1].question}</h4>
      {children}
    </div>)
}