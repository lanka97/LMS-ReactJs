import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Container, Row, Col, Nav, NavDropdown, Form, Button, Accordion, Card } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUserGraduate, faChalkboardTeacher, faUserSecret } from '@fortawesome/free-solid-svg-icons';


export default class InstructorSideBar extends Component {
    render() {
        return (

            <Col md={2} style={{ padding: 0 }} className="bg-dark">
                <Accordion defaultActiveKey="0">
                    <Card className="bg-dark text-white mt-5">
                        <Link className="bg-dark text-white" to="/admin/dashboard">
                            <Accordion.Toggle as={Card.Header}>
                                <FontAwesomeIcon icon={faHome} /> &nbsp; Dashboard
                        </Accordion.Toggle>
                        </Link>
                    </Card>
                    <Card className="bg-dark text-white">

                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <FontAwesomeIcon icon={faUser} /> &nbsp; User
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Link className="bg-dark text-white" to="/admin/dashboard">
                                <Accordion.Toggle as={Card.Header}>
                                    <FontAwesomeIcon icon={faHome} /> &nbsp; Dashboard
                                </Accordion.Toggle>
                            </Link>
                        </Accordion.Collapse>

                    </Card>
                </Accordion>
            </Col >

        )
    }
}
