import {useQuiz} from "../context/QuizContext";

function Result() {
  const {points, highScore, dispatch} = useQuiz();
  function handleReload() {
    dispatch({type: 'reset'})
  }

  return (
    <div className='main'>
      <div className='loader-container result'>
        <div className='high-score'>최고 점수는 {highScore}점 입니다.</div>
        <span>당신은 총 {points}점을 얻었습니다.</span>
        <button onClick={handleReload} className='btn'>다시 시작하기</button>
        {highScore === null
             ? <span>최초 최고 점수를 경신 했습니다.</span>
             : highScore && points === highScore
                  ? <span className='fs-1 text-info-emphasis'>최고 점수를 경신 했습니다.</span>
                  : ''}
      </div>
    </div>
  )
}

export default Result