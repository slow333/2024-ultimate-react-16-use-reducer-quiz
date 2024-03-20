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
import {useQuiz} from '../context/QuizContext'

function ReactQuiz() {
  const {status} = useQuiz();

  return (
       <>
         <Header/>
         <Main>
           {status === 'loading' && <Loader/>}
           {status === 'error' && <Error/>}
           {status === 'ready' && <StarScreen/>}
           {status === 'active' && <>
             <Progress/>
             <Questions>
               <Options/>
             </Questions>
             <Footer>
               <Timer/>
               <NextButton/>
             </Footer>
           </>}
           {status === 'finished' && <Result/>}
         </Main>
         <Main/>
       </>
  )
}

export default ReactQuiz;

function Main({children}) {
  return <div className='main'>
    {children}
  </div>
}

function Footer({children}) {
  return (<footer className='footer'> {children} </footer>)
}