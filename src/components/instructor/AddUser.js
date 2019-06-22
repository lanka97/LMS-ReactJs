import React, { Component } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

import AdminSideBar from './InstructorSideBar';

export default class AddUser extends Component {
    render() {
        return (

            <Container fluid={1} style={{ fontSize: '14px' }}>
                <Row style={{ minHeight: '680px' }}>
                    <AdminSideBar />
                    <Col style={{ padding: 0 }}>
                        <Container style={{ padding: '20px' }}>
                            <Row style={{ marginTop: '30px' }}>
                                <Col>
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between">
                                            <span>Students</span> <Button variant="primary" size="sm">Add Students</Button>
                                        </Card.Header>
                                        <Card.Text style={{ padding: '10px' }}>


                                            <hr />

                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    <tr className="bg-dark text-white">
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Joined</th>
                                                        <th>Faculty</th>
                                                        <th>Verified</th>
                                                    </tr>
                                                    <tr>
                                                        <th>1</th>
                                                        <td>John Doe</td>
                                                        <td>2019/06/06</td>
                                                        <td>Computing</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <td>John Doe</td>
                                                        <td>2019/06/06</td>
                                                        <td>Computing</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Text>
                                    </Card>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '50px' }}>
                                <Col>
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
                                                    <tr>
                                                        <th>1</th>
                                                        <td>John Doe</td>
                                                        <td>2019/06/06</td>
                                                        <td>Computing</td>
                                                        <td>Yes</td>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <td>John Doe</td>
                                                        <td>2019/06/06</td>
                                                        <td>Computing</td>
                                                        <td>Yes</td>
                                                    </tr>
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
