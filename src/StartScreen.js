function StartScreen({amountOfQuestions , dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{amountOfQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={(e)=>(
                dispatch({type : 'Started'})
            )}>Let's start</button>
        </div>
    )
}

export default StartScreen
