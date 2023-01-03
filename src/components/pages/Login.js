import axios from "axios";
import React, { Fragment, useState , useEffect } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';


const Login = () => {


    // State 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([]);
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

    // Get Data
    const getUserData = () => {
        axios.get('https://yasamanproject-8481b-default-rtdb.firebaseio.com/')
        .then(response => {
            setData(response.data)
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUserData()
    }, [])
    
    // Send Data
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        if( email.trim().length === 0 || password.trim().length === 0 ){
            alert('ایمیل و پسورد را وارد کنید')
        }
        else if (password.trim().length < 8 ){
            alert('پسورد را به درستی وارد کنید!!( پسورد 8 رقمی میباشد )')
        }
        else {
            const result = data.some((item) => item.email === email && item.password === password)
            
            if (result) {
                alert('خوش آمدید')
            } else {
                alert('لطفا اطلاعات را بررسی کنید')
            }
        }
    }
    
    const handleChangeEmail = (e) => {
        validateEmail(e);
        setEmail(e.target.value);
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10 col-10 form-block">
                        <div className="form-box p-4 row justify-content-center align-items-center">
                            <h4 className="text-center mb-4">
                                Login into account
                            </h4>
                            <form className="col-8">
                                <div className="form-input">
                                    <span><i className="fa fa-envelope-o" /></span>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleChangeEmail}
                                        tabIndex={10}
                                        required />
                                        <span className="emaillError">{emailError}</span>
                                </div>
                                <div className="form-input">
                                    <span><i className="fa fa-key" /></span>
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required />
                                </div>
                                <div className="mb-2 d-flex justify-content-center">
                                    <button type="submit" onClick={handleSubmit} className="btn btn-block px-4 py-2 mt-1">
                                        Login
                                    </button>
                                </div>
                                    <div className="text-right mt-4 mb-2">
                                        <Link to="/Register" className="forget-link">Forgot password?</Link>
                                    </div>
                                <div className="text-right mb-3">
                                    Don't have an account?
                                    <Link to="/Sign_Up" className="register-link">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default Login