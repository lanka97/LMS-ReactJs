import React, { Component } from 'react'
import path from 'path';
import '../../CSS/upload_assignment.css';
import { fn_addSubmission, fn_deleteSubmission } from '../functions/submission'
import moment from "moment";
import { css } from '@emotion/core';
import { PropagateLoader } from 'react-spinners';
import swal from 'sweetalert';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: process.env.PUBLIC_URL + "/images/icons/default-file.png",
            title: "Upload Assignment",
            file: File,
            courseID: "",
            assignmentName: "",
            studentID: "",
            dueDate: "",
            loading: false,
            button: "Save",
            reupload: false
        };
        this.getInput = this.getInput.bind(this);
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));

        let params = this.props.match.params;
        if (this.props.history.action !== "PUSH") {
            window.location.href = "/";
        }
        let dueDate = this.props.location.state.dueDate;

        this.setState({
            courseID: params.courseID,
            assignmentName: params.assignment,
            studentID: user._id,
            dueDate: dueDate,
            reupload: this.props.location.state.reupload,
            title: this.props.location.state.reupload ? "Edit Submission" : "Upload Assignment"

        });

        let end = moment(dueDate, 'DD-MM-YYYY');
        let startTime = moment();

        //if submission is overdue redirect to status page
        if (moment.duration(end.diff(startTime)) <= 0) {
            window.location.href = "/course/" + params.courseID + "/assignment/" + params.assignmentID + "/status";
        }

        this.onSubmit = this.onSubmit.bind(this);
    }
    getInput(e) {
        let file = e.target.value;

        let extension = path.extname(file).slice(1);

        if (extension === "docx")
            extension = "doc";

        if (!(extension === "doc" || extension === "xlxs" || extension === "pdf" ||
            extension === "pptx" || extension === "rar" || extension === "zip")) {
            extension = "unknown"
        }

        this.setState({
            background: process.env.PUBLIC_URL + "/images/icons/" + extension + "-file.png",
            file: e.target.files[0]
        })
    }

    onSubmit() {

        let payload = new FormData();
        payload.set('courseID', this.state.courseID);
        payload.set('assignmentName', this.state.assignmentName);
        payload.set('studentID', this.state.studentID);
        payload.append('file', this.state.file);

        this.setState({
            title: "Uploading...",
            loading: true,
            button: "Saving..."
        });

        if (this.state.reupload) {



            fn_deleteSubmission(this.props.location.state.uploadID).then(data => {

                fn_addSubmission(payload).then(data => {
                    this.props.history.push({
                        pathname: "/course/" + this.state.courseID + "/assignment/" + this.props.location.state.assignmentID + "/status",
                        state: { upload: true }
                    })

                }).catch(err => {
                    this.setState({
                        title: "Upload Assignment",
                        loading: false,
                        button: "Save"
                    });
                    console.log(err);
                    swal({
                        title: "Internal error has occurred",
                        text: "Please try again",
                        icon: "error",
                        button: "Okay",
                    });
                });
            }).catch(err => {
                this.setState({
                    title: "Upload Assignment",
                    loading: false,
                    button: "Save"
                });
                console.log(err);
                swal({
                    title: "Internal error has occurred",
                    text: "Please try again",
                    icon: "error",
                    button: "Okay",
                });

            })

        } else {
            fn_addSubmission(payload).then(data => {

                this.props.history.push({
                    pathname: "/course/" + this.state.courseID + "/assignment/" + this.props.location.state.assignmentID + "/status",
                    state: { upload: true }
                })

            }).catch(err => {

                this.setState({
                    title: "Upload Assignment",
                    loading: false,
                    button: "Save"
                });

                console.log(err);
                swal({
                    title: "Internal error has occurred",
                    text: "Please try again",
                    icon: "error",
                    button: "Okay",
                });
            });
        }
    }


    render() {
        let style = ".files::after {background-image: url(" + this.state.background + ");}";
        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <form method="post" action="#" id="#">
                            <div className="form-group files color mt-5 pt-3">
                                <div className="h4">{this.state.title}</div>
                                <input type="file" id="upload" className="form-control mt-5" multiple="" onChange={this.getInput} />
                            </div>
                            <style>{style}
                            </style>

                            <div className="row">
                                <div className="col-6"></div>
                                <div className="col-6">
                                    <PropagateLoader
                                        css={override}
                                        sizeUnit={"px"}
                                        size={15}
                                        color={'#123abc'}
                                        loading={this.state.loading} /></div>
                            </div>

                            <div className="z-depth-1 mt-2">
                                <button type="button" className="btn btn-success float-right m-2" onClick={this.onSubmit}>{this.state.button}</button>
                                <button type="button" className="btn btn-danger float-right m-2"
                                    onClick={this.props.history.goBack}
                                >Cancel</button>
                            </div>

                        </form>


                    </div>
                </div>
            </div>


        );
    }
}
export default upload;
