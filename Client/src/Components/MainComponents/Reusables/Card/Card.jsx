import React from 'react'; 
import {
    Card,
    Table
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Card.css';


const cardComponent = (props) => {
    let cardViolationUrl = `/singleViolation/${props.violationId}`;
    let violationDate = new Date(props.timestamp);
    let date = `${violationDate.getDate()}/${violationDate.getMonth()}/${violationDate.getFullYear()} ${violationDate.getHours()}:${violationDate.getMinutes()}:${violationDate.getSeconds()}`
    return (
        <Card className="card" >
            <Card.Header className="violation-card-header">{props.type} Violation</Card.Header>
            <Card.Img variant="top" src={props.imageUrl} />
            <Card.Body>
                <Table striped bordered hover variant="light">
                    <tbody>
                        <tr>
                            <td>Vehicle Speed</td>
                            <td>{props.speed}</td>
                        </tr>
                        <tr>
                            <td>Time</td>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <td>Lane</td>
                            <td>{props.lane}</td>
                        </tr>
                        <tr>
                            <td>Direction</td>
                            <td>{props.direction}</td>
                        </tr>
                        <tr>
                            <td>Plate Number</td>
                            <td contentEditable='true'>{props.plateNumber}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='text-center'>
                    <Link to={cardViolationUrl} className="btn btn-primary" >Open Violation Card</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default cardComponent;