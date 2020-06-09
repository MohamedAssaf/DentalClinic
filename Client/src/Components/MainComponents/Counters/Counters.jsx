import React, { Component } from 'react';
import './Counters.css';
import { 
    newCounter,
    deleteCounter,
    resetCounter,
    updateCounter
} from '../../../Common/SocketIO/SocketIOService';
import { allCounters, ipAddress} from '../../../Common/Strings/Strings';

class CountersComponent extends Component{

    constructor(props) {
        super(props);
        this.state ={
            counters:[]
        }

        newCounter((counter) => {
            this.setState({counters: [...this.state.counters, counter]})
        })

        deleteCounter((counter) => {
            if(counter ==="All") {
                this.setState({counters:[]});
            } else {
                let newCounters = this.state.counters.filter( cntr => cntr._id !== counter);
                this.setState({counters: newCounters})
            }
        })

        resetCounter((counter) => {
            if(counter ==="All") {
                let newCounters = this.state.counters;
                newCounters.map( counter => {
                    counter.count =0;
                    counter.in =0;
                    counter.out =0;
                })
                this.setState({counters: newCounters})
            } else {
                let newCounterIndex = this.state.counters.findIndex( cntr => cntr._id === counter);
                let newCounter = this.state.counters[newCounterIndex];
                newCounter.count=0;
                newCounter.in=0;
                newCounter.out=0;
                let newCounters= this.state.counters;
                newCounters[newCounterIndex] = newCounter;
                this.setState({counters: newCounters})
            }
        })

        updateCounter((counter) => {
            let newCounterIndex = this.state.counters.findIndex( cntr => cntr._id === counter._id);
            let newCounter = this.state.counters[newCounterIndex];
            newCounter.count=counter.count;
            newCounter.in=counter.in;
            newCounter.out=counter.out;
            let newCounters= this.state.counters;
            newCounters[newCounterIndex] = newCounter;
            this.setState({counters: newCounters})
        })
    }

    componentDidMount() {
        fetch(`${ipAddress}${allCounters}`)
        .then( res => res.json())
        .then(counters => this.setState({counters}))
        .catch(err => console.error(err));
    }

    renderSingleCounter(counter){
        if(counter.type==="bi"){
            return(
                <div className="counter-bidirectional">
                    <p> In </p>
                    <li >
                         {counter.in}
                    </li>
                    <p> Out </p>
                    <li >
                         {counter.out}
                    </li>
                </div>
            )
        } else if(counter.type==="uni" || counter.type=="simple"){
            return ( 
                <div className="counter-unidirectional">
                    <li >
                        {counter.count}
                    </li>
                </div>
            )
        }
    }

    renderCounters(){
        if(this.state.counters){
            let countersJSX =this.state.counters.map( (counter, index) => {
                return (
                    <div key={index} className="counter">
                        <h4>
                            {counter.name}
                        </h4>
                        {this.renderSingleCounter(counter)}
                    </div>

                )
            })
            return <ul>{countersJSX}</ul>
        }
    }

    render() {
        return (
            <div className="counters">
                {this.renderCounters()}
            </div>
        )
    }
}

export default CountersComponent;