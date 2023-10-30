export function NextButton({answer}) {
    return(
        <div>
            <button className={`${answer != null ? "btn btn-ui" : ''}`}>Next</button>
        </div>
    )
}