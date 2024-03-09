function StarScreen({questions, dispatch}) {
  function handleStart() {
    dispatch({type: "active"})
  }
  return (
    <div className='loader-container'>
      <h2>리엑트 문제 맞추기 !!</h2>
      <h4>{questions}개의 문제가 준비됐어요</h4>
      <button onClick={handleStart} className='btn'>시작하기</button>
    </div>
  );
}

export default StarScreen