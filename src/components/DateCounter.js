// noinspection JSCheckFunctionSignatures

import {useReducer} from "react";

const initialState = {count: 0, step: 1}

function reducer(state, action) {
  console.log('state => ', state, 'action => ', action);

  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - action.payload };
    case 'inc' :
      return { ...state, count: state.count + action.payload };
    case 'setCount' :
      return { ...state, count: action.payload };
    case 'setStep' :
      return { ...state, step: action.payload };
    case 'reset' :
      return initialState;
    default:
      throw new Error("이상해요 ...");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = () => dispatch({type: 'dec', payload: step});
  const inc = () => dispatch({type: 'inc', payload: step});

  function defineCount(e) {
    dispatch({type: 'setCount', payload: +e.target.value});
  }

  const defineStep = (e) =>
       dispatch({type: 'setStep', payload: +e.target.value});
  const reset = function () {
    dispatch({type: 'reset'})
  };

  return (
       <div className="counter">
         <div className='range'>
           <input type="range" min="1" max="10" value={step}
                  onChange={defineStep} />
           <span>{step}</span>
         </div>

         <div>
           <button onClick={dec}>-</button>
           <input value={count} onChange={defineCount}/>
           <button onClick={inc}>+</button>
         </div>

         <p>{date.toDateString()}</p>

         <div>
           <button onClick={reset}>Reset</button>
         </div>
       </div>
  );
}

export default DateCounter;
