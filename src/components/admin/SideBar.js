import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Container, Row, Col, Nav, NavDropdown, Form } from 'react-bootstrap';


export default class SideBar extends Component {
    render() {
        return (
            <Col md={2} style={{ padding: 0 }}>
                <table className="table ">
                    <tr>
                        <td><Nav.Link to="/home"><span className="fa fa-home"></span> Dashboard</Nav.Link></td>
                    </tr>
                    <tr>
                        <td><Nav.Link to="/home"><span className="fa fa-user"></span> Users</Nav.Link></td>
                    </tr>
                    <tr>
                        <td>three</td>
                    </tr>
                    <tr>
                        <td>four</td>
                    </tr>
                    <tr>
                        <td>five</td>
                    </tr>
                </table>
            </Col>

        )
    }
}
