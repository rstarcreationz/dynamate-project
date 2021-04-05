import React, { useState,useEffect } from "react";
import {CardBody} from 'reactstrap';
import Front_logo from '../../assets/FrontImage/white-logo.png'
import {Modal, Button} from "react-bootstrap";
import setpassword from "../../assets/FrontImage/setpassword.png";
import { useHistory,useParams } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () =>{
 
    let history = useHistory();
    let { token }= useParams();

    useEffect(()=>{
        VerfiyForgetToken();
    },[])


    //verify token 
    const VerfiyForgetToken =async() =>{
          await axios.get('/setpassword/'+token)
                     .then(result=>{
                        //  console.log(result)
                        if(result.data.status==false){
                            // alert("token has been expired.")
                          history.push('/login')
                        }else{

                        }
                     })
               
                
    }


    const [updatePwd, setupdatePwd] = useState({
        new_password:"",
        confirm_password:""
    })

    const passwordChange = (event) =>{
        setupdatePwd({ ...updatePwd, [event.target.name]: event.target.value })
        console.log(event.target.value);
    }

    const [enewpass, setenewpass] = useState("")
    const [ecpass, setecpass] = useState("")
    const [servermessage, setservermessage] = useState()
        
    const [modal, setModal] = useState(false)

    const Gettoggle = (event) =>{
        setModal(!modal)
        // event.preventDefault();
        // history.push("/Dynamate/login")
    }


    const Closetoggle = (event) =>{
        setModal(!modal)
        //event.preventDefault();
       history.push("/login")
    }


    
    const submitChange = async(event) =>{
        event.preventDefault();
        console.log("setPwd", updatePwd);
        let error =0;

        if(updatePwd.new_password==""){
            setenewpass("*New password is required.");
            error++;
        }else{
            setenewpass("");
        }


        if(updatePwd.confirm_password==""){
            setecpass("*Confirm password is required.");
            error++;
        }else{
            setecpass("");
        }


        if(updatePwd.new_password !=="" && updatePwd.confirm_password!=""){
           
            if(updatePwd.new_password != updatePwd.confirm_password){
                setecpass("*Password not matched.")
                error++;
            }else{
                setecpass("")
            }
        }

        if(error==0){
            var capsule = {
                "new_password":updatePwd.new_password
            };
           await axios.post('setpassword/'+token,capsule)
                      .then(result=>{
                          console.log(result)
                        if(result.data.status==true){
                             Gettoggle();
                            // setModal(!modal)
                            // history.push('/Dynamate/login')
                        }else{
                            setservermessage(result.data.message)
                        }
                      })
    
        }
       

 
    }

    return(
        <div className="Front_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-md-4">
                       <div className="front_form">
                            <CardBody>
                                <div className="form_logo">
                                    <img src={ Front_logo } alt=""/>
                                </div>
                                <form action="" onSubmit={(event)=>submitChange(event)}>
                                <span className="text-danger">{servermessage}</span>
                                <div className="form-group">
                                <label htmlFor="">New Password</label>
                                <input type="password" className="form-control"
                                onChange={(event)=>passwordChange(event)} name="new_password"
                                />
                                <span className="text-warning">{enewpass}</span>
                                </div>

                                <div className="form-group">
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" className="form-control"
                                onChange={(event)=>passwordChange(event)} name="confirm_password"/>
                                <span className="text-warning">{ecpass}</span>
                                </div>

                                <div className="form-group">
                               <button type="submit" className="btn default_btn" >Update Password</button>
                                </div>
                                
                                </form>
                            </CardBody>
                       </div>
                    </div>
                </div>
            </div>

            <Button onClick={(event)=>Gettoggle(event)} id="enable" style={{display:"none"}} ></Button>
            <Modal show={modal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={setpassword} alt=""/>
                </div>
                <div className="inner_popup">
                    <h6>Password Changed</h6>
                </div>
                <Button className="custom_btn popup_btn" onClick={(event)=>Closetoggle(event)}>ok</Button>
                </Modal.Body>
                </div>
            </Modal>
           

        </div>
    
    );
}

export default UpdatePassword;