import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from "semantic-ui-react"

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost'

import Creator from './pages/Creator';
import Fun from './pages/Fun';
import About from './pages/About';


function App() {
  return (
    <AuthProvider>
 <Router>
    <Container>
    <MenuBar />
    <Route exact path='/' component={Home}/>
    <AuthRoute exact path='/login' component={Login}/>
    <AuthRoute exact path='/register' component={Register}/>
    <Route exact path='/post/:postId' component={SinglePost}/>
    <Route exact path='/about' component={About}/>
    <Route exact path='/creator' component={Creator}/>
    <Route exact path='/fun' component={Fun}/>
    </Container>
  </Router>
    </AuthProvider>
 
  );
}

export default App;
