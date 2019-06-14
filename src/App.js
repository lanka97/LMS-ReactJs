import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


import 'font-awesome/css/font-awesome.min.css';

import Home from './components/Home';
import Header from './components/Header';
import Signin from './components/signin';
import SideBar from './components/admin/SideBar';
import Dashboard from './components/admin/Dashboard';
import AddUser from './components/admin/AddUser';

import './App.css';

export class App extends React.Component {

  // constructor() {
  //   super();
  // }


  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {/* <Route path="/" 
          render={(routeProps) => (
            <Header {...routeProps} user = {"user"} />
            )}/> */}
            <Route path="/" component={Header} />
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/login' component={Signin} />
            <Route path='/sidebar' component={SideBar} />
            <Route exact path='/admin/dashboard' component={Dashboard} />
            <Route exact path='/admin/users' component={AddUser} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
