import React from 'react';
import { Link } from 'react-router-dom';
import {
    ipAddress,
} from '../../../Common/Strings/Strings';
import './ViolationAlert.css';


const ViolationAlert = props => {
    let {violation} = props;
    let cardViolationUrl = `/singleViolation/${violation._id}`;
    console.log(cardViolationUrl)
    let violationDate = new Date(violation.timestamp);
    let date = `${violationDate.getHours()}:${violationDate.getMinutes()}:${violationDate.getSeconds()}`
    console.log(violation)
    return(

        <Link to={cardViolationUrl} onClick={() => window.location.reload()}>
            <div className={props.show ? "side-drawer-alert open" : "side-drawer-alert"}>
                <h2>
                    {violation.type} Violation
                </h2>
                <h3>
                    Violation Image
                </h3>
                <img src={`${ipAddress}${violation.imageUrl}`} width="250" height="250" alt="Violation"/>
                <h3>
                    Time <p> {date} </p>
                </h3>
            </div>
        </Link>
    )
}

export default ViolationAlert;