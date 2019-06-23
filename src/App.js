import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import AssingmentMain from './components/Assingments/AssingmentMain'

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
import AdminDashboard from './components/admin/AdminDashboard';
import AddUser from './components/admin/AddUser';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import Courses from './components/admin/Courses';
import InstructorCourses from './components/instructor/InstructorCourses';
import StudentCourses from './components/student/StudentCourses';
import submission from './components/submission/upload';
import submissionInfo from './components/submission/submissionInfo';
import notification from './components/submission/notifications';
import viewCourse from './components/course/viewCourse';


import './App.css';
import viewAllSubmissions from "./components/submission/viewAllSubmissions";

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

function HomeRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {

      if (user && user.type === "ADMIN") {
        return (
          <Redirect
            to={{
              pathname: "/admin/dashboard",
              state: {
                from: props.location
              }
            }}
          />
        );
      }

      if (user && user.type === "INSTRUCTOR") {
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
      }

      if (!user || user.type === "STUDENT") {
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

    }
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <div>

            <Route path="/" component={Header} />
            <Route exact path='/' component={Home} />

            <HomeRoute exact path='/home' component={Home} />

            <GuestRoute exact path='/login' component={Login} />
            <GuestRoute exact path='/signup' component={Signup} />
            <GuestRoute exact path="/user/verify" component={VerifyMail} />

            <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            <AdminRoute exact path='/admin/users/create' component={AddUser} />
            <AdminRoute exact path='/admin/courses' component={Courses} />

            <InstructorRoute exact path='/instructor/dashboard' component={InstructorDashboard} />
            <InstructorRoute exact path='/instructor/courses' component={InstructorCourses} />

            <StudentRoute exact path='/student/courses' component={StudentCourses} />

            <AuthRoute exact path='/user/profile' component={Profile} />

            <InstructorRoute exact path='/assingments' component={AssingmentMain} />
            <StudentRoute path='/course/:courseID/assignment/:assignment/status' component={submissionInfo} />
            <StudentRoute path='/course/:courseID/assignment/:assignment/upload' component={submission} />
            <InstructorRoute path='/course/:courseID/assignment/:assignment/view/:viewType' component={viewAllSubmissions} />
            <StudentRoute exact path='/notifications' component={notification} />
            <StudentRoute exact path='/course/:name' component={viewCourse} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
