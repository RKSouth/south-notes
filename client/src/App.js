import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react"

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Creator from './pages/Creator';
import Fun from './pages/Fun';
import About from './pages/About';


function App() {
  return (
  <Router>
    <Container>
    <MenuBar />
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/about' component={About}/>
    <Route exact path='/creator' component={Creator}/>
    <Route exact path='/fun' component={Fun}/>
    </Container>
  </Router>
  );
}

export default App;
