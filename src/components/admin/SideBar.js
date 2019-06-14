import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container, Row, Col, Nav, NavDropdown, Form, Button, Accordion, Card } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUserGraduate, faChalkboardTeacher, faUserSecret } from '@fortawesome/free-solid-svg-icons';


export default class SideBar extends Component {
    render() {
        return (
            // <Col md={2} style={{ padding: 0}} className="bg-dark">
            //     <ListGroup>
            //         <ListGroupItem className="bg-dark text-white"></ListGroupItem>
            //         <ListGroupItem className="bg-dark text-white" tag="a" href="/admin/dashboard" action>
            //             <FontAwesomeIcon icon={faHome} /> &nbsp; Dashboard
            //         </ListGroupItem>
            //         <ListGroupItem className="bg-dark text-white" tag="a" href="/admin/users" action>
            //             <FontAwesomeIcon icon={faUser} /> &nbsp; Users
            //         </ListGroupItem>
            //     </ListGroup>
            // </Col>

            <Col md={2} style={{ padding: 0 }} className="bg-dark">
                <Accordion defaultActiveKey="">
                    <Card.Link className="bg-dark text-white" href="/admin/dashboard">
                        <Accordion.Toggle as={Card.Header} className="mt-3">
                            <FontAwesomeIcon icon={faHome} /> &nbsp; Dashboard
                        </Accordion.Toggle>
                    </Card.Link>
                    <Card className="bg-dark text-white">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <FontAwesomeIcon icon={faUser} /> &nbsp; Users
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Link className="bg-dark text-white" href="/admin/users">
                                <Card.Header className="bg-secondary pl-4">
                                    <FontAwesomeIcon icon={faUserGraduate} /> &nbsp; Students
                            </Card.Header>
                            </Card.Link>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Header className="bg-secondary pl-4">
                                <FontAwesomeIcon icon={faChalkboardTeacher} /> &nbsp; Instructors
                            </Card.Header>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="0">
                            <Card.Header className="bg-secondary pl-4">
                                <FontAwesomeIcon icon={faUserSecret} /> &nbsp; Admins
                            </Card.Header>
                        </Accordion.Collapse>
                    </Card>
                    <Card className="bg-dark text-white">
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Click me!
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Header className="bg-secondary pl-4">Hello! I'm another body</Card.Header>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>

        )
    }
}
