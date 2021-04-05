import React,{useState} from "react";
import {CardBody} from 'reactstrap';
import Front_logo from '../../assets/FrontImage/white-logo.png';
import axios from 'axios';


const ForgetPassword = () =>{

    // const [forget, setForget] = useState({
    //     email:""
    // })

    const [email, setemail] = useState("")

    const [eforget, seteforget] = useState("")

    const [servermessage, setservermessage] = useState("")
    const [errmessage, seterrmessage] = useState("")

    // const forgetChange = (event) =>{
    //     setForget({ ...forget, [event.target.name]: event.target.value })
    //     console.log(event.target.value);
    // }


    const submitForget = async(event) =>{
        console.log("forgetpwd", email);
        event.preventDefault();
        

        var error = 0;
        if(email=="")
        {
            // alert(email)
            setservermessage("*Email is required.");
            error++;
            // alert(eforget)
        }else{
            setservermessage("");
        }
        
        if(error==0){
            var capsule ={
                "email":email
             }
             await axios.post('forget-password-mail',capsule)
                  .then(result=>{
                      console.log(result)
                      if(result.data.status==true){
                         setservermessage(result.data.message)
                         seterrmessage('')
                      }else{
                        seterrmessage(result.data.message)
                        setservermessage('')
                    }
                  })
        }
        event.target.reset();
       
    }

    return(
        
        <div className="Front_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-md-4">
                       <div className="front_form">
                            <CardBody>
                                {/* <span className="text-danger">{eforget}</span> */}
                                <div className="form_logo">
                                    <img src={ Front_logo } alt=""/>
                                </div>
                                <form action="" onSubmit={(event)=>submitForget(event)}>
                                
                                <div className="form-group">
                                    <h4>Forget Password ?</h4>
                                </div>
                                
                                <div className="form-group forget">
                                    <p>Don't worry! Just fill in your Email and we'll send
                                        you a code to reset your password.</p>
                                </div>
                               
                                <div className="form-group">
                                    <label htmlFor="">Enter Email Address</label>
                                <input type="email" className="form-control" 
                                onChange={(event)=>setemail(event.target.value)} name="email"
                                />     
                                </div>

                                <span className="errorMessage">{servermessage}</span>
                                <span className="text-danger">{errmessage}</span>

                                <div className="form-group">
                               <button type="submit" className="btn default_btn">Send Mail</button>
                                </div>
                                
                                </form> 
                            </CardBody>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default ForgetPassword;