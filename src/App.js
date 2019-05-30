import React from 'react';
import {  Route, Router , BrowserRouter, Redirect, IndexRoute} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

import Home from './components/Home';
import Header from './components/Header';
import Signin from './components/signin';

import './App.css';
import {Nav, Navbar, NavDropdown, MenuItem, Tabs, ButtonToolbar, 
        Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup , FormControl} from 'react-bootstrap';


export class App extends React.Component{

  constructor(){
    super();
  }


  render(){
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* <Route path="/" 
          render={(routeProps) => (
            <Header {...routeProps} user = {"user"} />
            )}/> */}
          <Route path="/" component= {Header}/>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route path='/login' component={Signin} />
        </div>  
      </BrowserRouter>
  </div>
  );
}
}

export default App;
