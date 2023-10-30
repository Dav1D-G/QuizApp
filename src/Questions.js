import { useState } from "react"

function Questions({questions , dispatch , answer , sumPoints , point , amountOfQuestions}) {
    
    const [clicks,setClicks] = useState(1);

    return (
        
        <div>
            <header className="progress">
                <progress max={amountOfQuestions}  ></progress>



                <p>
                    <span className="highscore">{point}/{sumPoints}</span>
                </p>
            </header>
            
            <h4>{questions.question}</h4>
            <div className="options">
                {questions.options.map((option, index) => <button className={`btn btn-option ${answer === index ? "answer" : "" }  ${answer != null ? index === questions.correctOption ?  "correct" : "wrong" : '' } `} 
                onClick={()=>{
                    setClicks((par)=> ++par);
                    dispatch({type : 'Answer' , payload : { points : index === questions.correctOption ? clicks === 1 ? point + questions.points : point : point , index : index } })
                }}  
                key={option}>{option}</button>)}
            </div>
        </div>
    )
}

export default Questions
