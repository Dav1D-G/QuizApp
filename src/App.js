import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from './Error'
import StartScreen from "./StartScreen";
import Questions from './Questions'
import { NextButton } from "./NextButton";

const initialState = {
  questions : [],
  // loading , error , ready , active , finished
  status : 'loading' ,
  index : 0 ,
  answer : null,
  points : 0
};

function reducer(state,action)
{
  // eslint-disable-next-line default-case
  switch(action.type)
  {
    case 'dataReceived':
      return {
        ...state , 
        questions : action.payload ,
        status : 'ready'
      }
    case 'dataFailed':
      return {
        ...state , status : 'error'
      }
    case 'Started' :
      return {
        ...state , status : 'active'
      }
    case 'Answer':
        return {
          ...state , points : action.payload.points , answer : action.payload.index
        } 
    default :
      throw new Error('Action unknown');
    
  }
    
}

export default function App() {


  const [state,dispatch] = useReducer(reducer,initialState);
  const {questions , status , index , answer ,points} = state;

  const allPoints = questions.map((el) => el.points);
  const sumPoints = allPoints.reduce((total,current) => total + current , 0);
  const numQuestions = questions.length;


  useEffect(function(){
    fetch('http://localhost:8000/questions')
      .then(res =>res.json())
      .then(data => dispatch({type : 'dataReceived' , payload : data}))
      .catch(err => dispatch({type : 'dataFailed'}));
    },[])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen amountOfQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && (
          <>
            <Questions questions={questions[index]} answer={answer} dispatch={dispatch} sumPoints={sumPoints}  point={points} amountOfQuestions={numQuestions}/>
            <NextButton answer={answer} />
          </>
        )}
      </Main>


      
    </div>
  );
}


