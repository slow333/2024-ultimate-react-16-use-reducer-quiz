import {useQuiz} from "../context/QuizContext";

export default function Progress() {
  const {step, points, dispatch,
    sumPoints, numQuestions} = useQuiz();

  return (
    <div className='progress'>
      <input className='bar' type="range" min="1"
             max={numQuestions} value={+step}
             onChange={(e) =>
               dispatch({type: 'toNextStep', payload: +e.target.value})
      }/>
      <div className='range'>
        <span>{step}/{numQuestions}</span>
        <span>{points}/ {sumPoints} point</span>
      </div>
    </div>
  )
}