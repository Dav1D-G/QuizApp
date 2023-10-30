import { useReducer, useState } from "react";


function reducer(state,{type,payload})
{



  switch(type)
  {
    case 'dec':
      return {...state , count : state.count - payload};
    case 'inc':
      return {...state , count : state.count + payload};
    case 'setStep':
      return {...state , step : payload}
    case 'setCount':
      return {...state , count : payload}
    case 'reset' :
      return {count : 0 , step : 1}
    default :
      throw new Error('Unknown action')
  }
  // if(type === 'dec') return state - payload;
  // if(type === 'inc') return state + payload;
  // if(type === 'set') return payload;
  //return {count : 0 , step : 1};
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  const initialValue = {count : 0 , step : 1}
  const [state,dispatch] = useReducer(reducer,initialValue);
  const {count , step } = state;

  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type: 'dec', payload : step})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({type: 'inc', payload : step})
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({type: 'setCount', payload : Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatch({type: 'setStep' , payload : Number(e.target.value)});
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type: 'reset'})
    //setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
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
