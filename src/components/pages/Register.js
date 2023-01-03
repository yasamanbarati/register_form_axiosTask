import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';

const Register = () => {

    // state
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [password1, setpassword1] = useState('');

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
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

    // Get Data (email)
    const getUserData = () => {
        axios.get('http://localhost:5000/data')
            .then(response => {
                setData(response.data)
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getUserData()
    }, [])

    //sent and update Data
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const user = {
            email: email,
            password: password,
            password1: password
        }
        if (email.trim().length === 0 || password.trim().length === 0 || password1.trim().length === 0) {
            alert('ایمیل و پسورد را وارد کنید')
        }
        else if (password.trim().length < 8 || password1.trim().length < 8) {
            alert('پسورد را به درستی وارد کنید!!( پسورد 8 رقمی میباشد )')
        }
        else {
            const result = data.some((item) => item.email === email)

            if (result) {
                axios.put('http://localhost:5000/data', user).then(res => {
                    setData(res.data);
                    setpassword(res.password);
                    setpassword1(res.password1);
                    if (res.password === res.password1 && res.password.length >= 8) {
                        setLoading(false);
                        alert("رمز عبور شما با موفقیت تغییر یافت");
                    }
                    else {
                        clearPutOutput();
                    }
                }).catch(err => {
                    console.error(err);
                })
                .finally(()=>{
                    setLoading(false);
                })
            }

        }
    }

    const handleChangeEmail = (e) => {
        validateEmail(e);
        setEmail(e.target.value);
    }

    const clearPutOutput = () => { setEmail(null); };

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10 col-10 form-block">
                        <div className="form-box">
                            <div className="reset-form p-4 row justify-content-center align-items-center">
                                <form className="reset-password-form">
                                    <h4 className="mb-3 text-center">Reset Your password</h4>
                                    <div className="form-input">
                                        <label className="ps-1 mb-2">Email :</label>
                                        <input type="email" placeholder="Email Address" value={email}
                                            onChange={handleChangeEmail} required />
                                        <span className="emaillError">{emailError}</span>
                                    </div>
                                    <div className="form-input">
                                        <label className="ps-1 mb-2">new password :</label>
                                        <input type="password" placeholder="Enter your new password" value={password} onChange={(e) => { setpassword(e.target.value) }} required />
                                    </div>
                                    <div className="form-input">
                                        <input type="password" onChange={(e) => { setpassword1(e.target.value) }} placeholder="Re-enter your new password" value={password1} required />
                                    </div>
                                    <div className="mb-3 d-flex justify-content-center align-items-center">
                                        <button type="submit" className="btn" onClick={handleSubmit}
                                            disabled={loading}
                                        >{loading ? 'Loading...' : 'Update'}</button>
                                    </div>
                                    <div className="text-center mb-5">
                                        Already have password
                                        <Link to="/" className="login-link" > Login here</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Register;