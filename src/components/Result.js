
function Result({points, highScore, dispatch}) {

  function handleReload() {
    dispatch({type: 'reset'})
    // dispatch({type: 'dataReceived'})
    window.location.reload();
  }

  return (
    <div className='main'>
      <div className='loader-container result'>
        <div className='high-score'>최고 점수는 {highScore}점 입니다.</div>
        <span>당신은 총 {points}점을 얻었습니다.</span>
        <button onClick={handleReload} className='btn'>다시 시작하기</button>
        {points > highScore && <div>최고 점수를 경신 했습니다.</div>}
      </div>
    </div>
  )
}

export default Result