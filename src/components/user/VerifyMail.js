import React, { Component } from 'react';

import { Alert, Container, Form, Col, InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { getUserByUsername, verifyUser, sendVerifyMail } from '../../services/userServices';

export default class VerifyMail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            email: '',
            code: '',
            error: false,
            success: ''
        };

        this.getUser = this.getUser.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
        this.resendCode = this.resendCode.bind(this);
    }

    componentDidMount() {
        const username = JSON.parse(localStorage.getItem('tempUsername'));
        if (username) {
            this.getUser(username);
        } else {
            this.props.history.push('/login');
        }

    }

    getUser(username) {

        getUserByUsername(username)
            .then(res => {
                console.log(res.data);
                if (res) {
                    res = res.data;
                    if (res.user.confirmed) {
                        this.props.history.push('/login');
                    } else {
                        this.setState({
                            //message: res.message,
                            id: res.user._id,
                            email: res.user.email
                        });
                    }

                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                err = err.response.data;
                this.setState({
                    error: true,
                    message: err.message
                });
            });
    };

    verifyCode(code) {
        const id = this.state.id;
        const user = {
            confirm_code: code
        }

        verifyUser(id, user)
            .then(res => {
                console.log(res.data);
                if (res) {
                    res = res.data;
                    this.setState({
                        message: res.message,
                        error: false
                    });

                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                err = err.response.data;
                this.setState({
                    error: true,
                    message: err.message
                });
            });

        console.log(id + this.state.message + this.refs.code.value)

    }


    resendCode() {

        sendVerifyMail(this.state.id)
            .then(res => {
                res = res.data;
                console.log(res);
                if (res) {
                    this.setState({ message: res.message, error: false });
                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                err = err.response.data
                this.setState({
                    message: err.message,
                    error: true
                });
            });

    }


    displayError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger text-center">
                    <h6>{this.state.message}</h6>
                </div>
            );
        } else {
            return (
                <div className="alert text-success text-center">
                    <h6>{this.state.message}</h6>
                </div>
            );
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
            this.verifyCode(this.refs.code.value);
        }

    }

    render() {
        const { validated } = this.state;
        return (
            <Container className="mt-5 mb-5">
                {this.displayError()}
                <Card className="bg-light">
                    <Card.Body>

                        <Alert variant="success">
                            <Alert.Heading>Hey, Thanks for registering with our app</Alert.Heading>
                            <p>
                                An email verification code has been sent to {this.state.email} <br />
                                Please copy the code and enter it in the text box below to continue.
                            </p>
                            <hr />
                            <p className="mb-0">
                                If you would like a new code, or you haven't reveived the email,
                                to send a new one <Button className="pt-0 pl-0" variant="link" onClick={this.resendCode}> click here</Button>
                            </p>
                        </Alert>

                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <Form.Row className="text-center d-flex justify-content-center">

                                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter code here"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            ref="code"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter the code.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Button type="submit">Submit code</Button>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
