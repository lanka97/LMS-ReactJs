import React, { Component } from 'react';

import { Container, Form, Row, Col, Table, InputGroup, Button, Card, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';

import { updateUser } from '../../services/userServices';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            validated: false,
            id: '',
            fullname: '',
            email: '',
            phone: '',
            gender: '',
            username: '',
            password: '',
            confirmPass: '',
            faculty: '',
            message: '',
            error: false
        };

        this.handleGender = this.handleGender.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.displayError = this.displayError.bind(this);

    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            username: user.username,
            faculty: user.faculty,
            type: user.type,
            created_at: user.created_at
        });

        console.log(user)


    }

    validateUser() {
        const user = {
            fullname: this.refs.fullname.value,
            phone: this.refs.phone.value,
            gender: this.state.gender,
            status: 'ACTIVE',
            email: this.state.email,
            faculty: this.state.faculty
        }

        updateUser(this.state.id, user)
            .then(res => {
                if (res) {
                    res = res.data;
                    console.log(res.user)
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.props.history.push('/user/profile')
                    this.setState({
                        error: false,
                        message: res.message
                    });
                    setInterval(
                        this.props.history.push('/user/profile'), 2000
                    );
                }
            })
            .catch(err => {
                err = err.response.data
                this.setState({
                    message: err.message
                });
            });

        console.log(this.state.message)
    }

    handleGender(gender) {
        this.setState({ gender });
        console.log(this.state.gender);
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


    render() {
        const { validated } = this.state;
        return (
            <Container className="mt-4">
                {this.displayError()}
                <Row>
                    <Col md={4}>

                        <Card>
                            <Card.Body>
                                <Table borderless size="sm">
                                    <tbody>
                                        <tr>
                                            <td>Full Name</td>
                                            <td>{this.state.fullname}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{this.state.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>{this.state.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{this.state.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Role</td>
                                            <td>{this.state.type}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>{this.state.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Faculty</td>
                                            <td>{this.state.faculty}</td>
                                        </tr>
                                        <tr>
                                            <td>Joined</td>
                                            <td>{this.state.created_at}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)} >

                                    <Form.Row>

                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
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
                                                    ref="fullname"
                                                    defaultValue={this.state.fullname}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a First name.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>

                                        <Form.Group as={Col} md="6" controlId="">
                                            <Form.Label>Phone</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend">
                                                        <FontAwesomeIcon icon={faPhone} />
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Phone"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                    ref="phone"
                                                    defaultValue={this.state.phone}
                                                    onChange={this.checkPhone}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a phone number.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="">
                                            <Form.Label> Gender</Form.Label>
                                            <InputGroup>
                                                <ButtonToolbar>
                                                    <ToggleButtonGroup type="radio" name="genderOptions" ref="gender" defaultValue="Male" onChange={this.handleGender}>
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

                                    <Button type="submit">Update Profile</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

