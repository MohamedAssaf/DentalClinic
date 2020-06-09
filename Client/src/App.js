import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
  Backdrop,
  SideDrawer,
  Toolbar
 } from './Components/Layout';
import {
  HomeComponent,
  ViolationsComponent,
  SingleViolationComponent,
  CountersComponent,
  ViolationAlertComponent
} from './Components/MainComponents';
import { newViolation } from './Common/SocketIO/SocketIOService';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sideDrawerOpen : false,
      sideDrawerAlertOpen : false,
      violation : {}
    }

    newViolation( violation => {
      this.setState({violation, sideDrawerAlertOpen:true})
    })
  }

  drawerToggleClickHandler = () => {
    this.setState((previousState) => {
      return { sideDrawerOpen: !previousState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen:false, sideDrawerAlertOpen:false})
  }

  render() {
    let  backdrop = null;
    if(this.state.sideDrawerOpen || this.state.sideDrawerAlertOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    
    return (
      <Router>
          <SideDrawer show={this.state.sideDrawerOpen}/>
          <ViolationAlertComponent show={this.state.sideDrawerAlertOpen} violation={this.state.violation}/>
          {backdrop}
          <div className="App">
            <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
            <Switch>
              <Route path="/violations" component={ViolationsComponent} />
              <Route path="/singleViolation/:id" component={SingleViolationComponent} />
              <Route path="/counters" component={CountersComponent} />
              <Route path="/*" component={HomeComponent} />
            </Switch>
          </div>
      </Router>
    )
  } 
}

export default App;
