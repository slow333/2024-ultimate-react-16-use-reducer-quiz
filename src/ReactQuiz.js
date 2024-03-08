// noinspection JSCheckFunctionSignatures

import {useEffect, useReducer, useState} from "react";
import quizJSON from "./questions.json";
import Header from "./Header";

const quiz = quizJSON.questions;
const initialState =
  {
    points: 0, step: 1, answer: undefined,
    isEnd: false, countSec: 30, highScore: 5, isAnswered: false
  }

function reducer(state, action) {
  switch (action.type) {
    case 'setPoint' :
      return {...state, points: state.points + action.payload};
    case 'setStep' :
      return {...state, step: state.step + 1};
    case 'setAnswer' :
      return {...state, answer: action.payload};
    case 'setIsAnswered' :
      return {...state, isAnswered: action.payload};
    case 'clearAnswer' :
      return {...state, answer: undefined};
    case 'setIsEnd' :
      return {...state, isEnd: true};
    case 'setCountSec' :
      return {...state, countSec: state.countSec - 1};
    case 'setHighScore' :
      return {...state, highScore: action.payload};
    case 'reset' :
      return initialState;
    default:
      throw new Error("이상해요 ...");
  }
}

function ReactQuiz() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {step, points, answer, isEnd, countSec, highScore, isAnswered}
    = state;

  const answerIndex = quiz[step - 1].correctOption
  const correctAnswer = quiz[step - 1].options[answerIndex];

  useEffect(() => {
    const intervalId = setInterval(function () {
      dispatch({type: 'setCountSec'})
    }, 1000);
    if (countSec === 0) {
      clearInterval(intervalId);
      dispatch({type: "setIsEnd"});
    }
    return () => clearInterval(intervalId);
  }, [countSec]);

  useEffect(() => {
    const highScore = localStorage.getItem('highScore');
    if (highScore)
      dispatch({type: 'setHighScore', payload: +highScore})
  }, []);

  const next = function () {
    if (step === 15)
      return dispatch({type: 'setIsEnd'});
    dispatch({type: 'setIsAnswered', payload: false});
    dispatch({type: 'setStep'})
  }

  const defineStep = (e) =>
    dispatch({type: 'setStep', payload: +e.target.value});

  function handleSelect(selection) {
    dispatch({type: 'setAnswer', payload: selection});
    dispatch({type: 'setIsAnswered', payload: true});

    if (!isAnswered && correctAnswer === selection)
      dispatch({type: 'setPoint', payload: quiz.at(step - 1).points});

    if (isAnswered) dispatch({type: 'setPoint', payload: 0});

    if (points > highScore) {
      localStorage.setItem('highScore', points)
      dispatch({type: 'setHighScore', payload: points})
    }
  }

  function handleReload() {
    dispatch({type: 'reset'})
    window.location.reload();
  }

  return (
    <>
      <Header/>
      {!isEnd &&
        <div className='main'>
          <Progress step={step} point={points} defineStep={defineStep}/>
          <Questions step={step} onSelect={handleSelect}
                     answer={answer} correctAnswer={correctAnswer}
                     isAnswered={isAnswered}
          />
          <NextBtn countSec={countSec} next={next}/>
        </div>}
      {isEnd && <Result points={points} highScore={highScore} onReload={handleReload}/>}
    </>
  )
}

export default ReactQuiz;

function Progress({step, point, defineStep}) {

  return (
    <div className='progress'>
      <input className='bar' type="range" min="1"
             max={`${quiz.length}`} value={+step}
             onChange={defineStep}/>
      <div className='range'>
        <span>{step}/{quiz.length}</span>
        <span>{point}/{quiz.reduce((acc, curr) => curr.points + acc, 0)} point</span>
      </div>
    </div>
  )
}

function Questions({step, onSelect, correctAnswer, isAnswered}) {
  const qa = quiz[step - 1];

  return (
    <ul className='options'>
      <h4>{qa.question}</h4>
      <ul>
        {qa.options.map(option =>
          <li key={option.question}
              className={`btn answer ${isAnswered &&
              (option === correctAnswer ? 'btn-option correct'
                : 'btn-option wrong')}`}
              disabled={isAnswered}
              onClick={() => onSelect(option)}>
            {option}
          </li>)}
      </ul>
    </ul>)
}

function NextBtn({next, countSec}) {
  return (
    <div className='btn-ui'>
      <button className='timer'>
        {Math.floor(countSec / 60)} : {countSec % 60}</button>
      <button className='btn' onClick={next}>Next</button>
    </div>
  )
}

function Result({points, highScore, onReload}) {
  return (
    <div className='main'>
      <div className='loader-container result'>
        <div className='high-score'>최고 점수는 {highScore}점 입니다.</div>
        <span>당신은 총 {points}점을 얻었습니다.</span>
        <button onClick={onReload} className='btn'>Reset</button>
        {points > highScore && <div>최고 점수를 경신 했습니다.</div>}
      </div>
    </div>
  )
}