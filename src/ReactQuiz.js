import {useEffect, useReducer, useState} from "react";
import quizJSON from "./questions.json";

const quiz = quizJSON.questions;
const initialState = {count: 0, step: 1, answer: undefined}

function reducer(state, action) {
  console.log('state => ', state, 'action => ', action, "lll");

  switch (action.type) {
    case 'dec':
      return {...state, count: state.count - action.payload};
    case 'inc' :
      return {...state, count: state.count + action.payload};
    case 'setCount' :
      return {...state, count: state.count + action.payload};
    case 'setStep' :
      return {...state, step: state.step + action.payload};
    case 'setAnswer' :
      return {...state, answer: action.payload};
    case 'next' :
      return {
        ...state,
        step: state.step + action.payload[0], answer: action.payload[1]
      };
    case 'reset' :
      return initialState;
    default:
      throw new Error("이상해요 ...");
  }
}

function ReactQuiz() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {step, count, answer} = state;
  const answerIndex = quiz[step - 1].correctOption
  const correctAnswer = quiz[step - 1].options[answerIndex];

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: 'dec', payload: step});
  };
  const next = function () {
    if(step === 15) return;
    dispatch({type: 'next', payload: [1, undefined]});
  }

  const defineStep = (e) =>
    dispatch({type: 'setStep', payload: +e.target.value});

  const reset = function () {
    dispatch({type: 'reset'})
  };

  function handleAnswer(option) {
    console.log("선택한 답변 : ", option)
    dispatch({type: 'setAnswer', payload: option})
    if (correctAnswer === option) {
      dispatch({type: 'setCount', payload: quiz.at(step).points})
    }
    setTimeout(function () {
      next();
    },3000);
  }

  return (
    <>
      <Head/>
      <div className='main'>
        <Progress step={step} count={count} defineStep={defineStep}/>
        <Questions step={step} onAnswer={handleAnswer}
                   answer={answer} correctAnswer={correctAnswer}/>
        <NextBtn dec={dec} next={next}/>
      </div>
    </>
  )
    ;
}

export default ReactQuiz;

function Progress({step, count, defineStep}) {
  console.log('step ==> ', step)
  return (
    <div className='progress'>
      <input className='bar' type="range" min="1" max={`${quiz.length}`} value={+step}
             onChange={defineStep}/>
      <div className='range'>
        <span>{step}/{quiz.length}</span>
        <span>{count}/{quiz.reduce((acc, curr) => curr.points + acc, 0)} point</span>
      </div>
    </div>
  )
}

function Questions({step, onAnswer, answer, correctAnswer}) {
  const qa = quiz[step - 1];
  console.log("정답은 요 => ", correctAnswer)
  console.log("답변은 요 => ", answer)
  return (
    <ul className='options'>
      <h4>{qa.question}</h4>
      {qa.options.map(option =>
        <li key={option.question}
            className={`btn ${answer && (option === correctAnswer ? 'btn-option correct'
              : 'btn-option wrong')}`}
            onClick={() => onAnswer(option)}>
          {option}
        </li>)}
    </ul>)
}


function NextBtn({next}) {
  return (
    <div className='btn-ui'>
      <button className='timer'><TimeoutBtn/></button>
      <button className='btn' onClick={next}>Next</button>
    </div>
  )
}

function TimeoutBtn() {
  const [sec, setSec] = useState(7)
  useEffect(() => {
    const intervalId = setInterval(function () {
      setSec(sec => sec - 1)
    }, 1000);
    if (sec === 0) {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId);
  }, [sec]);

  return <div>
    {Math.floor(sec / 60)} : {sec % 60}
  </div>
}

function Head() {
  return (
    <div className={'app-header'}>
      <img src='/logo192.png' alt='logo img'/>
      <h1>The react quiz</h1>
    </div>
  )
}
