// noinspection JSCheckFunctionSignatures

import {createContext, useContext, useEffect, useReducer} from "react";
import Error from "../components/Error";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const initialState =
     {
       questions: [], points: 0, step: 1, answer: null,
       secondsRemaining: 6, highScore: 0, status: 'loading',
     }
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {...state,
        questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state,
        status: 'error'}
    case 'active':
      return {...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,}
    case 'quizFinished' :

      return {...state,
        status: 'finished',
        highScore: state.highScore < state.points
             ? state.points
             : state.highScore,
      }
    case 'submittedAnswer' :
      const currQuestion = state.questions.at(state.step -1);

      return {...state,
        answer: action.payload,
        points:
             currQuestion.correctOption === action.payload
                  ? state.points + currQuestion.points
                  : state.points,
      }
    case 'setPoint' :
      return {...state, points: state.points + action.payload};
    case 'toNextStep' :
      return {...state,
        step: state.step + 1,
        answer: null,
      };
    case 'setHighScore' :
      return { ...state,
        highScore: action.payload};
    case 'reset' :
      return { ...initialState,
        questions: state.questions,
        status: 'ready'
      };
    case 'tick':
      return { ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished"
             : state.status,
      };
    case 'tickFinished':
      if(state.highScore <= state.points)
        localStorage.setItem("highScore", state.points)
      return { ...state,
        status: 'finished',
        highScore: state.highScore <= state.points
             ? state.points
             : state.highScore,
      }
    default:
      throw new Error("이상해요 ...");
  }
}
function QuizProvider({children}) {

  const [ state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, step, points, secondsRemaining,
    highScore, answer }
       = state;

  const numQuestions = questions.length;
  const sumPoints =
       questions.reduce((acc, curr) => curr.points + acc, 0)

  useEffect(() => {
    fetch('http://localhost:9090/questions')
         .then(res => res.json())
         .then(data => dispatch({type: 'dataReceived', payload: data}))
         .catch(err => dispatch({type: 'dataFailed'}));
    dispatch({type: 'setHighScore'})
  }, []);

  useEffect(() => {
    const lcHigh = localStorage.getItem('highScore');
    if (lcHigh === null) localStorage.setItem("highScore", highScore);
    if (lcHigh){
      +lcHigh > highScore && dispatch({type: 'setHighScore', payload: +lcHigh})
    }
  }, [highScore, points]);

  console.log("highScore::::::::::", highScore);
  console.log("Points::::::::::::", points)
  return (
     <QuizContext.Provider value={{
       questions, status, step, points,
       secondsRemaining, highScore, answer,
       numQuestions, sumPoints, dispatch
     }}>
       {children}
     </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if(context === undefined) throw new Error("Context was used outside of Provider")
  return context;
}

export {QuizProvider, useQuiz};