import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';

import './Header.css';
import {faBellSlash as notification_icon} from "@fortawesome/free-solid-svg-icons";


import Signin from './signin';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: props.user
    }
  }
  showSinginButton() {
    if (this.state.user) {
      return (<div>
        {this.state.user}
      </div>);
    } else {
      return (<Link to='/login'>
        <button className='btn btn-success' > Sign in </button>
      </Link>);
    }
  }

  showNotification(){
    let icon = (<FontAwesomeIcon icon={notification_icon} className="notification"/>);
    return(
        <div className="mr-5">
          <NavDropdown title={icon} id={"noti"}>
            <NavDropdown.Item href="#action/3.1" className="bg-secondary">
              fefsefe
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </div>
    );
  }

  navSignIn() {
    return (<Redirect to="/" />);
  }

  routeChange() {
    this.props.history.push({ Signin });
  }

  navbarItems() {
    if (this.props.user === 'student') {
      return (
        <Nav.Link href="/Courses"> <span className="navItem">Link</span></Nav.Link>
      );
    }
    else {

    }
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
              <Nav.Link href="/assingments"> <span className="navItem">Assingments</span></Nav.Link>
              {this.navbarItems()}
              <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              {this.showNotification()}
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
