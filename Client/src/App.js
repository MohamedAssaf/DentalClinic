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
  LoginComponent,
  HomeComponent,
  DoctorPage,
  AssistantPage,
  PatientPage
} from './Components/MainComponents';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import './App.css';


const mapStateToProps = ( state ) => {
  const { authReducer } = state;
  return {
      loggedIn: authReducer.loggedIn,
      authFailed: authReducer.authFailed
  }
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sideDrawerOpen : false,
    }
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

    if(this.props.loggedIn){
      return (
        <Router>
            <SideDrawer show={this.state.sideDrawerOpen}/>
            {backdrop}
            <div className="App">
              <Toolbar drawerClickHandler = {this.drawerToggleClickHandler}/>
              <Switch>
                <Route path="/*" component={HomeComponent} />
                <Route path="/Patient" component={PatientPage} />
                <Route path="/Assistant" component={AssistantPage} />
                <Route path="/Doctor" component={DoctorPage} />
              </Switch>
            </div>
        </Router>
      )
    }
    else {
      return (
        <LoginComponent authFailed={this.props.authFailed} />
      )
    } 
  }
}

export default connect(mapStateToProps)(App);
