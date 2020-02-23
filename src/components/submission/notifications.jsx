import React, { Component } from 'react'
import { fn_getAssignmentsByStudentID } from "../functions/submission";
import { ScaleLoader as Loader } from 'react-spinners';

class notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            isLoading: true
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        fn_getAssignmentsByStudentID(user._id)
            .then(data => {
                this.setState({
                    submissions: data.data,
                    isLoading: false
                })
            })
    }

    render() {
        let loader = (
            <div className="center-screen">
                <Loader
                    size={250}
                    color={'#123abc'}
                    loading={this.state.isLoading}
                />
                <h5>Loading...</h5>
            </div>
        );
        return (
            <div className="container">
                {this.state.isLoading ? loader
                    :

                    this.state.submissions.map((value, index, array) => {

                        if (value.marks === 0)
                            return false;

                        return (
                            <a href={`/course/${value.courseId}`} className="text-decoration-none" key={index}>
                                <div className={value.viewed ? 'card mt-3 bg-default' : 'card mt-3 bg-light'} >
                                    <div className="card-body text-dark">
                                        Your <span className="font-weight-bold">{value.assigmentName}</span> marks has been updated and you got
                                        <span className="font-italic"> {value.marks} </span> mark({value.courseId})
                                    </div>

                                </div>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
export default notifications;
