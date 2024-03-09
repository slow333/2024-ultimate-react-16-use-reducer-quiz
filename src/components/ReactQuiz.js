// noinspection JSCheckFunctionSignatures

import {useEffect, useReducer} from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StarScreen from "./StarScreen";
import Options from "./Options";
import {Questions} from "./Questions";
import Timer from "./Timer";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Result from "./Result";


const SECS_PER_QUESTION = 30;
const initialState =
  {
    questions: [], points: 0, step: 1, answer: null,
    secondsRemaining: 6, highScore: 0, status: 'loading',
  }

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
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
    case 'getHighScore' :
      return {...state, highScore: action.payload};
    case 'reset' :
      return { ...initialState,
        questions: state.questions,
        status: 'ready'
      };
    case 'tick':
      return {...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished"
          : state.status,
      };
    case 'tickFinished':
      return { ...state,
        status: 'finished',
        highScore: state.highScore < state.points
          ? state.points
          : state.highScore,
      }
    default:
      throw new Error("이상해요 ...");
  }
}

function ReactQuiz() {

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

    const highScore = localStorage.getItem('highScore');
    if (highScore)
      dispatch({type: 'getHighScore', payload: +highScore})
  }, []);

  useEffect(() => {
    if(highScore === 0) return;
    else localStorage.setItem("highScore", highScore);
  }, [highScore]);

  return (
    <div className='app'>
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StarScreen questions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <>
            <Progress
              step={step} points={points} dispatch={dispatch}
              numQuestions={numQuestions} sumPoints={sumPoints}/>
            <Questions question={questions[step - 1]}>
              <Options question={questions[step - 1]}
                       answer={answer}
                       dispatch={dispatch}/>
            </Questions>
            <Footer>
              <Timer questions={questions}
                     dispatch={dispatch}/>
              <NextButton answer={answer} dispatch={dispatch} step={step} numQuestions={numQuestions}/>
            </Footer>
          </>
        }
        {status === 'finished' &&
          <Result points={points} highScore={highScore}
                  dispatch={dispatch}/>}
      </Main>

    </div>
  )
}

export default ReactQuiz;

function Main({children}) {
  return <div className='main'>{children}</div>
}

function Footer({children}) {
  return (
    <footer className='footer'> {children} </footer>
  )
}


