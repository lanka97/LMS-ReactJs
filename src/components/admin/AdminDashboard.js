import React, { Component } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { getUsers } from '../../services/userServices';

import AdminSideBar from './AdminSideBar';
import { Bar, Pie } from 'react-chartjs-2';


export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showA: true,
            showB: true,
            allStudents: [],
            students: [],
            allInstructors: [],
            instructors: [],
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
        const instTemp = [];
        const adminTemp = [];


        getUsers()
            .then(res => {
                if (res) {
                    res = res.data;

                    for (let i = 0; i < 10; i++) {
                        console.log(res.users[i].type)
                        if (res.users[i].type === 'STUDENT') {
                            studenttemp.push(
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{res.users[i].fullname}</td>
                                    <td>{res.users[i].created_at}</td>
                                    <td>{res.users[i].faculty}</td>
                                    <td>{res.users[i].confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        }


                        if (res.users[i].type === 'INSTRUCTOR') {
                            instTemp.push(
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{res.users[i].fullname}</td>
                                    <td>{res.users[i].created_at}</td>
                                    <td>{res.users[i].faculty}</td>
                                    <td>{res.users[i].confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        }



                        if (res.users[i].type === 'ADMIN') {
                            adminTemp.push(
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{res.users[i].fullname}</td>
                                    <td>{res.users[i].created_at}</td>
                                    <td>{res.users[i].faculty}</td>
                                    <td>{res.users[i].confirmed ? 'Yes' : 'No'}</td>
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

        console.log(this.state.students)
    }


    render() {

        const data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 10, 5, 7, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const options = {
            annotation: {
                annotations: [{
                    drawTime: 'afterDatasetsDraw',
                    borderColor: 'red',
                    borderDash: [2, 2],
                    borderWidth: 2,
                    mode: 'vertical',
                    type: 'line',
                    value: 10,
                    scaleID: 'x-axis-0',
                }]
            },
            maintainAspectRation: true
        };



        return (

            <Container fluid={1} style={{ fontSize: '14px' }}>
                <Row>
                    <AdminSideBar />
                    <Col style={{ padding: 0 }}>
                        <Container style={{ padding: '20px' }}>
                            {/* <h2>Dashboard</h2> */}
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
                                        <Card.Header>Some chart</Card.Header>
                                        <Card.Text>
                                            <Bar
                                                data={data}
                                                width={100}
                                                height={50}
                                                options={options}
                                            />
                                        </Card.Text>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <Card.Header>Another chart</Card.Header>
                                        <Card.Text>
                                            <Pie
                                                data={data}
                                                width={100}
                                                height={50}
                                                options={options}
                                            />
                                        </Card.Text>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '50px' }}>
                                <Col md={6}>
                                    <Card>
                                        <Card.Header>Latest 10 Students</Card.Header>
                                        <Card.Text style={{ padding: '10px' }}>
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>#</th>
                                                        <th>Name</th>
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
                                        <Card.Header>Latest 10 Instructors</Card.Header>
                                        <Card.Text style={{ padding: '10px' }}>
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>#</th>
                                                        <th>Name</th>
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

                        </Container>
                    </Col>
                </Row>
            </Container>

        )
    }
}
