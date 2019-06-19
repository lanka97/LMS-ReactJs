import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/assingment.css'
import { Button, Modal } from 'react-bootstrap';
import AddAssingment from '../Assingments/AddAssingment';
import UpdateAssingment from '../Assingments/UpdateAssingment';
import 'react-datepicker/dist/react-datepicker.css';


export class AssingmetsMain extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleHide = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide(){
        this.setState({ show: false });
    }

    render() {
        return (
            <div className="main">
                <div className="header">
                    Assignment
                    <Button className="btn btn-primary" onClick={this.handleShow}>+ Add Assignments</Button>
              <hr />
                </div>

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

                <UpdateAssingment onclose = {this.handleClose}></UpdateAssingment>
            </div>
        );
    }
}

export default AssingmetsMain;
