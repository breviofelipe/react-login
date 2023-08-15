import React from 'react';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import LoginHacker from '../Login/HackerLogin';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Routes ,Route, Switch } from 'react-router-dom';

function Login() {
  return (
    <div className="wrapper">
      <LoginPage />
      <LoginHacker />
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