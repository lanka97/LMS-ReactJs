import React, { Component } from 'react'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, Button } from 'mdbreact';
import SweetAlert from 'sweetalert2';
import { Modal } from 'react-bootstrap';

import '../../CSS/courses.css';



class InstructorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            newCourses: '',
            showModal: false,
            showView: false,
            course: {},
            courses: '',
            showAcepetedView: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.getNewCourses = this.getNewCourses.bind(this);
        this.handleViewClose = this.handleViewClose.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.getCourses = this.getCourses.bind(this);
        this.handleAceptedViewClose = this.handleAceptedViewClose.bind(this);
        this.handleAceptedViewShow = this.handleAceptedViewShow.bind(this);
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({
            user: user
        });

        this.getNewCourses();
        this.getCourses();

        console.log(this.state.user);
    }

    getCourses() {
        fetch('https://learwebnode.appspot.com/lms/course/filterbyinstructorstatus/5cf27fc1d4506926f4b19245/active', { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                console.log(_data);
                const _courses = [];

                for (const course of _data.courses) {
                    _courses.push(
                        <div id="card-list" key={course._id}>
                            <MDBCard id="divcard">
                                <MDBCardHeader><h3>{course.name}</h3></MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardTitle>Course ID :{course.course_id}</MDBCardTitle>
                                    <MDBCardText>
                                        <h5><b>Description : </b>{course.description}</h5>
                                        <h5><b>Department : </b>{course.department}</h5>
                                        <h5><b>Course ID : </b>{course.course_id}</h5>
                                        <h5><b>Faculty : </b>{course.faculty}</h5>
                                        <h5><b>Credits : </b>{course.credits}</h5>
                                        <h5><b>Enrollment Key : </b>{course.enroll_key}</h5>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    )
                }
                this.setState(
                    this.state.courses = _courses
                )
            })
    }

    getNewCourses() {
        fetch('https://learwebnode.appspot.com/lms/course/filterbyinstructorstatus/5cf27fc1d4506926f4b19245/inactive', { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                var x = _data.courses
                console.log(x.length);
                if (x != 0) {
                    const _courses = [];

                    for (const course of _data.courses) {
                        _courses.push(
                            <div>
                                <b>{course.name} </b>
                                <Button className="button-margin" color="primary" onClick={() => this.handleViewShow(course._id)}>View Course</Button>
                            </div>
                        )
                    }
                    this.setState(
                        this.state.newCourses = _courses
                    )
                    this.handleShow();
                } else {
                    this.handleClose();
                }
            })
    }

    getCourseById(id) {
        fetch('https://learnweb.appspot.com/lms/course/getbyid/' + id, { method: "GET" })
            .then(res => res.json())
            .then(_course => {
                this.setState({
                    course: _course
                });
                console.log(this.state.course);
            });
    }

    changeStatus(id, status) {
        const body = {
            status: status
        }

        console.log(id, status);
        fetch('https://learwebnode.appspot.com/lms/course/changestatus/' + id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (status == "active") {
                SweetAlert.fire({
                    title: "Success!!",
                    text: "Course Accepted successfully",
                    type: "success",
                    timer: 10000,
                    showConfirmButton: true
                });
                this.componentDidMount();
                this.handleViewClose();
            } else {
                SweetAlert.fire({
                    title: "Rejected!!",
                    text: "Course Rejected successfully",
                    type: "error",
                    timer: 10000,
                    showConfirmButton: true
                });
                this.componentDidMount();
                this.handleViewClose();
            }

        }).catch(err => {
            console.log(err);
        });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleShow() {
        this.setState({
            showModal: true,
        });
    }

    handleViewClose() {
        this.setState({ showView: false });
    }

    handleViewShow(id) {
        this.setState({
            showView: true
        });
        console.log(id);
        this.getCourseById(id);
    }

    handleAceptedViewClose() {
        this.setState({ showAcepetedView: false });
    }

    handleAceptedViewShow(id) {
        this.getCourseById(id);
        this.setState({
            showAcepetedView: true
        });
        console.log(id);
    }


    render() {
        return (
            <div>
                <p className="h4 text-center mb-4">Courses</p>
                {this.state.courses}
                {console.log(this.state.courses)}
                <Modal show={this.state.showModal} onHide={this.handleClose} backdrop="true">
                    <Modal.Header closeButton>
                        <Modal.Title>Assigned new courses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.newCourses}</Modal.Body>
                </Modal>

                <Modal show={this.state.showView} onHide={this.handleViewClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.course.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.course.description}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button-margin" color="success" onClick={() => this.changeStatus(this.state.course.id, "active")}>Accept Course</Button>
                        <Button className="button-margin" color="danger" onClick={() => this.changeStatus(this.state.course.id, "rejected")}>Reject Course</Button>
                        <Button className="button-margin" color="primary" onClick={this.handleViewClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showAcepetedView} onHide={this.handleAceptedViewClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="true">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.course.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.course.description}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button-margin" color="primary" onClick={this.handleAceptedViewClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default InstructorPage;
