import React from "react";
import { CardBody } from 'reactstrap';
import { MDBContainer, MDBAlert } from 'mdbreact';
import { Link, useHistory } from "react-router-dom"
import Front_logo from '../../assets/FrontImage/white-logo.png'
import { useState } from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";


const Signup = () => {
    let history = useHistory();
    const [signUp, SetsignUp] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        ConfirmPassword: ""
    })

    const [message, setmessage] = useState()

    const [ErrFullname, SetErrFullname] = useState();
    const [ErrUsername, SetErrUsername] = useState();
    const [ErrEmail, SetErrEmail] = useState();
    const [ErrPhone, SetErrPhone] = useState();
    const [ErrPassword, SetErrPassword] = useState();
    const [ErrConfirmPassword, SetErrConfirmPassword] = useState();
    const [ErrAddress, SetErrAddress] = useState();
    

    const [loading, setloading] = useState(false);

    const [type, setType] = useState({
        type: 'password'
    })

    const [Confirmtype, setConfirmType] = useState({
        type: 'password'
    })

    const showClick = () => setType(({type}) => ({
        type: type === 'password' ? 'text' : 'password'
      }))

      const hideClick = () => setType(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
      }))

      const ConfirmshowClick = () => setConfirmType(({type}) => ({
        type: type === 'password' ? 'text' : 'password'
      }))

      const ConfirmhideClick = () => setConfirmType(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
      }))

    //   const handleKeyDown = e => {
    //     if (e.key === " ") {
    //       e.preventDefault();
    //     }
    //   };

    const SignupchangeHandle = (event) => {
        if (event.currentTarget.value.includes(" ")) {
            event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
          }

        SetsignUp({ ...signUp, [event.target.name]: event.target.value })
        setmessage("")
        // alert(event.target.value);
    }


    const SubmitHandle = async (event) => {
        event.preventDefault();
        var errorcount = 0;

        if (signUp.fullname == "" || signUp.fullname.trim() == "") {
            SetErrFullname("*Fullname is required.");
            errorcount++;
        }
       else if (!/^[a-zA-Z ]*$/g.test(signUp.fullname)) {
        SetErrFullname("Fullname contain only letters");
        errorcount++;
        }
         else {
            SetErrFullname("");
        }

        if (signUp.address == "" || signUp.address.trim() == "") {
            SetErrAddress("*Address is required.");
            errorcount++;
        }
         else {
            SetErrAddress("");
        }

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (signUp.email == "" || signUp.email.trim() == "") {
            SetErrEmail("*Email is required.");
            errorcount++;
        } else if (!pattern.test(signUp.email)) {

            SetErrEmail("*Email is invalid.");
            errorcount++;
        } else {
            SetErrEmail("");
        }

        if (signUp.username == "" || signUp.username.trim() == "") {
            SetErrUsername("*username is required.");
            errorcount++;
        } else {
            SetErrUsername("");
        }

        if (signUp.phone == "" || signUp.phone.trim() == "") {
            SetErrPhone("*Phone number is required.");
            errorcount++;
        } else if (signUp.phone.length < 10) {
            SetErrPhone("*Phone number should be greater than 10.");
            errorcount++;
        }
        else if (signUp.phone.length > 10) {
            SetErrPhone("*Phone number should be smaller than 10.");
            errorcount++;
        } else {
            SetErrPhone("");
        }

        if (signUp.password == "" || signUp.password.trim() == "") {
            SetErrPassword("*Password is required.");
            errorcount++;
        } else if (signUp.password.length < 6) {
            SetErrPassword("*Password should be greater than 6.");
            errorcount++;
        } else {
            SetErrPassword("");
        }
        // alert(signUp.ConfirmPassword)
        if (signUp.ConfirmPassword == "" || signUp.ConfirmPassword.trim() == "") {
            // alert('ok')
            SetErrConfirmPassword("*Password is required.");
            errorcount++;
        } else if (signUp.password !== signUp.ConfirmPassword) {
            SetErrConfirmPassword("*Password did not match.");
            errorcount++;
        } else {
            SetErrConfirmPassword("")
        }

        if (errorcount == 0) {

            axios.post("register", signUp).then((result) => {

                if (result.data.status == true) {
                    localStorage.clear();
                    localStorage.setItem("user-token", result.data.data.token)
                    history.push('/Dynamate')
                } else {
                    setmessage("")
                    setmessage(result.data.message)
                }

            });
            setloading(true);
        }

    }

    return (
        <>
        <div className="Front_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-md-4">
                        <div className="front_form signup_Form">
                            <CardBody>
                                <div className="form_logo">
                                    <img src={axios.defaults.baseStaticImageURL+Front_logo} alt="" />
                                </div>
                                {
                                        message ?
                                            <MDBAlert className="alert alert-danger" color="warning">
                                                <strong>{message}</strong>
                                            </MDBAlert >
                                            :
                                            null
                                    }
                                <form action="" onSubmit={(event) => SubmitHandle(event)}>
                                    <div className="form-group">
                                        <label htmlFor="">Fullname</label>
                                        <input type="text" className="form-control"
                                            onChange={(event) => SignupchangeHandle(event)} name="fullname"
                                        /> <p className="errorMessage">{ErrFullname}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Username</label>
                                        <input type="text" className="form-control" pattern="[^\s]+"
                                           onChange={(event) => SignupchangeHandle(event)} name="username"
                                        />
                                        <p className="errorMessage">{ErrUsername}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Email</label>
                                        <input type="email" className="form-control" pattern="[^\s]+"
                                           onChange={(event) => SignupchangeHandle(event)} name="email"
                                        /> <p className="errorMessage">{ErrEmail}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Phone Number</label>
                                        <input type="number" className="form-control" pattern="[^\s]+"
                                            onChange={(event) => SignupchangeHandle(event)} name="phone"
                                        /> <p className="errorMessage">{ErrPhone}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Address</label>
                                        <textarea  className="form-control" 
                                            onChange={(event) => SignupchangeHandle(event)} name="address"
                                        ></textarea> <p className="errorMessage">{ErrAddress}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Password</label>
                                        <input type={type.type} className="form-control" pattern="[^\s]+"
                                           onChange={(event) => SignupchangeHandle(event)} name="password"
                                        />
                                         <span className="pwdicon">
                                         {
                                            type.type === 'password' ? 
                                            <i class="fa fa-eye-slash" aria-hidden="true" onClick={()=>showClick()}></i> : 
                                            <i class="fa fa-eye" aria-hidden="true" onClick={()=>hideClick()}></i> 
                                        }
                                        </span>
                                        <p className="errorMessage">{ErrPassword}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Confirm Password</label>
                                        <input type={Confirmtype.type} className="form-control" pattern="[^\s]+"
                                           onChange={(event) => SignupchangeHandle(event)} name="ConfirmPassword"
                                        />
                                        <span className="pwdicon">
                                        {
                                            Confirmtype .type === 'password' ? 
                                            <i class="fa fa-eye-slash" aria-hidden="true" onClick={()=>ConfirmshowClick()}></i> : 
                                            <i class="fa fa-eye" aria-hidden="true" onClick={()=>ConfirmhideClick()}></i> 
                                        }
                                        </span>
                                        <p className="errorMessage">{ErrConfirmPassword}</p>
                                    </div>

                                    <div className="form-group mt-5">
                                        <button type="submit" className="btn default_btn">Signup</button>
                                    </div>

                                    <div className="form-group text-center">
                                        <p>Already have an Account ? <Link to="/login"> Login</Link> </p>
                                    </div>
                                </form>
                            </CardBody>
                        </div>
                    </div>
                </div>
            </div>
        </div>


{
                ! message ?
                <div>
           {
           loading ?
           <div className="chatspinner fullviewspinner signupspinner">
               <Spinner animation="border" variant="light" />
            </div>
            :
           null
            }
            </div> 
            :
            null
            }

     </>

    );
}

export default Signup;