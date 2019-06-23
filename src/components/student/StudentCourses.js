import React, { Component } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, Button } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';
import axios from 'axios';

import '../../CSS/courses.css';



class Courses extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            courses: '',
            showView: false,
            activeCourses: '',
            course: '',
            showSingleView: false,
            showEnroll: false,
            key: '',
            name: '',
            id: '',
            e_key: '',
            showRemove: false,
            selectedCourse: ''
        };
        this.getActiveCourses = this.getActiveCourses.bind(this);
        this.handleViewShow = this.handleViewShow.bind(this);
        this.handleViewClose = this.handleViewClose.bind(this);
        this.handleSingleViewClose = this.handleSingleViewClose.bind(this);
        this.handleSingleViewShow = this.handleSingleViewShow.bind(this);
        this.handleEnrollShow = this.handleEnrollShow.bind(this);
        this.handleEnrollClose = this.handleEnrollClose.bind(this);
        this.enrollCourse = this.enrollCourse.bind(this);
        this.handleremoveClose = this.handleremoveClose.bind(this);
        this.handleremoveShow = this.handleremoveShow.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({
            user: user
        });

        this.getCourses();
    }

    getCourses() {
        fetch('https://learwebnode.appspot.com/lms/studentCourse/getAllById/5cf2787cd4506907ec6870c0', { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                console.log(_data);
                const _courses = [];

                for (const course of _data.studentCourse) {
                    _courses.push(
                        <div id="card-list" key={course._id}>
                            <MDBCard id="divcard">
                                <MDBCardHeader><h3>{course.courseName}</h3></MDBCardHeader>
                                <MDBCardBody>
                                    <a href={`/course/${course.courseName}`} className="button-margin btn btn-success text-white"  >View Course</a>
                                    <Button className="button-margin" color="danger" onClick={() => this.handleremoveShow(course._id)}>Unenroll Course</Button>
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

    removeCourse(id) {
        console.log("delete", id);
        axios.delete(`https://learwebnode.appspot.com/lms/studentCourse/unenroll/${id}`)
            .then(_data => {
                SweetAlert.fire({
                    title: "Unenrolled!!",
                    text: "Selected course unenrolled successfully",
                    type: "success",
                    timer: 10000,
                    showConfirmButton: true
                });
                this.handleremoveClose();
                this.componentDidMount();
            })
    }

    getCourseByID(id) {
        fetch('https://learnweb.appspot.com/lms/course/getbyid/' + id, { method: "GET" })
            .then(res => res.json())
            .then(_course => {
                this.setState({
                    course: _course,
                });
                console.log(this.state.course);
            });
    }

    getActiveCourses() {
        fetch('https://learwebnode.appspot.com/lms/course/filterbyfacultystatus/Computing/active', { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                console.log(_data);
                const _courses = [];

                for (const course of _data.courses) {
                    _courses.push(
                        <div key={course.id} >
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-6">
                                    <h5>{course.name}</h5>
                                </div>
                                <div className="col-5">
                                    <Button className="button-margin" color="primary" onClick={() => this.handleSingleViewShow(course._id)} >View Course</Button>
                                    <Button className="button-margin" color="success" onClick={() => this.handleEnrollShow(course._id, course.name, course.enroll_key)}>Enroll Course</Button>
                                </div>
                            </div>
                            <br />
                        </div>
                    )
                }
                this.setState(
                    this.state.activeCourses = _courses
                )
            })
    }

    handleViewClose() {
        this.setState({ showView: false });
    }

    handleViewShow() {
        this.getActiveCourses();
        this.setState({
            showView: true
        });
    }

    handleSingleViewClose() {
        this.setState({ showSingleView: false });
    }

    handleSingleViewShow(id) {
        console.log(id);
        this.getCourseByID(id);
        this.setState({
            showSingleView: true
        });
    }

    handleEnrollClose() {
        this.setState({ showEnroll: false });
    }

    handleEnrollShow(id, name, key) {
        console.log(id, name, key);
        this.setState({
            showEnroll: true,
            showView: false,
            id: id,
            name: name,
            e_key: key
        });
    }

    handleremoveClose() {
        this.setState({
            showRemove: false
        })
    }

    handleremoveShow(id) {
        this.setState({
            showRemove: true,
            selectedCourse: id
        })
    }


    valchange(e) {
        this.setState({
            key: e.target.value
        })
    }

    enrollCourse(key) {
        const body = {
            "studentId": "5cf2787cd4506907ec6870c0",
            "courseId": this.state.id,
            "courseName": this.state.name
        }
        if (this.state.e_key == key) {
            fetch('https://learwebnode.appspot.com/lms/studentCourse/enroll', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                SweetAlert.fire({
                    title: "Success!!",
                    text: "You are successfully enrolled to this course",
                    type: "success",
                    timer: 10000,
                    showConfirmButton: true
                });
                this.setState({
                    showEnroll: false
                })
                this.componentDidMount();
            });


        }
        else {
            SweetAlert.fire({
                title: "Invalid Enrollment Key!!",
                text: "Please enter the valid key",
                type: "error",
                timer: 10000,
                showConfirmButton: true
            });
        }
    }


    render() {
        return (
            <div>

                <div id="btn-div">
                    '<MDBBtn color="danger" onClick={this.handleViewShow}>Enroll New Course </MDBBtn>
                </div>

                <p className="h4 text-center mb-4">Courses</p>
                {this.state.courses}

                <Modal show={this.state.showView} onHide={this.handleViewClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Enroll Courses
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.activeCourses}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" onClick={this.handleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showSingleView} onHide={this.handleSingleViewClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.course.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5><b>Course ID : </b>{this.state.course.course_id}</h5><br />
                        <h5><b>Description : </b>{this.state.course.description}</h5><br />
                        <h5><b>Credits : </b>{this.state.course.credits}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="primary" onClick={this.handleSingleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEnroll} onHide={this.handleEnrollClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Enroll Course
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <b>Enter the Enrollment Key</b><br />
                        <input type="text" className="form-control w-50" value={this.state.key} onChange={(e) => this.valchange(e)} centered></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="success" onClick={() => this.enrollCourse(this.state.key)}>Enroll Now</Button>
                        <Button color="primary" onClick={this.handleEnrollClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRemove} onHide={this.handleremoveClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to unenroll from this course..?</Modal.Body>
                    <Modal.Footer>
                        <Button color="secondary" onClick={this.handleremoveClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={() => this.removeCourse(this.state.selectedCourse)}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Courses;
