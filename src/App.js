import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Header from './components/Header';
import Signin from './components/signin';
import Courses from './components/Courses';
import InstructorCourses from './components/InstructorCourses';
import StudentCourses from './components/StudentCourses';

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
            <Route path='/login' component={Signin} />
            <Route path='/Courses' component={Courses} />
            <Route path='/Ins' component={InstructorCourses} />
            <Route path='/student' component={StudentCourses} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
