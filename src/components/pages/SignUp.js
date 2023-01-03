import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';

const SignUp = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [emailError, setEmailError] = useState('')

    //Email confirmation
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            fullName: fullName,
            email: email,
            password: password
        }
        axios.post('http://localhost:5000/data', data).then(result => {
            setFullName('');
            setEmail('');
            setPassword('');
            setLoading(false);
            alert('ثبت با موفقیت انجام شد')
        }).catch(error => {
            setLoading(false);
            setIsError(true);
        });
    }
    const handleChangeName = (e) => {
        setFullName(e.target.value);
    }
    const handleChangeEmail = (e) => {
        validateEmail(e);
        setEmail(e.target.value);
    }
    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10 col-10 form-block">
                        <div className="form-box p-4 row justify-content-center align-items-center">
                            <h4 className="text-center mb-4">
                                Create an account
                            </h4>
                            <form className="col-8">
                                <div className="form-input">
                                    <span><i className="fa fa-user-o" /></span>
                                    <input type="text" placeholder="Full Name" value={fullName} onChange={handleChangeName} required />
                                </div>
                                <div className="form-input">
                                    <span><i className="fa fa-envelope-o" /></span>
                                    <input type="email" placeholder="Email Address" value={email} onChange={handleChangeEmail} required />
                                    <span className="emaillError">{emailError}</span>
                                </div>
                                <div className="form-input">
                                    <span><i className="fa fa-key" /></span>
                                    <input type="password" placeholder="Password" value={password} onChange={handleChangePass} required />
                                </div>
                                <div className="mb-2 d-flex justify-content-center">
                                    <button type="submit" onClick={handleSubmit} disabled={loading} className="btn btn-block px-4 py-2 mt-1">
                                        Register
                                    </button>
                                </div>
                                <div className="text-right mb-5">
                                    Already have an account
                                    <Link to="/" className="login-link" > Login here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default SignUp;