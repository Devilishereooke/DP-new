const InfoRow = ({name, value}) => {
    return(
        <div className="info-row">
            <span className="info-name">{name} : </span>
            <span className="info-value">{value}</span>
        </div>
    )
}

export default InfoRow;