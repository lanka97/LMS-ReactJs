import React, {Component} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, Button } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';


import {Link} from "react-router-dom";
import '../CSS/course.css';

import AddCourse from './AddCourse';


class Courses extends Component {

    constructor(props, context){
        super(props, context);
        this.state={
           courses:[],
           show: false,
           rowId: ''
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
        fetch('http://localhost:8080/lms/course/all', {method: "GET"})
        .then(res => res.json())
        .then(_data =>{
            console.log(_data);
            const _courses = [];

            for(const course of _data){
                _courses.push(
                    <div id="card-list">
                        <MDBCard id="divcard" key={course.id}>
                            <MDBCardHeader><h3>{course.name}</h3></MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle>Faculty of {course.faculty}</MDBCardTitle>
                                <MDBCardText>
                                <b>Department : </b>{course.department}<br/>
                                {course.description}
                                </MDBCardText>
                                <Button color="primary">View Course</Button>
                                <Button color="success">Edit Course</Button>
                                <Button color="danger" onClick={()=>this.handleShow(course.id)}>Delete Course</Button>
                            </MDBCardBody>
                        </MDBCard>
                        <br/>
                    </div>
                )
            }
            this.setState(
                this.state.courses = _courses
            )
        })
    }

    deleteCourse(id){
        console.log("delete", id);
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow(id) {
        this.setState({ 
            show: true,
            rowId: id 
        });
    }

    render() {
        return (
            <div>
                
                <div id="btn-div">
                    <Link to='/AddCourse'><MDBBtn color="success" >Add New Course </MDBBtn></Link>
                </div>
                
                <p className="h4 text-center mb-4">Courses</p>
                
                    {this.state.courses}

                    

                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!{this.state.rowId}</Modal.Body>
                <Modal.Footer>
                    <Button color="primary" onClick={this.handleClose}>
                    Cancel
                    </Button>
                    <Button color="danger" onClick={()=>this.deleteCourse(this.state.rowId)}>
                    Delete Course
                    </Button>
                </Modal.Footer>
                </Modal>    
            </div>
        );
    }
}

export default Courses;
