import React,{Component} from 'react';
import axios from 'axios';
import Badge from "react-bootstrap/Badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class viewCourse extends Component{


    constructor(props){
        super(props);
        this.state = {
            name:"",
            course_id:"",
            description:"",
            assignments:[],
            id:""
        }
    }

    componentDidMount() {

        axios.get(`${process.env.REACT_APP_NODE_API}/lms/course/getByCourseName/${this.props.match.params.name}`)
            .then(data=>{
                data = data.data.courses[0];
                document.title = data.name;
                this.setState({
                    name:data.name,
                    course_id:data.course_id,
                    description:data.description,
                    id:data.id
                });

                axios.get(`${process.env.REACT_APP_NODE_API}/lms/Assigment/course/${this.props.match.params.name}`)
                    .then(data=>{
                        this.setState({
                            assignments:data.data
                        })
                    })

            });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="card col-12 mt-2">
                        <div className="card-header">
                            {this.state.name}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.course_id}</h5>
                            <p className="card-text">{this.state.description}</p>
                        </div>
                    </div>
                </div>


                {this.state.assignments.map((value, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="card col-12 mt-2">
                                <div className="card-body">

                                    <Link className="text-decoration-none" to=
                                        {{
                                            pathname:`${this.state.name}/assignment/${value._id}/status`,
                                        }}><h5 className="card-title">{value.assgnmentName}</h5></Link>

                                    <a href={process.env.REACT_APP_SPRING_API+"/lms/submission/download/"+value.doc}><Badge pill variant="success">Download<FontAwesomeIcon icon={faDownload}/></Badge></a>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}
export default viewCourse;
