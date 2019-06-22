import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Header from './components/Header';
import Signin from './components/signin';
import submission from './components/submission/upload';
import submissionInfo from './components/submission/submissionInfo';
import notification from './components/submission/notifications';
import viewCourse from './components/course/viewCourse';

import './App.css';
import viewAllSubmissions from "./components/submission/viewAllSubmissions";

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
            <Route path='/course/:courseID/assignment/:assignment/status' component={submissionInfo} />
            <Route path='/course/:courseID/assignment/:assignment/upload' component={submission} />
            <Route path='/course/:courseID/assignment/:assignment/view/:viewType' component={viewAllSubmissions} />
            <Route exact path='/notifications' component={notification} />
            <Route exact path='/course/:id' component={viewCourse} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
