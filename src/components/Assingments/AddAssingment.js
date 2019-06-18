import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CSS/assingment.css';
import { Button } from 'react-bootstrap';
// import { Form } from 'react-bootstrap';


export class AddAssingmets extends React.Component{

    constructor(props, context) {
        super(props, context);

        this.state = {
            startDate: new Date(),
        };
    }

    handleChange (e) { 
        this.setState({startDate: e});
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
                            <select ref = "courseName">
                                <option value="Sex Educetion" >Educeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeetion</option>
                                <option value="Sex Educetion" >Educeetion</option>
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
                        <input type="email" className="form-control" ref = "AssingmentName" placeholder="Enter Assingment Name"/>
                        <small className="form-text text-muted">The Name that will apier in the students Page</small>
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
                        <input type="file" className="form-control" ref = "AssingmentName" />
                        <small className="form-text text-muted">Upload the file with the Details Reduding the Assingment</small>
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
                                selected={this.state.startDate}
                                value = {this.state.startDate}
                                minDate = {new Date()}
                                onChange={this.handleChange.bind(this)}
                                dateFormat="dd/mm/yyyy" ref = "deadLine"/><br/> </div>
                    </td>
                </tr>
             </tbody>
            </table>
            </form>

        <br/>
        <div className= "formFooter">
            <Button variant="secondary" className = "btn btn-danger"  onClick={this.handleClose}>
                    Close
            </Button>
            
            <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
            </Button></div>
        </div>
    );
    }
}

export default AddAssingmets;
