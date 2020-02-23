import React, { Component } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, Button } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import AdminSideBar from './AdminSideBar';

import { Link } from "react-router-dom";
import '../../CSS/courses.css';



class Courses extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            courses: [],
            course: '',
            showDelete: false,
            showView: false,
            showUpdate: false,
            rowId: '',
            course_id: '',
            name: '',
            description: '',
            enroll_key: '',
            credits: '',
            faculty: '',
            department: '',
            instructor_id: '',
            status: '',
            showAdd: '',
            instructors: []
        };

        this.handleDeleteShow = this.handleDeleteShow.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.handleViewShow = this.handleViewShow.bind(this);
        this.handleViewClose = this.handleViewClose.bind(this);
        this.handleUpdateShow = this.handleUpdateShow.bind(this);
        this.handleUpdateClose = this.handleUpdateClose.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.handleAddShow = this.handleAddShow.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.getInstructor = this.getInstructor.bind(this);
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        fetch('https://learnweb.appspot.com/lms/course/all', { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                console.log(_data);
                const _courses = [];

                for (const course of _data) {
                    _courses.push(
                        <div id="card-list">
                            <MDBCard id="divcard" key={course.id}>
                                <MDBCardHeader><h3>{course.name}</h3></MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardTitle>Faculty of {course.faculty}</MDBCardTitle>
                                    <MDBCardText>
                                        <b>Department : </b>{course.department}<br />
                                        {course.description}
                                    </MDBCardText>
                                    <Button className="button-margin" color="primary" onClick={() => this.handleViewShow(course.id)}>View Course</Button>
                                    <Button className="button-margin" color="success" onClick={() => this.handleUpdateShow(course.id)}>Edit Course</Button>
                                    <Button className="button-margin" color="danger" onClick={() => this.handleDeleteShow(course.id)}>Delete Course</Button>
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

    deleteCourse(id) {
        console.log("delete", id);
        axios.delete(`https://learnweb.appspot.com//lms/course/remove/${id}`)
            .then(_data => {
                SweetAlert.fire({
                    title: "Success!!",
                    text: "Selected course deleted successfully",
                    type: "success",
                    timer: 10000,
                    showConfirmButton: true
                });
                this.handleDeleteClose();
                this.componentDidMount();
            })
    }

    getCourseById(id) {
        fetch('https://learnweb.appspot.com/lms/course/getbyid/' + id, { method: "GET" })
            .then(res => res.json())
            .then(_course => {
                this.setState({
                    course: _course,
                    course_id: this.state.course.course_id,
                    name: this.state.course.name,
                    description: this.state.course.description,
                    enroll_key: this.state.course.enroll_key,
                    credits: this.state.course.credits,
                    faculty: this.state.course.faculty,
                    department: this.state.course.department,
                    instructor_id: this.state.course.instructor_id,
                    status: this.state.course.status
                });
                console.log(this.state.course);
            });
    }

    updateCourse() {
        const body = {
            course_id: this.state.course.course_id,
            name: this.state.course.name,
            description: this.refs.description.value,
            enroll_key: this.refs.enrollkey.value,
            credits: this.refs.credits.value,
            faculty: this.refs.faculty.value,
            department: this.refs.department.value,
            instructor_id: this.refs.instructor_id.value,
            status: this.state.course.status
        };

        fetch('https://learnweb.appspot.com/lms/course/update/' + this.state.rowId, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            SweetAlert.fire({
                title: "Success!!",
                text: "Course updated successfully",
                type: "success",
                timer: 10000,
                showConfirmButton: true
            });
            this.handleUpdateClose();
            this.componentDidMount();
        }).catch(err => {
            console.log(err);
        });
    }

    handleDeleteClose() {
        this.setState({ showDelete: false });
    }

    handleDeleteShow(id) {
        this.setState({
            showDelete: true,
            rowId: id
        });
    }

    handleViewClose() {
        this.setState({ showView: false });
    }

    handleViewShow(id) {
        this.setState({
            showView: true
        });
        this.getCourseById(id);
    }

    handleUpdateClose() {
        this.setState({ showUpdate: false });
    }

    handleUpdateShow(id) {
        fetch('https://learnweb.appspot.com/lms/course/getbyid/' + id, { method: "GET" })
            .then(res => res.json())
            .then(_course => {
                this.setState({
                    course: _course,
                    course_id: this.state.course.course_id,
                    name: this.state.course.name,
                    description: this.state.course.description,
                    enroll_key: this.state.course.enroll_key,
                    credits: this.state.course.credits,
                    faculty: this.state.course.faculty,
                    department: this.state.course.department,
                    instructor_id: this.state.course.instructor_id,
                    status: this.state.course.status,
                });
                console.log(this.state.course);
            }).then(
                this.setState({
                    showUpdate: true,
                    rowId: id
                })
            );
    }

    addCourse() {
        const body = {
            course_id: this.refs.id.value,
            name: this.refs.name.value,
            description: this.refs.description.value,
            enroll_key: this.refs.enrollkey.value,
            credits: this.refs.credits.value,
            faculty: this.refs.faculty.value,
            department: this.refs.department.value,
            instructor_id: this.refs.instructor_id.value,
            status: "inactive"
        };

        fetch('https://learnweb.appspot.com/lms/course/add', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            SweetAlert.fire({
                title: "Success!!",
                text: "New course added successfully",
                type: "success",
                timer: 10000,
                showConfirmButton: true
            });
            this.componentDidMount();
            this.handleAddClose();
        }).catch(err => {
            console.log(err);
        });
    }

    getInstructor(e) {
        let value = e.target.value;
        this.setState({
            faculty: value
        });

        axios.get(`https://learwebnode.appspot.com/user/instructor/${value}`)
            .then(data => {
                data = data.data;
                this.setState({
                    instructors: data.users
                })
            });
        console.log("faculty", value);
    }

    handleAddClose() {
        this.setState({ showAdd: false });
    }

    handleAddShow() {
        this.setState({
            showAdd: true,
        })
    }

    handleInputChange(e) {
        this.setState({
            description: e.target.description,
            enroll_key: e.target.enroll_key,
            credits: e.target.credits,
            faculty: e.target.faculty,
            department: e.target.department,
            instructor_id: e.target.instructor_id
        });
    }

    render() {
        return (
            <Container fluid={1} style={{ fontSize: '14px' }}>
                <Row>
                    <AdminSideBar />
                    <Col style={{ padding: 0 }}>
                        <div>

                            <div id="btn-div">
                                <MDBBtn color="success" onClick={this.handleAddShow}>Add New Course </MDBBtn>
                            </div>

                            <p className="h4 text-center mb-4">Courses</p>
                            {this.state.courses}

                            <Modal show={this.state.showDelete} onHide={this.handleDeleteClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete Course</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><b>Do you want to delete this course..?</b></Modal.Body>
                                <Modal.Footer>
                                    <Button color="primary" onClick={this.handleDeleteClose}>
                                        Cancel
                    </Button>
                                    <Button color="danger" onClick={() => this.deleteCourse(this.state.rowId)}>
                                        Delete Course
                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showView} onHide={this.handleViewClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        {this.state.course.name}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5><b>Course Name : </b>{this.state.course.name}</h5>
                                    <h5><b>Course ID : </b>{this.state.course.course_id}</h5>
                                    <h5><b>Faculty : </b>{this.state.course.faculty}</h5>
                                    <h5><b>Department : </b>{this.state.course.department}</h5>
                                    <h5><b>Description : </b>{this.state.course.description}</h5>
                                    <h5><b>Credits : </b>{this.state.course.credits}</h5>
                                    <h5><b>Enrollment Key : </b>{this.state.course.enroll_key}</h5>
                                    <h5><b>Status :</b>{this.state.course.status}</h5>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button color="primary" onClick={this.handleViewClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showUpdate} onHide={this.handleUpdateClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Update Course
                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course ID</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.course_id} ref="id" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Name</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.name} ref="name" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Description</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.description} onChange={e => this.handleInputChange(e)} ref="description" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Enrollment Key</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.enroll_key} onChange={e => this.handleInputChange(e)} ref="enrollkey" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Credits</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.credits} onChange={e => this.handleInputChange(e)} ref="credits" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Faculty</label>
                                        <br />
                                        <Form.Control as="select" ref="faculty" onChange={this.getInstructor}>
                                            <option defaultValue="null">Select</option>
                                            <option value="Computing">Computing</option>
                                            <option value="Business">Business</option>
                                            <option value="Engineering">Engineering</option>
                                        </Form.Control>
                                        <br />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Instructor</label>
                                        <br />
                                        <Form.Control as="select" ref="instructor_id" onChange={this.getInstructor}>
                                            {this.state.instructors.map((value, index) => {
                                                return (
                                                    <option key={index} value={value._id}>{value.fullname}</option>
                                                )
                                            })}
                                        </Form.Control>
                                        <br />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Department</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.department} onChange={e => this.handleInputChange(e)} ref="department" />
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="text-center mt-4">
                                        <MDBBtn className="button-margin" color="danger" onClick={this.handleUpdateClose}>Cancel</MDBBtn>
                                        <MDBBtn color="primary" className="button-margin" onClick={this.updateCourse}>Update</MDBBtn>
                                    </div>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showAdd} onHide={this.handleAddClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add New Course
                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course ID</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="id" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Name</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="name" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Description</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="description" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Enrollment Key</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="enrollkey" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Credits</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="credits" />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Faculty</label>
                                        <br />
                                        <Form.Control as="select" ref="faculty" onChange={this.getInstructor}>
                                            <option defaultValue="null">Select</option>
                                            <option value="Computing">Computing</option>
                                            <option value="Business">Business</option>
                                            <option value="Engineering">Engineering</option>
                                        </Form.Control>
                                        <br />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Instructor</label>
                                        <br />
                                        <Form.Control as="select" ref="instructor_id" onChange={this.getInstructor}>
                                            {this.state.instructors.map((value, index) => {
                                                return (
                                                    <option key={index} value={value._id}>{value.fullname}</option>
                                                )
                                            })}
                                        </Form.Control>
                                        <br />
                                        <br />
                                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Department</label>
                                        <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="department" />
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="text-center mt-4">
                                        <MDBBtn className="button-margin" color="danger" onClick={this.handleAddClose}>Cancel</MDBBtn>
                                        <MDBBtn color="primary" className="button-margin" onClick={this.addCourse}>Add Course</MDBBtn>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Courses;
