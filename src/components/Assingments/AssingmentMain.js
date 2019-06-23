import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/assingment.css'
import { Button, Modal } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import AddAssingment from '../Assingments/AddAssingment';
import UpdateAssingment from '../Assingments/UpdateAssingment';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle } from 'mdbreact';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Badge from 'react-bootstrap/Badge';


export class AssingmetsMain extends React.Component {

    constructor(props, context) {
        super(props, context);

        const user = JSON.parse(localStorage.getItem('user'));

        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleHideAdd = this.handleCloseAdd.bind(this);

        this.handleShowUpdate = this.handleShowUpdate.bind(this);
        this.handleCloseUpdate = this.handleCloseUpdate.bind(this);
        this.handleHideUpdate = this.handleCloseUpdate.bind(this);
        this.setAssignment = this.setAssignment.bind(this);

        this.state = {
            show: false,
            instructorId: user._id
        };

        // this.deleteAssingment.bind(this);
    }

    // IT1092

    handleCloseAdd() {
        this.setState({ showAdd: false });
        this.componentDidMount();
        setTimeout(this.componentDidMount(), 3000);
    }

    handleShowAdd() {
        this.setState({ showAdd: true });
    }

    handleHideAdd() {
        this.setState({ showAdd: false });
    }

    handleCloseUpdate() {
        this.setState({ showUpdate: false });
        this.componentDidMount();
        this.componentDidMount();
        setTimeout(this.componentDidMount(), 3000);
    }

    handleShowUpdate(assingment) {
        this.setAssignment(assingment);
        this.setState({
            showUpdate: true
        });

    }

    setAssignment(assingment) {
        const seting = "ff";
        this.setState({
            selectedAssignment: assingment
        })

        return seting;
    }

    handleHideUpdate() {
        this.setState({ showUpdate: false });
    }

    deleteAssingment(assignmentId) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure, Do you want to delete the Assignment!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                fetch(`${process.env.REACT_APP_NODE_API}/lms/Assigment/` + assignmentId, { method: "DELETE" })
                    .then(res => {
                        SweetAlert.fire({
                            title: "Success!!",
                            text: "Assignment Deleted successfully",
                            type: "success",
                            timer: 10000,
                            showConfirmButton: true
                        });
                    })
                    .then(msg => {
                        console.log(msg);
                    });

                this.componentDidMount();
                this.componentDidMount();
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Assignment is NOT Deleted',
                    'error'
                )

                this.componentDidMount();
                this.componentDidMount();
            }
        })


    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_NODE_API}/lms/Assigment/instructor/` + this.state.instructorId, { method: "GET" })
            .then(res => res.json())
            .then(_data => {
                const _assingments = [];

                for (const assingment of _data) {
                    _assingments.push(
                        <div id="card-list" key={assingment._id}>
                            <MDBCard id="divcard" key={assingment.id}>
                                <MDBCardHeader><h3>{assingment.assgnmentName}</h3></MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardTitle> {assingment.courseName} </MDBCardTitle>
                                    <MDBCardText>
                                        {assingment.description}<br />
                                        {assingment.deadLine}<br />
                                        <a href={`${process.env.REACT_APP_SPRING_API}/lms/assignments/download/${assingment.doc}`} >
                                            <Badge className="mt-3" pill variant="success" >Download <FontAwesomeIcon icon={faDownload} /></Badge>
                                        </a>
                                    </MDBCardText>
                                    {/* <Button className = "btn btn-primary">View assingment</Button> */}
                                    <a className="btn btn-primary m-2 bg-primary" href={`/course/${assingment.courseName}/assignment/${assingment.assgnmentName}/view/all`}>Add Grading</a>
                                    <Button className="btn btn-success m-2" onClick={() => { this.handleShowUpdate(assingment) }}>Edit assingment</Button>
                                    <Button className="btn btn-danger m-2" onClick={() => { this.deleteAssingment(assingment._id) }}>Delete assingment</Button>
                                </MDBCardBody>
                            </MDBCard>
                            <br />
                        </div>
                    )
                }
                this.setState({
                    assingmets: _assingments
                })
            })
    }

    render() {
        return (
            <div className="main">
                <div className="header">
                    Assignment
                    <Button className="btn btn-primary" onClick={this.handleShowAdd}>+ Add Assignments</Button>
                    <hr />
                </div>

                {this.state.assingmets}

                <Modal
                    show={this.state.showAdd}
                    onHide={this.handleHideAdd}
                    dialogClassName="modal-90w"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Add Assingment/Exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><AddAssingment onclose={this.handleCloseAdd} instructorId={this.state.instructorId}></AddAssingment></Modal.Body>
                </Modal>

                <Modal
                    show={this.state.showUpdate}
                    onHide={this.handleHideUpdate}
                    dialogClassName="modal-90w"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Update Assingment/Exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><UpdateAssingment onclose={this.handleCloseUpdate}
                        assingment={this.state.selectedAssignment}
                    ></UpdateAssingment></Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default AssingmetsMain;
