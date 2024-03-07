import {useReducer} from "react";
import quizJSON from "./questions.json";

const initialState = {step: 1, answer: true}
const quiz = quizJSON.questions;

function reducer(state, action) {
  console.log(state, action)
}

function ReactQuiz() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {step, answer} = state;


  return (<div className='main'>
         <div className={'app-header'}>
           <img src='/logo192.png' alt='logo img'/>
           <h1>The react quiz</h1>
         </div>
         <Progress step={step}/>
         <Questions step={step}/>
       </div>);
}

export default ReactQuiz;

function Progress({step}) {
  return <div>

  </div>
}

function Questions({step}) {
  const qa = quiz[step]
  return <div className='options'>
    <h4>{qa.question}</h4>
    <div>
      {qa.options.map(option => <div className='btn'>
        {option}
      </div>)}
    </div>
  </div>
}