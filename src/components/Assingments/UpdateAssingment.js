import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/assingment.css';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import SweetAlert from 'sweetalert2';

export class UpdateAssingmets extends React.Component{

  constructor(props, context) {
    super(props, context);

    this.state = {
        _id: props.assingment._id,
        startDate: props.assingment.deadLine,
        instructorId: props.assingment.instructorId,
        currentDeadLine: new Date(props.assingment.deadLine),
        newDeadLine: new Date(props.assingment.deadLine),
        assgnmentName: props.assingment.assgnmentName,
        courseName: props.assingment.courseName,
        description: props.assingment.description
    };

    // this.refs.courseName.value = props.assingment.courseName
    this.handleClose.bind(this);
  }

  handleChange (e) { 
    this.setState({ newDeadLine: e});
  }

  componentDidMount(){
 
  }

  handleClose() {
    this.props.onclose();
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
          
    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure, Do you want to Update the Assignment!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update it!',
        cancelButtonText: 'No, Cancel it'
      }).then((result) => {
        if (result.value) {
            
            const data = {
                assgnmentName: this.state.assgnmentName,
                courseName: this.state.courseName,
                deadLine: this.state.newDeadLine,
                description: this.state.description
            }

            
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                    }
                };
                fetch(`${process.env.REACT_APP_NODE_API}/lms/Assigment/update/` + this.state._id, options)
            
                .then(_data =>{
                    console.log(_data);
                        SweetAlert.fire({
                            title: "Success!!",
                            text: "Assignment Updated successfully",
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
            'Assignment is NOT Updated',
            'error'
          )

          this.componentDidMount();
          this.componentDidMount(); 
        }
      })
}

  render(){
  return (
      <div>
      <form>
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
                     {this.state.courseName}
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
                  <input type="text" className="form-control" value = {this.state.assgnmentName} onChange={ (e) => { this.onAssignmentNameChange(e) }}  placeholder="Enter Assingment Name"/>
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
                                  onChange={ (e) => { this.onDescriptionChange(e) }} ></textarea>
                        {/* <input type="text" className="form-control" ref="AssingmentName" placeholder="Enter Assingment Name" /> */}
                    <small className="form-text text-muted">Additional Description about the Assignment.</small>
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
                          className = "datePicker"
                          selected={ this.state.newDeadLine }
                          value = {this.state.newDeadLine}
                          minDate = {this.state.currentDeadLine}
                          onChange={this.handleChange.bind(this)}
                          ref = "deadLine"/><br/> </div>
              </td>
          </tr>
      </tbody>
      </table>
      </form>
      <br/>
      <div className= "formFooter">
          <Button variant="secondary" className = "btn btn-danger"  onClick={() => { this.handleClose() }}>
                  Close
          </Button>
          
          <Button variant="primary" onClick={() => { this.onFormSubmit() }}>
                  Save Changes
          </Button></div>
      </div>
  );
  }
}

export default UpdateAssingmets;
