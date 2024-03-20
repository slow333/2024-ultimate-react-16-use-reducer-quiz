import ReactQuiz from "./components/ReactQuiz";
import {QuizProvider} from "./context/QuizContext";

function App() {

  return (
       <div className='app'>
         <ReactQuiz/>
       </div>
  );
}

export default App;
