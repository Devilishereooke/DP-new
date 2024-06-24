const Alert = ({alertText}) => {
    return(
        { alertText } && <div className="alert">*{alertText}</div>
    )
}

export default Alert;