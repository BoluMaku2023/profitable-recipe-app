
const errorResult = ({message, onErrorButtonClicked}) => {

    return <div className="empyResultHolder">
        <div className="emptyResultInnerContent">
            <h5 className="colorOrange">
                {
                    message ? message : "No content was found"
                }
            </h5>
            <button className="rectangleButtonSecondary" onClick={e => onEmptyButtonClicked(e)}></button>
        </div>
    </div>
}

module.exports.errorResult = errorResult;