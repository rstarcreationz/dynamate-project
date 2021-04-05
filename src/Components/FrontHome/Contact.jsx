import React, { useState, useEffect } from "react";
import Header from "../Header"
import {Link} from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PinDropIcon from '@material-ui/icons/PinDrop';
import axios from "axios";
import {Spinner} from "react-bootstrap";

const Contact = () => {

    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() => {
        getContactDetails();
    }, []);


    const getContactDetails = () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
        };

        axios.get('contact', config)
            .then(result => {
                if (result.data.status == true) {
                    setemail(result.data.data.website_email)
                    setphone(result.data.data.website_contact)
                    setaddress(result.data.data.address)
                    setloading(true);
                }
                // alert("ok")
                console.log(result)
            })
    }

    return (
        <>
            <Header />|
            {
                loading ?
            <section className="Profileview Contactusview">
                <div className="container">
                    <div className="section-title">
                        <h3>Contact Us</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="profile_Card text-center" style={{ padding: "0" }}>

                                <div className="row">
                                    <div className="col-md-4 border-right">
                                        <div className="contact_card">
                                            <div className="contact_icon">
                                                <EmailIcon />
                                            </div>
                                            <h5>Email</h5>
                                            <p>{email ? email : ''}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4 border-right">
                                        <div className="contact_card">
                                            <div className="contact_icon">
                                                <PhoneAndroidIcon />
                                            </div>
                                            <h5>Phone</h5>
                                            <p>{phone ? phone : ''}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="contact_card">
                                            <div className="contact_icon">
                                                <PinDropIcon />
                                            </div>
                                            <h5>Address</h5>
                                            <p dangerouslySetInnerHTML={{ __html: address ? address : '' }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-4 offset-md-4 deleteoffset">
                                        <div className="contact_card text-center mt-3">
                                            <Link to="/message_us" className="sendMessage">
                                                Send a message
                                            </Link>
                                        </div>
                                    </div>

                        </div>
                    </div>
                </div>
            </section>
            :
            <div className="normalspinner">
                <Spinner animation="border"></Spinner>
            </div>
            }
        </>
    );
}

export default Contact;