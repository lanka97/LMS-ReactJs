import React, {Component} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import SweetAlert from 'sweetalert2';

import {Link} from "react-router-dom";
import '../CSS/auth.css';


class EditCourse extends Component {

    constructor(props){
        super(props);
        this.state={
        course_id: "aaa",
        name: "aaaa",
        description: "aaaaa",
        enroll_key: "qqqq",
        credits: "3",
        faculty: "Business",
        department: "qqqqq",
        instructor_id: "Ins2",
        status: "inactive"
        
    };
        this.addCourse = this.addCourse.bind(this);

    }

    componentDidMount() {
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

        console.log("body", body);

        // fetch('http://localhost:8080/lms/course/add', {
        //     method: "POST",
        //     body: JSON.stringify(body),
        //     headers :{
        //         "Content-Type": "application/json"
        //     }
        // }).then(res =>{
        //     SweetAlert.fire({
        //         title: "Success!!",
        //         text: "New course added successfully",
        //         type: "success",
        //         timer: 10000,
        //         showConfirmButton: true
        //     });
        // }).catch(err =>{
        //     console.log(err);
        // });
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                            <p className="h4 text-center mb-4">Update Course</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course ID</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.course_id} ref="id"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Name</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.name} ref="name"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Course Description</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.description} onChange={e => this.handleInputChange(e)} ref="description"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Enrollment Key</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.enroll_key} onChange={e => this.handleInputChange(e)} ref="enrollkey"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Credits</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.credits} onChange={e => this.handleInputChange(e)} ref="credits"/>
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Faculty</label>
                            <br />
                            <select value={this.state.faculty} onChange={e => this.handleInputChange(e)} ref="faculty">
                                <option value="Computing">Computing</option>
                                <option value="Business">Business</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Select Instructor</label>
                            <br />
                            <select value={this.state.instructor_id} onChange={e => this.handleInputChange(e)} ref="instructor_id">
                                <option value="Ins1">Ins1</option>
                                <option value="Ins2">Ins2</option>
                            </select>
                            <br />
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Enter Department</label>
                            <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.department} onChange={e => this.handleInputChange(e)} ref="department"/>
                            
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

export default EditCourse;
