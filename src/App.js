import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyMail from './components/user/VerifyMail';
import Profile from './components/user/Profile';
import AdminSideBar from './components/admin/AdminSideBar';
import AdminDashboard from './components/admin/AdminDashboard';
import AddUser from './components/admin/AddUser';
import InstructorDashboard from './components/instructor/InstructorDashboard';

import './App.css';

const user = JSON.parse(localStorage.getItem('user'));

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
    />
  );
}

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user && user.type === "ADMIN") {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
    />
  );
}

function StudentRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user && user.type === "STUDENT") {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
    />
  );
}

function InstructorRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user && user.type === "INSTRUCTOR") {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
    />
  );
}

function GuestRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user) {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        );

      } else {
        return <Component {...props} />;
      }
    }}
    />
  );
}

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      fuck: ''
    }
  }

  componentDidMount() {



  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <div>

            <Route path="/" component={Header} />
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />

            <GuestRoute exact path='/login' component={Login} />
            <GuestRoute exact path='/signup' component={Signup} />
            <GuestRoute exact path="/user/verify" component={VerifyMail} />

            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <AdminRoute exact path='/admin/users/students' component={AddUser} />

            <InstructorRoute exact path='/instructor/dashboard' component={InstructorDashboard} />

            <AuthRoute exact path='/user/profile' component={Profile} />

            <Route path='/sidebar' component={AdminSideBar} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
