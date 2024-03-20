import {useEffect, useState} from "react";
import Progress from "./Progress";

function Timer({dispatch, questions}) {
  const [remain, setRemain] = useState(questions.length * 15)

  useEffect(() => {
    const intervalId = setInterval(function () {
      setRemain(remain => remain - 1)
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remain]);
  if (remain === 0) {
    dispatch({type: 'tickFinished'})
  }

  const renderTime = () => {
    const minutes = Math.floor(remain / 60);
    const seconds = remain % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };
  const rangeBarStyle =
    {width:"10rem", backgroundColor:'black'}

  return (
    <div style={{display:'flex', flexDirection:'column',
      justifyItems: 'center', justifyContent:'center'}}>
      <div className='timer'>
        {renderTime()}
      </div>
      <input className='bar' type="range" min="1"
             max={questions.length * 15} value={remain}
             onChange={(e) =>
               dispatch({type: 'toNextStep', payload: +e.target.value})
             }
             style={rangeBarStyle}
      />
    </div>
  )
}

export default Timer