import React, { Component } from 'react';
import {
    CardListComponent
} from '../Reusables';
import { 
    ipAddress,
    allViolationsApi
} from '../../../Common/Strings/Strings';
import {
    Accordion,
    Card
} from 'react-bootstrap';
import * as _ from 'lodash';
import './Violations.css';

class Violations extends Component {

    state = {
        violations : [],
        allViolations : `${ipAddress}${allViolationsApi}`
    }

    componentDidMount() {
        fetch(this.state.allViolations)
        .then( response => response.json())
        .then( violations => {
            //To divide them by type for display
            var grouped = _.mapValues(_.groupBy(violations, 'type'),
                          clist => clist.map(violation => _.omit(violation, 'type')));
            
            this.setState({violations: grouped})
        })
        .catch(err => console.log(err));
    }

    renderAccordion() {
        if(this.state.violations){
            let accordionCards = [];
            let i =0;
            for (const list in this.state.violations) {
                if (this.state.violations.hasOwnProperty(list)) {
                        const violationList = this.state.violations[list];
                        i++;
                        accordionCards.push(
                            <Card key={list}  style={{width:'98%', borderRadius:'10px'}}>
                                <Accordion.Toggle as={Card.Header} style={{fontWeight:'bold', fontSize:'18pt', textAlign:'Center', cursor:'pointer', color:"#0065A8"}} eventKey={i}>
                                {list} Violations
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body>
                                        <CardListComponent violations={violationList} type={list} key={list}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        );
                    }
                }
            return (
                <Accordion defaultActiveKey="0">
                    {
                        accordionCards
                    }
                </Accordion>
            )
        }
    }

    render() {
        return (
            <div className="violation-housing">
                <div className="filters">
                    <h1>Filters Bruh!</h1>
                </div>
                <div className="violations" >
                    {
                        this.renderAccordion()
                    }
                </div>
            </div>
        )
    }
}

export default Violations;