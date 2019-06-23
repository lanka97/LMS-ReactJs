import React, { Component } from 'react'
import {
    fn_getAllSubmissionByCourseAndAssignment,
    fn_getSpecificSubmissionInfo,
    fn_updateAssignmentMarks
} from "../functions/submission";

import { MDBDataTable } from 'mdbreact';
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Button from 'react-bootstrap/Button'
import { ScaleLoader as Spinner } from 'react-spinners';

var regexp = /^\d+(\.\d{1,2})?$/;

class viewAllSubmissions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            assignmentName: "",
            update: {
                row: "",
                studentID: "",
                file: "",
                assignment: "",
                uploadedDate: "",
                id: ""
            },
            sidePanel: null,
            sideButton: "Save Changes",
            pageLoading: true,
            mark: "",
            isError: true,
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateMarks = this.updateMarks.bind(this);
    }

    componentDidMount() {
        this.loadTable();
        let viewType = this.props.match.params.viewType;

        if (viewType !== "all" && viewType !== "marked" && viewType !== "unmarked") {
            let courseID = this.props.match.params.courseID;
            let assignment = this.props.match.params.assignment;
            this.props.history.push(`/course/${courseID}/assignment/${assignment}/view/all`)
        }

    }

    loadTable() {
        let courseID = this.props.match.params.courseID;
        let assignment = this.props.match.params.assignment;
        fn_getAllSubmissionByCourseAndAssignment(courseID, assignment).then(data => {
            data = data.data;
            this.setState({
                submissions: data,
                pageLoading: false,
                assignmentName: assignment
            })
        })
    }

    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value,
            isError: !regexp.test(e.target.value)
        });

    }

    updateMarks() {

        let payload = new FormData();
        payload.set('marks', this.state.mark);
        payload.set('isViewed', 'false');

        let id = this.state.update.id;

        this.setState({
            sideButton: "Updating..."
        });

        fn_updateAssignmentMarks(id, payload)
            .then((data) => {
                let submissions = this.state.submissions;

                submissions[this.state.update.row] = data.data;

                this.setState({
                    sideButton: "Save Changes",
                    submissions: submissions,
                    mark: ""
                });

            }).catch(() => {
                this.setState({
                    sideButton: "Save Changes"
                });
            })


    }

    handleRowClick(row, value, event) {

        this.setState({
            sidePanel: "loading"
        });

        let payload = {
            assignment: value.assigmentName,
            courseID: value.courseId,
            studentID: value.studentId
        };

        fn_getSpecificSubmissionInfo(payload).then(data => {

            data = data.data;

            this.setState({
                sidePanel: "showing",
                update: {
                    row: row,
                    studentID: data.studentId,
                    file: data.file,
                    assignment: data.assigmentName,
                    uploadedDate: data.createdAt,
                    id: data.id
                }
            })
        })


    }

    render() {
        //side panel
        let update = (
            <div>
                <div className="row">
                    <div className="col-6">
                        <p>Student ID</p>
                    </div>
                    <div className="col-6">
                        <p>{this.state.update.studentID}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p>Assignment</p>
                    </div>
                    <div className="col-6">
                        {this.state.update.assignment.charAt(0).toUpperCase() + this.state.update.assignment.substring(1).toLowerCase()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p>Uploaded Date</p>
                    </div>
                    <div className="col-6">
                        {this.state.update.uploadedDate}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p>File</p>
                    </div>
                    <div className="col-6">
                        <a href={process.env.REACT_APP_SPRING_API + "/lms/submission/download/" + this.state.update.file}><Badge pill variant="primary">Download<FontAwesomeIcon icon={faDownload} /></Badge></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <p>Marks</p>
                    </div>
                    <div className="col-6">
                        <input className={this.state.isError ? 'border-danger' : ''} type="text" name="mark" onChange={this.onChange} value={this.state.mark} />
                        <br />
                        {this.state.isError ? <span className="text-danger">Please Enter a numeric value</span> : ''}
                    </div>
                </div>

                <div className="">
                    <Button variant="success" disabled={this.state.isError || this.state.sideButton !== "Save Changes"} onClick={this.updateMarks}>{this.state.sideButton}</Button>
                </div>
            </div>
        );

        let notSelected = (
            <div className="row mt-5">
                <div className="col-4"></div>
                <div className="col-4">
                    <span className="ml-2">
                        <FontAwesomeIcon icon={faQuestionCircle} size="6x" />
                    </span>
                    <h6 className="mt-2">
                        Please Select Row
                    </h6>
                </div>

            </div>

        );

        let loading = (
            <div className="row mt-5">
                <div className="col-4" />
                <div className="col-4 mt-5">
                    <Spinner
                        size={90}
                        color={'#123abc'}
                        loading={this.state.sidePanel === "loading"} />

                    <h5 className="ml-2 mt-2">
                        Loading...
                            </h5>
                </div>

            </div>
        );

        //table data
        const data = {
            columns: [
                {
                    label: 'Student ID',
                    field: 'studentId',
                    sort: 'asc',
                },
                {
                    label: 'Grade',
                    field: 'mark',
                    sort: 'asc',
                },
                {
                    label: 'Uploaded Date',
                    field: 'uploadedDate',
                    sort: 'asc',
                },
                {
                    label: 'Download',
                    field: 'download',
                    sort: 'asc',
                },

            ],
            rows: this.state.submissions.map((value, index) => {

                let viewType = this.props.match.params.viewType;

                if (viewType === "unmarked" && value.marks !== 0)
                    return false;

                if (viewType === "marked" && value.marks === 0)
                    return false;

                return {
                    "studentID": value.studentId,
                    "marks": value.marks === 0 ? 'Not Graded' : value.marks,
                    "uploadedDate": moment(value.createdAt, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY, hh:mm a'),
                    "download": <a href={process.env.REACT_APP_SPRING_API + "/lms/submission/download/" + value.file}><Badge pill variant="secondary">Download<FontAwesomeIcon icon={faDownload} /></Badge></a>,
                    clickEvent: this.handleRowClick.bind(this, index, value)
                }
            })
        };

        const content = (
            <div className="row">
                <div className="col-6">
                    <MDBDataTable
                        autoWidth={true}
                        fixed={true}
                        striped
                        hover
                        data={data}
                        responsive
                        className={"cursor-pointer"}
                        searchLabel={"Student ID"}
                    />
                </div>
                <div className="col-6">

                    <h2>
                        Update Marks
                    </h2>

                    {this.state.sidePanel === null ? notSelected : this.state.sidePanel === "loading" ? loading : update}


                </div>
            </div>
        );

        const pageLoader = (
            <div className="center-screen">
                <Spinner
                    size={120}
                    color={'#123abc'}
                    loading={this.state.pageLoading} />

                <h3 className="ml-2 mt-3">
                    Loading...
                </h3>
            </div>
        );

        return (
            <div className="container">
                <div className="h2 mt-2">{this.state.assignmentName.charAt(0).toUpperCase() + this.state.assignmentName.substring(1).toLowerCase()}</div>

                {this.state.pageLoading ? pageLoader : content}
            </div>
        );
    }
}
export default viewAllSubmissions;
