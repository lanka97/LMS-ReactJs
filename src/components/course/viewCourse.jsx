import React,{Component} from "react"
import Card from 'react-bootstrap/Card'
import {
    faFileArchive,
    faFileCsv,
    faFileExcel,
    faFilePdf,
    faFilePowerpoint,
    faFileWord
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class viewCourse extends Component{
    render() {
        return(
            <div className="container">
                <div className="row mt-2 border-bottom">
                    <Card className="col-12 border-0">
                        <Card.Header className="course-card">Introduction</Card.Header>
                        <Card.Body clasName="">
                            <Card.Text>
                                <FontAwesomeIcon icon={faFilePdf}/><br/>
                                <FontAwesomeIcon icon={faFileExcel}/><br/>
                                <FontAwesomeIcon icon={faFileWord}/><br/>
                                <FontAwesomeIcon icon={faFilePowerpoint}/><br/>
                                <FontAwesomeIcon icon={faFileCsv}/><br/>
                                <FontAwesomeIcon icon={faFileArchive}/><br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
export default viewCourse;
