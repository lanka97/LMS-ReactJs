import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Col, InputGroup, Button, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from '../services/userServices';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      username: '',
      password: '',
      message: '',
      error: false
    };

    this.validateUser = this.validateUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayError = this.displayError.bind(this);

  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.props.history.push('/');
    }
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      event.preventDefault();
      this.setState({
        username: this.refs.username.value,
        password: this.refs.password.value
      });
      this.validateUser();
    }
  }

  validateUser() {
    const user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }

    loginUser(user)
      .then(res => {
        if (res) {
          res = res.data;
          this.setState({ message: res.message });
          localStorage.setItem('user', JSON.stringify(res.user));
          this.props.history.push('/home');
        } else {
          this.setState({ message: 'Something went wrong' });
        }
      })
      .catch(err => {
        err = err.response.data;
        localStorage.setItem('tempUsername', JSON.stringify(user.username));
        this.setState({
          error: true,
          message: err.message
        });
      });
  }

  displayError() {
    if (this.state.error) {
      if (this.state.message === "Please verify your email") {
        return (
          <div className="alert alert-danger">
            <h6>{this.state.message}! <Link to="/user/verify">Click here</Link></h6>
          </div>
        );
      } else {
        return (
          <div className="alert alert-danger">
            <h6>{this.state.message}</h6>
          </div>
        );
      }
    }
  }

  render() {
    const { validated } = this.state;

    return (
      <Container className="h-100 mt-5">
        <Row className="h-100 justify-content-center align-items-center">
          <Col md={5} className="text-center">
            {this.displayError()}
            <Card bg={"light"}>
              <Card.Body>
                <Form noValidate validated={validated}
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          ref="username"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your username
                      </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          aria-describedby="inputGroupPrepend"
                          ref="password"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your password
                      </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                  </Form.Row>
                  <Form.Group>
                    <Form.Label>Not a member yet? <Link to="/signup">Signup</Link></Form.Label>
                  </Form.Group>
                  <Button
                    type="submit"
                  >Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
