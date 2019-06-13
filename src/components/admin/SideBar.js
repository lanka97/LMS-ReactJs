import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Container, Row, Col, Nav, NavDropdown, Form } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';


export default class SideBar extends Component {
    render() {
        return (
            <Col md={2} style={{ padding: 0}} className="bg-dark">
                <ListGroup>
                    <ListGroupItem className="bg-dark text-white"></ListGroupItem>
                    <ListGroupItem className="bg-dark text-white" tag="a" href="/admin/dashboard" action>
                        <FontAwesomeIcon icon={faHome} /> &nbsp; Dashboard
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark text-white" tag="a" href="/admin/users" action>
                        <FontAwesomeIcon icon={faUser} /> &nbsp; Users
                    </ListGroupItem>
                </ListGroup>
            </Col>

        )
    }
}
