export default function Progress(
  {step, points, dispatch, sumPoints, numQuestions}) {

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