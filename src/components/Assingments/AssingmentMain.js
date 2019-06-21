import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/assingment.css'
import { Button, Modal } from 'react-bootstrap';
import AddAssingment from '../Assingments/AddAssingment';
import UpdateAssingment from '../Assingments/UpdateAssingment';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle } from 'mdbreact';
import 'react-datepicker/dist/react-datepicker.css';


export class AssingmetsMain extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleHide = this.handleClose.bind(this);

        this.state = {
            show: false,
            instructorId: "1"
        };

        // this.deleteAssingment.bind(this);
    }

    // IT1092

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide(){
        this.setState({ show: false });
    }

    deleteAssingment(assignmentId){
        console.log(assignmentId,"sds");
        fetch('http://localhost:4200/lms/Assigment/' + assignmentId , {method: "DELETE"})
        .then(res => res.json())
        .then( msg => console.log(msg) ); 

        this.componentDidMount();
        this.componentDidMount();  
    }

    componentDidMount() {
        fetch('http://localhost:4200/lms/Assigment/instructor/' + this.state.instructorId , {method: "GET"})
        .then(res => res.json())
        .then(_data =>{
            console.log(_data);
            const _assingments = [];

            for(const assingment of _data){
                _assingments.push(
                    <div id="card-list">
                        <MDBCard id="divcard" key={assingment.id}>
                            <MDBCardHeader><h3>{assingment.assgnmentName}</h3></MDBCardHeader>
                            <MDBCardBody>
                                <MDBCardTitle> {assingment.courseName} </MDBCardTitle>
                                <MDBCardText>
                                {assingment.description}<br/>
                                </MDBCardText>
                                <Button className = "btn btn-primary">View assingment</Button>
                                <Button className = "btn btn-success">Edit assingment</Button>
                                <Button className = "btn btn-danger" onClick = { () => {this.deleteAssingment( assingment._id) } }>Delete assingment</Button>
                            </MDBCardBody>
                        </MDBCard>
                        <br/>
                    </div>
                )
            }
            this.setState({
                assingmets : _assingments
            })
        })
    }

    render() {
        return (
            <div className="main">
                <div className="header">
                    Assignment
                    <Button className="btn btn-primary" onClick={this.handleShow}>+ Add Assignments</Button>
              <hr />
                </div>

                {this.state.assingmets}

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >

                <Modal.Header closeButton>
                    <Modal.Title>Add Assingment</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddAssingment onclose = {this.handleClose}></AddAssingment></Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" className="btn btn-danger" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}

export default AssingmetsMain;
