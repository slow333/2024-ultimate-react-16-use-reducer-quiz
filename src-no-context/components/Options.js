import {v4 as uuidv4} from "uuid";

function Options({question, answer, dispatch}) {

  const hasAnswer = answer !== null;

  const correctAnswer = question.correctOption;

  return (
    <div className='options'>
      {question.options.map((option, index) =>
        <button
          key={uuidv4()}
          className={`
          btn btn-option 
            ${answer === index ? 'answer' : ''}
            ${hasAnswer 
              ? (index === correctAnswer 
                ? "correct" : "wrong") 
              : "" }
              `}
          disabled={hasAnswer}
          onClick={() =>
            dispatch({type: 'submittedAnswer', payload: index})}
        >
          {option}
        </button>)}
    </div>
  );
}

export default Options