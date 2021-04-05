import React, { useState } from "react";
import { CardBody } from 'reactstrap';
import { Link, useHistory } from "react-router-dom"
import { MDBAlert } from 'mdbreact';
import axios from "axios";
import Front_logo from '../../assets/FrontImage/white-logo.png'
import { useEffect } from "react";
import {Spinner} from "react-bootstrap";



const Mylogin = () => {
    let history = useHistory();
    const [myLogin, setLogin] = useState({
        username: "",
        password: "",
    })
    const [message, setmessage] = useState()

    const [Errusername, SetErrusername] = useState()
    const [Errorpassword, SetErrpassword] = useState()
    
    const [type, setType] = useState({
        type: 'password'
    })

    const showClick = () => setType(({type}) => ({
        type: type === 'password' ? 'text' : 'password'
      }))

      const hideClick = () => setType(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
      }))

      const [loading, setloading] = useState(false);
    //// below are api login develop ////
  
    useEffect(() => {
        if (localStorage.getItem("user-token")) {
            history.push('/')
        }else{
            history.push('/login')  
        }
    },[])

    const handleKeyDown = e => {
        if (e.key === " ") {
          e.preventDefault();
        }
      }; 
         
    const inputHandler = (event) => {
        if (event.currentTarget.value.includes(" ")) {
            event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
          }
        setLogin({ ...myLogin, [event.target.name]: event.target.value })
    }

    const Loginhandle = async (event) => {
        event.preventDefault();
        
        var errorcount = 0;
        if (myLogin.username == "" || myLogin.username.trim() == "") {
            SetErrusername("*username is required.");
            errorcount++;
        }  else {
            SetErrusername("");
        }

        if (myLogin.password == "" || myLogin.password.trim() == "") {
            SetErrpassword("*Password is required.");
            errorcount++;
        } else if (myLogin.password.length < 6) {
            SetErrpassword("*Password should be greater than 6.");
            errorcount++;
        } else {
            SetErrpassword("");
        }

        if(errorcount==0){
       axios.post('login',myLogin).then((result)=>{
        if (result.data.status==true) {
                localStorage.setItem("user-token", result.data.data.token)
                var managerType = result.data.data.type;
                localStorage.setItem("manager-type", managerType)
                if (managerType == 2) {
                    history.push('/jobsite_detail_manager')
                }
                else {
                    history.push('/Dynamate')
                }
                
            } 
            else {
                setmessage("")
                setmessage(result.data.message)
            }

        });
        setloading(true); 
    }

    }

    ///////

    return (
        <>
        
            <div className="Front_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-md-4">
                            <div className="front_form">
                                <CardBody>
                                    <div className="form_logo">
                                        <img src={axios.defaults.baseStaticImageURL+Front_logo} alt="" />
                                    </div>

                                    {
                                            message ?
                                                <MDBAlert className="alert alert-danger" color="warning"    >
                                                    <strong>{message}</strong>
                                                </MDBAlert >
                                                :
                                                null
                                        }

                                    <form action="" onSubmit={(event) => Loginhandle(event)}>

                                    

                                        <div className="form-group">
                                            <label htmlFor="">Username</label>
                                            <input type="text" className="form-control"
                                             onKeyDown={handleKeyDown}   onChange={(event) => inputHandler(event)} name="username"

                                            />
                                            <p className="errorMessage">{Errusername}</p>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="">Password</label>
                                            <input type={type.type} className="form-control"
                                             onKeyDown={handleKeyDown}   onChange={(event) => inputHandler(event)} name="password"
                                                />
                                                <span className="pwdicon">
                                                {
                                                type.type === 'password' ? 
                                                <i class="fa fa-eye-slash" aria-hidden="true" onClick={()=>showClick()}></i> : 
                                                <i class="fa fa-eye" aria-hidden="true" onClick={()=>hideClick()}></i> 
                                                }

                                                    </span>
                                                <p className="errorMessage">{Errorpassword}</p>
                                                
                                            
                                        </div>

                                        <div className="form-group text-right">
                                            <Link to="/forgetpassword">Forget Password ?</Link>
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn default_btn">Login</button>
                                        </div>
                                    </form>

                                    <div className="form-group text-center">
                                        <p>Don't have an Account ? <Link to="/signup"> Signup</Link> </p>
                                    </div>


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
           <div className="chatspinner fullviewspinner">
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

export default Mylogin;


