import React from "react";
import Header from "../Header"
import helpicon from "../../assets/FrontImage/helpicon.png";
import {Link} from "react-router-dom"

const Help = () =>{
    return(
        <>
        
        <section className="Profileview"> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile_Card text-center help_card">
                       
                            <div>
                                <img src={helpicon} alt=""/>
                            </div>
                            <h3>Need some help</h3>
                            <h5 style={{color:"#F5B729"}}>How can we help you</h5>
                        <div className="form-group TransferMatbtn profileupdate_btn">
                            <Link to="/contact">
                            <button type="button" className="custom_btn" style={{margin:"auto"}}>Contact Us</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Help;