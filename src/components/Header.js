import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fn_getAssignmentsByStudentID } from "./functions/submission";

import './Header.css';
<<<<<<< HEAD
=======

>>>>>>> b138cbdb13a7f7556b54c903e7f455c377925d9d
import 'bootstrap/dist/css/bootstrap.min.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notifications: []
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({
        user: user
      })

      fn_getAssignmentsByStudentID(user._id)
        .then(data => {
          this.setState({
            notifications: data.data,
          })
        })
    }

  }

  showNotification() {
    let icon = (<FontAwesomeIcon icon={faBell} className="notification" />);
    return (
      <div className="mr-2">
        <NavDropdown title={icon} id={"noti"}>

          {this.state.notifications.map((value, index) => {
            return (
              <NavDropdown.Item href={`/course/${value.courseId}`} className="bg-secondary">
                Your <span className="font-weight-bold">{value.assigmentName}</span> marks has been updated and you got
                    <span className="font-italic"> {value.marks} </span> mark({value.courseId})
                  </NavDropdown.Item>
            )
          })}
        </NavDropdown>
      </div>
    );
  }

  showSinginButton() {

    if (localStorage.getItem('user')) {
      console.log(this.state.user.username);
      return (
        <Navbar>
          {this.showNotification()}
          <Nav>
            <NavDropdown title={this.state.user.username} id="nav-dropdown" className="active">
              <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <button className='btn btn-primary ml-3' onClick={this.onLogout}>Logout </button>
        </Navbar>);

    } else {
      return (
        <div>
          <Link to='/login'>
            <button className='btn btn-primary mr-3' >Login </button>
          </Link>
          <Link to='/signup'>
            <button className='btn btn-primary' >Signup </button>
          </Link>
        </div>
      );

    }
  }

  routeChange() {

    let path = '/login';
    console.log(path);
    this.props.history.push('/login');

  }

  navbarItems() {
    if (this.state.user.type === 'STUDENT') {
      return (


        <Nav.Link href="/student/courses"> <span className="navItem">Courses</span></Nav.Link>


      );
    }

    if (this.state.user.type === 'INSTRUCTOR') {
      return (
        <Nav>
          <Nav.Link href="/instructor/courses"> <span className="navItem">Courses</span></Nav.Link>
          <Nav.Link href="/assingments"> <span className="navItem">Assingments</span></Nav.Link>
        </Nav>
      );
    }

  }

  onLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="/home">
            <span className="navItem">ISE</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home" > <span className="navItem">Home</span></Nav.Link>

              {this.navbarItems()}

            </Nav>

            <Form inline>
              <span className="navItem">{this.showSinginButton()}</span>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Header;
