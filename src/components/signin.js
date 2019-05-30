import React, {Component} from 'react'
import {Link} from "react-router-dom";
import { MDBInput } from "mdbreact";
import '../CSS/auth.css';

class Signin extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div id="log-form">
                <img className="bg" src={process.env.PUBLIC_URL + "/images/bg-001.jpg"} alt="bg"/>
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal"> Sign in</h1>

                    <MDBInput label="Username" icon="user" className="mt-5" />

                    <MDBInput label="Password"  icon="lock" className="mt-5" type="password" />

                    <button className="btn btn-success btn-block mt-5" type="submit"><i
                        className="fas fa-sign-in-alt"></i> Sign in
                    </button>
                    <hr/>
                    <Link to="#" id="forgot_pswd">Forgot password?</Link>
                </form>

            </div>
        );
    }
}

export default Signin;
