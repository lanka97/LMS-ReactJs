import React, { Component } from 'react';

import { Container, Row, Table, Form, Col, InputGroup, Button, Card, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';

import { registerUser, getUsers, sendVerifyMail, getUserByUsername } from '../../services/userServices';

import AdminSideBar from './AdminSideBar';

export default class AddUser extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleGender = this.handleGender.bind(this);
        this.handleFaculty = this.handleFaculty.bind(this);
        this.handleUserType = this.handleUserType.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
        this.displayError = this.displayError.bind(this);

        this.state = {
            validated: false,
            usernames: [],
            emails: [],
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            gender: 'Male',
            username: '',
            password: '',
            confirmPass: '',
            faculty: '',
            type: '',
            message: '',
            error: false
        };
    }


    componentDidMount() {

        const untemp = [];
        const emailtemp = [];

        getUsers()
            .then(res => {
                if (res) {
                    res = res.data;
                    for (const user of res.users) {
                        untemp.push(user.username);
                        emailtemp.push(user.email);
                    }
                    this.setState({
                        usernames: untemp,
                        emails: emailtemp
                    });
                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                err = err.response.data
                this.setState({
                    message: err.message
                });
            });
    }

    handleGender(gender) {
        this.setState({ gender });
        console.log(this.state.gender);
    }

    handleFaculty(faculty) {
        this.setState({ faculty });
        console.log(this.state.faculty);
    }

    handleUserType(type) {
        this.setState({ type });
        console.log(this.state.type);
    }

    handleUsername(event) {
        const currentUsername = event.target.value;
        const usernames = this.state.usernames;

        for (const username of usernames) {
            if (username === currentUsername) {
                this.setState({
                    error: true,
                    message: 'Username unavailable'
                });
                this.displayError();
                console.log()
                return;
            } else {
                this.setState({
                    error: false,
                    message: 'Username available'
                });
            }
        }

    }

    handleEmail(event) {
        const currentEmail = event.target.value;
        const emails = this.state.emails;

        for (const email of emails) {
            if (email === currentEmail) {
                this.setState({
                    error: true,
                    message: 'Email unavailable'
                });
                this.displayError();
                console.log()
                return;
            } else {
                this.setState({
                    error: false,
                    message: 'Email available'
                });
            }
        }

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

    validateUser() {
        const user = {
            fullname: this.refs.firstname.value + " " + this.refs.lastname.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            gender: this.state.gender,
            username: this.refs.username.value,
            password: this.refs.password.value,
            faculty: this.state.faculty,
            type: this.state.type,
            status: 'ACTIVE',
        }

        registerUser(user)
            .then(res => {
                res = res.data;
                console.log(res);
                if (res) {
                    this.setState({ message: res.message, error: false });
                    localStorage.setItem('tempUsername', JSON.stringify(user.username));
                    setTimeout(this.getUser(user.username), 1000);
                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                console.log(err);
                err = err.response.data
                this.setState({
                    message: err.message
                });
            });
    }

    getUser(username) {

        getUserByUsername(username)
            .then(res => {
                console.log(res.data);
                if (res) {
                    res = res.data;
                    this.setState({
                        message: res.message,
                        id: res.user._id,
                        email: res.user.email
                    });

                    this.sendEmail(res.user._id);

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


    sendEmail(userId) {

        sendVerifyMail(userId)
            .then(res => {
                res = res.data;
                console.log(res);
                if (res) {
                    this.setState({ message: res.message });
                } else {
                    this.setState({ message: 'Something went wrong' });
                }
            })
            .catch(err => {
                err = err.response.data
                this.setState({
                    message: err.message
                });
            });

    }

    checkPasswords() {
        if (this.refs.password.value != this.refs.confirmPass.value) {
            this.setState({ error: true, message: 'Passwords do not match' });
        } else {
            this.setState({ error: false, message: 'Passwords match' });
        }
    }


    checkPhone() {
        if (this.refs.phone.value.substring(0, 3) != '+94' || this.refs.phone.value.length != 12) {
            this.setState({ error: true, message: 'Invalid number' });
        } else {
            this.setState({ error: false, message: 'Valid number' });
        }
    }


    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false || this.state.error) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });

        } else {
            event.preventDefault();
            this.setState({ validated: true });
            this.validateUser();
        }

    }


    render() {
        const { validated } = this.state;
        return (

            <Container fluid={1} style={{ fontSize: '14px' }}>
                <Row style={{ minHeight: '680px' }}>
                    <AdminSideBar />
                    <Col style={{ padding: 0 }}>
                        <Container style={{ padding: '20px' }}>
                            <Row style={{ marginTop: '30px' }}>
                                <Col>
                                    <Card>
                                        <Card.Body>

                                            {this.displayError()}
                                            <Card className="bg-light">
                                                <Card.Body>
                                                    <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)} >

                                                        <Form.Row>

                                                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                                                <Form.Label>First name</Form.Label>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text id="inputGroupPrepend">
                                                                            <FontAwesomeIcon icon={faUser} />
                                                                        </InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="First name"
                                                                        aria-describedby="inputGroupPrepend"
                                                                        required
                                                                        ref="firstname"
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose a First name.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                                <Form.Label>Last name</Form.Label>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text id="inputGroupPrepend">
                                                                            <FontAwesomeIcon icon={faUser} />
                                                                        </InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Last name"
                                                                        aria-describedby="inputGroupPrepend"
                                                                        required
                                                                        ref="lastname"
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose a Last name.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Form.Row>

                                                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                                <Form.Label>Email</Form.Label>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text id="inputGroupPrepend">
                                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                                        </InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        aria-describedby="inputGroupPrepend"
                                                                        required
                                                                        ref="email"
                                                                        onChange={this.handleEmail}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose an email.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="4" controlId="">
                                                                <Form.Label>Phone</Form.Label>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text id="inputGroupPrepend">
                                                                            <FontAwesomeIcon icon={faPhone} />
                                                                        </InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Phone (+94XXXXXXXXX)"
                                                                        aria-describedby="inputGroupPrepend"
                                                                        required
                                                                        ref="phone"
                                                                        onChange={this.checkPhone}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose a phone number.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="4" controlId="">
                                                                <Form.Label> Gender</Form.Label>
                                                                <InputGroup>
                                                                    <ButtonToolbar>
                                                                        <ToggleButtonGroup type="radio" name="genderOptions" ref="gender" defaultValue={"Male"} onChange={this.handleGender}>
                                                                            <ToggleButton value={"Male"} >
                                                                                &nbsp;<FontAwesomeIcon icon={faMale} />&nbsp;&nbsp;Male&nbsp;
                                                                            </ToggleButton>
                                                                            <ToggleButton value={"Female"} >
                                                                                &nbsp;<FontAwesomeIcon icon={faFemale} />&nbsp;&nbsp;Female&nbsp;
                                                                            </ToggleButton>
                                                                        </ToggleButtonGroup>
                                                                    </ButtonToolbar>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please retype to confirm.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Form.Row>

                                                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                                <Form.Label>Username</Form.Label>
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
                                                                        required
                                                                        ref="username"
                                                                        onChange={this.handleUsername}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose a username.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="4" controlId="">
                                                                <Form.Label>Password</Form.Label>
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
                                                                        required
                                                                        ref="password"
                                                                        onChange={this.checkPasswords}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please choose a password.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="4" controlId="">
                                                                <Form.Label> Confirm Password</Form.Label>
                                                                <InputGroup>
                                                                    <InputGroup.Prepend>
                                                                        <InputGroup.Text id="inputGroupPrepend">
                                                                            <FontAwesomeIcon icon={faLock} />
                                                                        </InputGroup.Text>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="password"
                                                                        placeholder="Confirm Password"
                                                                        aria-describedby="inputGroupPrepend"
                                                                        required
                                                                        ref="confirmPass"
                                                                        onChange={this.checkPasswords}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please retype to confirm.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Form.Row>

                                                            <Form.Group as={Col} md="6" controlId="">
                                                                <Form.Label> Faculty</Form.Label>
                                                                <InputGroup>
                                                                    <ButtonToolbar>
                                                                        <ToggleButtonGroup type="radio" ref="faculty" name="facultyOptions" onChange={this.handleFaculty}>
                                                                            <ToggleButton value={"Computing"} >
                                                                                &nbsp;&nbsp;&nbsp;Computing&nbsp;&nbsp;
                                                                            </ToggleButton>
                                                                            <ToggleButton value={"Business"} >
                                                                                &nbsp;&nbsp;Business&nbsp;
                                                                            </ToggleButton>
                                                                            <ToggleButton value={"Engineering"} >
                                                                                &nbsp;&nbsp;Engineering&nbsp;
                                                                            </ToggleButton>
                                                                        </ToggleButtonGroup>
                                                                    </ButtonToolbar>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please retype to confirm.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Form.Group as={Col} md="6" controlId="">
                                                                <Form.Label> User Role</Form.Label>
                                                                <InputGroup>
                                                                    <ButtonToolbar>
                                                                        <ToggleButtonGroup type="radio" ref="type" name="typeOptions" onChange={this.handleUserType}>
                                                                            <ToggleButton value={"ADMIN"} >
                                                                                &nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;
                                                                            </ToggleButton>
                                                                            <ToggleButton value={"INSTRUCTOR"} >
                                                                                &nbsp;&nbsp;Instructor&nbsp;
                                                                            </ToggleButton>
                                                                        </ToggleButtonGroup>
                                                                    </ButtonToolbar>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please retype to confirm.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                        </Form.Row>

                                                        <Button type="submit">Signup</Button>
                                                    </Form>
                                                </Card.Body>
                                            </Card>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                        </Container>
                    </Col>
                </Row>
            </Container>

        )
    }
}
