import React, { Component } from 'react';
import { 
    ipAddress,
    violationByIdApi
} from '../../../Common/Strings/Strings';
import ReactPlayer from 'react-player'
import { Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './SingleViolation.css';

class SingleViolationClass extends Component {

    constructor( props ) {
        super(props);
        this.state = {
            violation : {},
            violationVideoUrl : "",
            violationImageUrl : "",
            isTabletOrMobile : props.isTabletOrMobile 
        }
    }

    componentDidMount(){
        fetch(`${ipAddress}${violationByIdApi}${this.props.match.params.id}`)
        .then( response => response.json())
        .then( violation => { 
            this.setState({
                violation:violation.violation,
                violationImageUrl : `${ipAddress}${violation.violation.imageUrl}`,
                violationVideoUrl : `${ipAddress}${violation.violation.videoUrl}`
            })

        })
        .catch( err => console.log(err))
    }

    renderViolationMedia() {
        if( this.state.violation.videoUrl) {
            if(this.state.isTabletOrMobile){
                return (
                    <div>
                        <div className="single-violation">
                            <div className="single-violation-header">
                                <h4> Violation Image</h4>
                            </div>
                            <div className="single-violation-media">
                                <img src={this.state.violationImageUrl} className="single-violation-image" alt="violation" width="100%" height="90%" />
                            </div>
                            <div className="single-violation-header">
                                <h4> Violation Video </h4>
                            </div>
                            <div className="single-violation-media">
                                <ReactPlayer url={this.state.violationVideoUrl} width="100" height="100" playing loop controls />
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <div className="single-violation">
                            <div className="single-violation-header">
                                <h4> Violation Image</h4>
                            </div>
                            <div className="single-violation-header">
                                <h4> Violation Video </h4>
                            </div>
                            <div className="single-violation-media">
                                <img src={this.state.violationImageUrl} alt="violation" width="90%" height="90%" />
                            </div>
                            <div className="single-violation-media">
                                <ReactPlayer url={this.state.violationVideoUrl} width="100" height="100" playing loop controls />
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="row">
                    <div className="col-md-12 single-violation-header">
                        <h4> Violation Image </h4>
                    </div>
                    <div className="col-md-12">
                        <img src={this.state.violationImageUrl} alt="violation" className="single-violation-media" />         
                    </div>
                </div>
            )
        }
    }

    renderViolationMetaData() {
        let violationDate = new Date(this.state.violation.timestamp);
        let date = `${violationDate.getDate()}/${violationDate.getMonth()}/${violationDate.getFullYear()} ${violationDate.getHours()}:${violationDate.getMinutes()}:${violationDate.getSeconds()}`
        return(
            <Table striped bordered hover variant="light">
                <tbody>
                    <tr>
                        <td>Vehicle Speed</td>
                        <td>{this.state.violation.speed}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Lane</td>
                        <td>{this.state.violation.lane}</td>
                    </tr>
                    <tr>
                        <td>Direction</td>
                        <td>{this.state.violation.direction}</td>
                    </tr>
                    <tr>
                        <td>Vehicle Type</td>
                        <td>{this.state.violation.vehicleClass}</td>
                    </tr>
                    <tr>
                        <td>Plate Number</td>
                        <td contentEditable='true'>{this.state.violation.plateNumber}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    render () {
        console.log(this.state);
        return (
                <div >
                    {this.renderViolationMedia()}
                    {this.renderViolationMetaData()}
                </div>                
        )
    }
}

function SingleViolation (props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return <SingleViolationClass {...props} isTabletOrMobile={isTabletOrMobile} />;
}
export default SingleViolation;