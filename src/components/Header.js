import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';

import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({
        username: user.username
      })
    }

  }

  showSinginButton() {
    //console.log(this.state.user.username);
    if (localStorage.getItem('user')) {

      return (
        <Navbar>
          <Nav>
            <NavDropdown title={this.state.username} id="nav-dropdown" className="active">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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

  navSignIn() {
    console.log("ssssssssss");
    return (<Redirect to="/" />);
  }

  routeChange() {
    let path = '/login';
    console.log(path);
    this.props.history.push('/login');
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

  onLogout() {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>

        <Navbar expand="lg" bg="primary" variant="dark">
          <Navbar.Brand href="/home">
            <span className="navItem">SLIT</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home" > <span className="navItem">Home</span></Nav.Link>
              <Nav.Link href="/link"> <span className="navItem">Link</span></Nav.Link>
              {this.navbarItems()}
              <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>

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
