import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hey Man</h1>
        <Switch>
          <Route  path="/home" component={Home} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
