import React, {Component} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import SweetAlert from 'sweetalert2';

import {Link} from "react-router-dom";
import '../CSS/course.css';



class AddCourse extends Component {

    constructor(props){
        super(props);
        this.state={
           
        };
        this.addCourse = this.addCourse.bind(this);

    }

    componentDidMount() {
    }

    addCourse(){
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

        fetch('http://localhost:8080/lms/course/add', {
            method: "POST",
            body: JSON.stringify(body),
            headers :{
                "Content-Type": "application/json"
            }
        }).then(res =>{
            SweetAlert.fire({
                title: "Success!!",
                text: "New course added successfully",
                type: "success",
                timer: 10000,
                showConfirmButton: true
            });
        }).catch(err =>{
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                            <p className="h4 text-center mb-4">Add New Course</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course ID</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="id"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Name</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="name"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Description</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="description"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Enrollment Key</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="enrollkey"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Credits</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="credits"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Faculty</label>
                            <br />
                            <select ref="faculty">
                                <option value="Computing">Computing</option>
                                <option value="Bussiness">Business</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Instructor</label>
                            <br />
                            <select ref="instructor_id">
                                <option value="Ins1">Ins1</option>
                                <option value="Ins2">Ins2</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Department</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" ref="department"/>
                            
                            <div className="text-center mt-4">
                            <MDBBtn color="primary" onClick={this.addCourse}>Create</MDBBtn>
                            <Link to='/Courses'><MDBBtn color="danger">Cancel</MDBBtn></Link>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                    </MDBContainer>
        </div>
        );
    }
}

export default AddCourse;
