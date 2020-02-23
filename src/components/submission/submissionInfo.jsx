import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import moment from "moment";
import Alert from 'react-bootstrap/Alert'
import {
    fn_getAssignmentInfoByID,
    fn_getSpecificSubmissionInfo,
    fn_updateAssignmentMarks
} from "../functions/submission";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Badge from 'react-bootstrap/Badge'

class submissionInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignment: "",
            status: {
                submission: "No attempt",
                grading: "Not Graded"
            },
            dueDate: "",
            lastModified: "Unknown",
            courseID: "",
            remaining: {
                hours: "0",
                minutes: "0",
                seconds: "0"
            },
            isActiveSubmission: false,
            uploadedAlert: false,
            isSubmitted: false,
            file: null,
            btnAdd: "Add",
            uploadID: "",
            assignmentDoc: "",
        };

        this.countDown = this.countDown.bind(this);
        this.timer = 0;
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem('user'));
        let params = this.props.match.params;


        fn_getAssignmentInfoByID(params.assignment).then(data => {

            data = data.data;

            let deadLine = new Date(data.deadLine);

            this.setState({
                assignment: data.assgnmentName,
                courseID: params.courseID,
                dueDate: deadLine,
                uploadedAlert: this.props.location.state !== undefined ? this.props.location.state.upload : false,
                assignmentDoc: data.doc
            });
            this.timer = setInterval(this.countDown, 1000);

            let payload = {
                assignment: data.assgnmentName,
                courseID: params.courseID,
                studentID: user._id
            };

            fn_getSpecificSubmissionInfo(payload)
                .then(data => {

                    clearInterval(this.timer);
                    data = data.data;

                    //set viewed

                    if (data.marks !== 0) {
                        let payload = new FormData();
                        payload.set('marks', data.marks);
                        payload.set('isViewed', 'true');

                        fn_updateAssignmentMarks(data.id, payload).then();
                    }

                    //set submitted time
                    let end = moment(this.state.dueDate, 'DD/MM/YYYY');
                    let startTime = moment(data.createdAt, 'YYYY-MM-DD HH:mm:ss');
                    var duration = moment.duration(end.diff(startTime));

                    let diff = duration.asSeconds();
                    let hours = Math.floor(diff / 3600);
                    diff = diff - hours * 3600;
                    let minutes = Math.floor(diff / 60);
                    let seconds = diff - minutes * 60;

                    let remaining = {
                        hours: ~~hours,
                        minutes: ~~minutes,
                        seconds: ~~seconds
                    };

                    this.setState({
                        isSubmitted: true,
                        file: data.file,
                        lastModified: moment(data.createdAt, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, hh:mm a'),
                        status: {
                            submission: "Attempted",
                            grading: data.marks === 0 ? "Not Graded" : data.marks
                        },
                        isActiveSubmission: true,
                        remaining: remaining,
                        btnAdd: "Edit Submission",
                        uploadID: data.id
                    });

                }).catch()
        }).catch(() => {
            this.props.history.push({
                pathname: "/course/" + params.courseID,
            })
        });

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countDown() {

        let end = moment(this.state.dueDate, 'DD/MM/YYYY');
        let startTime = moment();
        var duration = moment.duration(end.diff(startTime));

        let diff = duration.asSeconds();

        if (diff <= 0) {
            this.setState({ isActiveSubmission: false })
        } else {
            this.setState({ isActiveSubmission: true })
        }

        let hours = Math.floor(diff / 3600);
        diff = diff - hours * 3600;
        let minutes = Math.floor(diff / 60);
        let seconds = diff - minutes * 60;

        let remaining = {
            hours: ~~hours,
            minutes: ~~minutes,
            seconds: ~~seconds
        };

        this.setState({ remaining: remaining });
    }


    render() {

        let addBtn = <Link className="btn btn-primary col-6" to=
            {{
                pathname: "/course/" + this.state.courseID + "/assignment/" + this.state.assignment + "/upload",
                state: {
                    dueDate: this.state.dueDate,
                    reupload: this.state.isSubmitted,
                    uploadID: this.state.uploadID,
                    assignmentID: this.props.match.params.assignment
                }
            }}>{this.state.btnAdd}</Link>;

        let downloadLink = <a href={process.env.REACT_APP_SPRING_API + "/lms/submission/download/" + this.state.file}><Badge pill variant="secondary">Download<FontAwesomeIcon icon={faDownload} /></Badge></a>;

        let fileRow =
            <tr>
                <td>File</td>
                <td>
                    {this.state.file === null ? <Badge pill variant="warning">Not Uploaded</Badge> : downloadLink}
                </td>
            </tr>;


        const handleDismiss = () => this.setState({ uploadedAlert: false });
        const alert = (<Alert variant="info" onClose={handleDismiss} dismissible>Successfully uploaded</Alert>);

        return (
            <div className={"container"}>
                <div className="mt-3"><h4>{this.state.assignment.charAt(0).toUpperCase() + this.state.assignment.substring(1).toLowerCase()}</h4></div>
                <div>
                    <a href={process.env.REACT_APP_SPRING_API + "/lms/submission/download/" + this.state.assignmentDoc}><Badge pill variant="success">Reference<FontAwesomeIcon icon={faDownload} /></Badge></a>
                </div>

                <div className="mt-5 col-10">
                    {this.state.uploadedAlert ? alert : ''}
                    <Table striped size="sm">
                        <tbody>
                            <tr>
                                <td>Submission Status</td>
                                <td>{this.state.status.submission}</td>
                            </tr>
                            <tr>
                                <td>Grading Status</td>
                                <td>{this.state.status.grading}</td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td>{moment(this.state.dueDate, 'DD-MM-YYYY').format('MMMM Do YYYY, HH:mm:ss')}</td>
                            </tr>
                            <tr>
                                <td>Time Remaining</td>
                                <td className={this.state.remaining.hours >= 6 ? "text-success" :
                                    this.state.remaining.hours >= 3 ? "text-warning" : "text-danger"}>
                                    {
                                        this.state.isSubmitted ?
                                            this.state.remaining.hours > 0 ? "Submitted before " : "Overdue by "
                                            : ''
                                    }
                                    {
                                        Math.abs(this.state.remaining.hours) + " Hours " +
                                        this.state.remaining.minutes + " Minutes " +
                                        this.state.remaining.seconds + " Seconds "
                                    }
                                </td>
                            </tr>
                            {fileRow}
                            <tr>
                                <td>Last Modified</td>
                                <td>{this.state.lastModified}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="row">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        {this.state.isActiveSubmission && this.state.status.grading === "Not Graded" ? addBtn : ''}
                    </div>
                </div>

            </div>
        )
    }
}
export default submissionInfo;
