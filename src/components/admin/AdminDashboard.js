import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { getUsers } from '../../services/userServices';

import AdminSideBar from './AdminSideBar';

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            students: [],
            allStudents: [],
            instructors: [],
            allInstructors: [],
            allAdmins: [],
            admins: []
        };

        this.getAllUsers = this.getAllUsers.bind(this);

    }

    componentDidMount() {

        this.getAllUsers();
    }


    getAllUsers() {
        const studenttemp = [];
        const studentrows = [];
        const instTemp = [];
        const adminTemp = [];


        getUsers()
            .then(res => {
                if (res) {
                    res = res.data;

                    for (const user of res.users) {

                        if (user.type === 'STUDENT') {
                            studenttemp.push(
                                <tr key={user._id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.created_at}</td>
                                    <td>{user.faculty}</td>
                                    <td>{user.confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        }

                        if (user.type === 'INSTRUCTOR') {
                            instTemp.push(
                                <tr key={user._id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.created_at}</td>
                                    <td>{user.faculty}</td>
                                    <td>{user.confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        }

                        if (user.type === 'ADMIN') {
                            adminTemp.push(
                                <tr key={user._id}>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.created_at}</td>
                                    <td>{user.confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        }
                    }

                    this.setState({
                        students: studenttemp,
                        instructors: instTemp,
                        admins: adminTemp
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


    render() {

        return (

            <Container fluid={1} style={{ fontSize: '14px' }}>
                <Row>
                    <AdminSideBar />
                    <Col style={{ padding: 0 }}>
                        <Container style={{ padding: '20px' }}>

                            <Row style={{ color: 'white', textAlign: 'right', marginTop: '30px' }}>
                                <Col md={4}>
                                    <Card bg="info" body>
                                        <h1>{this.state.students.length}</h1>
                                        <h4>Students</h4>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card bg="secondary" body>
                                        <h1>{this.state.instructors.length}</h1>
                                        <h4>Instructors</h4>
                                    </Card>
                                </Col>

                                <Col md={4}>
                                    <Card bg="danger" body>
                                        <h1>{this.state.admins.length}</h1>
                                        <h4>Admins</h4>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '50px' }}>
                                <Col md={6}>
                                    <Card>
                                        <Card.Header>Students</Card.Header>
                                        <Card.Text style={{ padding: '10px', minHeight: '400px' }}>
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>Joined</th>
                                                        <th>Faculty</th>
                                                        <th>Verified</th>
                                                    </tr>

                                                    {this.state.students}

                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <Card.Header>Instructors</Card.Header>
                                        <Card.Text style={{ padding: '10px', minHeight: '400px' }}>
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>Joined</th>
                                                        <th>Department</th>
                                                        <th>Verified</th>
                                                    </tr>

                                                    {this.state.instructors}

                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '20px' }}>
                                <Col md={12}>
                                    <Card>
                                        <Card.Header>Admins</Card.Header>
                                        <Card.Text style={{ padding: '10px' }}>
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>Joined</th>
                                                        <th>Verified</th>
                                                    </tr>

                                                    {this.state.admins}

                                                </tbody>
                                            </Table>
                                        </Card.Text>
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
