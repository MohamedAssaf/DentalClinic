import React, { Component } from 'react';
import {
    CardComponet
} from '../';
import { 
    ipAddress
} from '../../../../Common/Strings/Strings';
import './CardList.css';
class cardList extends Component {

    render() {
        return (
            <div>
                <div className="card-list-scroll-container" >
                    <ul className="card-list ">
                        {this.props.violations.map( violation => {
                            return (
                                <li key={violation.timestamp+violation.speed} >    
                                    <CardComponet violationId={violation._id} type={this.props.type} speed={violation.speed} timestamp={violation.timestamp} direction={violation.direction} lane={violation.lane} plateNumber={violation.plateNumber} imageUrl={`${ipAddress}${violation.imageUrl}`} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }

}

export default cardList;