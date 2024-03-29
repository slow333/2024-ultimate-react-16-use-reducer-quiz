import {useQuiz} from "../context/QuizContext";

function NextButton() {

  const {answer, dispatch, step, numQuestions} = useQuiz();

  if(answer === null) return null;

  if(step < numQuestions) return (
    <button className='btn'
            onClick={() => dispatch({type: 'toNextStep'})}>
      Next</button>
  )
  if(step === numQuestions) return (
    <button className='btn'
            onClick={() => dispatch({type: 'quizFinished'})}>
      Finished</button>
  )
}

export default NextButton