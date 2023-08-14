import React from 'react';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Routes ,Route, Switch } from 'react-router-dom';

function Login() {
  return (
    <div className="wrapper">
      <h1>Bora logar?</h1>
      <BrowserRouter>
        <Switch>
            <Route path="/dashboard" >             
                <Dashboard />
            </Route>
            <Route path="/preferences">
                <Preferences />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Login;