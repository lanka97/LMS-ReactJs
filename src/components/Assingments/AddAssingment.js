import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/assingment.css';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import SweetAlert from 'sweetalert2';

// import { Form } from 'react-bootstrap';


export class AddAssingmets extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            deadLine: new Date(),
            instructorId: 'Ins2',
            //props.instructorId,
            // currentDeadLine: this.props.deadLine,
            // assgnmentName: "props.assingment.assgnmentName",
            // courseName: props.assingment.courseName,
            // description: "props.assingment.description"
        };

        this.handleClose.bind(this);
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_NODE_API}/lms/course/filterbyinstructor/` + this.state.instructorId , {method: "GET"})
        .then(res => {res.json()
        .then((_data) =>{
            let courseArr = _data.courses;
            const _courseName = [];

            for(const course of courseArr){
                _courseName.push(
                    <option key = { course._id } value={ course.name } > { course.name } </option>
                )
            }
            this.setState({
                courseNames: _courseName
            })
        })
    })
    }

    handleChange(e) {
        this.setState({ deadLine: e });
    }

    handleClose() {
        this.props.onclose();
    }

    handleSave() {
        this.props.onclose();
    }

    onFileUpload(event) {
        this.setState({
            File: event.target.files[0]
        });
    }

    onAssignmentNameChange( e ) {
        this.setState({
            assgnmentName: e.target.value
        });
    }

    onDescriptionChange( e ) {
        this.setState({
            description: e.target.value
        });
    }

    onFormSubmit() {
        if(this.state.description && this.state.File && this.state.assgnmentName){  
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure, Do you want to Add the Assignment!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, Cancel it'
          }).then((result) => {
            if (result.value) {
                
                var formData = new FormData();

                    formData.append("file", this.state.File);
                    formData.append("assgnmentName", this.state.assgnmentName);
                    formData.append("courseName", this.refs.courseName.value);
                    formData.append("deadLine", this.state.deadLine);
                    formData.append("instructorId", this.state.instructorId);
                    formData.append("description", this.state.description);

                    const options = {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors',

                        headers: {
                        'Content-Type': 'form-data',
                        }
                    };
                    
                    fetch(`${process.env.REACT_APP_SPRING_API}/lms/assignments/`, options).then( res => {
                        SweetAlert.fire({
                            title: "Success!!",
                            text: "Assignment Added successfully",
                            type: "success",
                            timer: 10000,
                            showConfirmButton: true
                        });
                    });

                    this.handleClose()

                this.componentDidMount();
                this.componentDidMount(); 
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Assignment is NOT Added',
                'error'
              )

              this.componentDidMount();
              this.componentDidMount(); 
            }
          })
        } else {
            Swal.fire(
                'Cancelled',
                'Can not Proceed without the required Details!',
                'error'
              )
        }
        

    }

    render() {
        return (
            <div>
                <form id = "addForm">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Course Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <select ref="courseName">
                                            {this.state.courseNames}
                                        </select>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Assingment Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="text" className="form-control" ref="AssingmentName" placeholder="Enter Assingment Name" 
                                        value = {this.state.assgnmentName} onChange={ (e) => { this.onAssignmentNameChange(e) }} required/>
                                        <small className="form-text text-muted">The Name that will apier in the students Page</small>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Assingment Description:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <textarea name="description" form="addForm" value = {this.state.description} 
                                        onChange={ (e) => { this.onDescriptionChange(e) }} required></textarea>
                                        {/* <input type="text" className="form-control" ref="AssingmentName" placeholder="Enter Assingment Name" /> */}
                                        <small className="form-text text-muted">Additional Description about the Assignment.</small>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Assingment File:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="file" className="form-control-file" ref="AssingmentName" onChange={(e) => { this.onFileUpload(e) }} required/>
                                        <small className="form-text text-muted">Upload the file with the Details Regarding the Assingment</small>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label>Assingment Dead Line:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <DatePicker
                                            className="datePicker"
                                            selected={this.state.deadLine}
                                            value={this.state.deadLine}
                                            minDate={new Date()}
                                            onChange={this.handleChange.bind(this)}
                                            dateFormat="dd/MM/yyyy" required/><br /> </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <br />
                <div className="formFooter">
                    <Button variant="secondary" className="btn btn-danger" onClick={() => { this.handleClose() }}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={() => { this.onFormSubmit() }}>
                        Save Changes
            </Button></div>
            </div>
        );
    }
}

export default AddAssingmets;
