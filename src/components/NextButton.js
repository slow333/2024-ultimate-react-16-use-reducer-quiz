function NextButton({dispatch, answer, step,numQuestions}) {
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