import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import home from "../assets/FrontImage/ProfileIcon/home.svg"
import product from "../assets/FrontImage/ProfileIcon/box.svg"
import profileuser from "../assets/FrontImage/ProfileIcon/user.svg"
import projectuser from "../assets/FrontImage/ProfileIcon/users.svg"
import order from "../assets/FrontImage/ProfileIcon/truck.svg"
import mappin from "../assets/FrontImage/ProfileIcon/map-pin.svg"
import logout from "../assets/FrontImage/ProfileIcon/log-out.svg"
import myhelp from "../assets/FrontImage/ProfileIcon/help-circle.svg"
import historyicon from "../assets/FrontImage/ProfileIcon/history.svg"
import $ from "jquery";
import axios from "axios";

class ResponsiveSidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            redirect: false,
        }
    }

    Gettoggle = (event) => {
        this.setState({ show: !this.state.show })
        event.preventDefault();
    }

    componentDidMount() {
        $('#togglebar').click(function(e) {
            e.stopPropagation();
            $("#Sidebar").toggleClass('togglemargin')
          });
          $('body').click(function(e) {
            if ($('#Sidebar').hasClass('togglemargin')) {
              $("#Sidebar").toggleClass('togglemargin')
            }
          })
   
  
        
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-Type": "application/json", "Accept": "application/json" }
        };

        axios.get('users/profile', config)
            .then(result => {
                if(result.data.status==true){
                    this.setState(result.data.data.userdetails)
                }else{
                    localStorage.removeItem("user-token")
                    this.setState({redirect:true})
                }
            });
    }

    Logout () {
        localStorage.removeItem("user-token")
        this.setState({redirect:true})
    }

    render() {

        const { redirect } = this.state;
        // const { profile } = this.state;

        if (redirect) {
          return <Redirect to='/login'/>;
        }

        return (
            <>
                <section className="custom-design-area ResponsiveSidebar" id="Sidebar">
                    <div className="user-area">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="usertitle">
                                <div className="Profile_pic">
                                    <img src={axios.defaults.baseImageURL+this.state.image} alt=""/>
                                    <h5 style={{color:"#F5B729"}}>{this.state.fullname}</h5>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebarmenu">
                    {
                        // alert(localStorage.getItem("manager-type"))
                        (localStorage.getItem("manager-type")==2) ? 
                        <ul>
                                <li>
                                <div className="log_out" onClick={(event) => this.Gettoggle(event)}>
                                    <img src={logout} alt="" />
                                    Logout
                                </div>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/Dynamate">
                                    <img src={home} alt="home" /> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/product_list">
                                    <img src={product} alt="product" /> Products
                                </Link>
                            </li>

                            <li>
                                <Link to="/jobsite_view">
                                    <img src={mappin} alt="jobsite" />
                                    Jobsite
                                </Link>
                            </li>

                            <li>
                                <Link to="/order_list">
                                    <img src={order} alt="order" /> Orders
                                </Link>
                            </li>

                            <li>
                                <Link to="/project_manager">
                                    <img src={projectuser} alt="project-manager" />
                                    Project Manager
                                </Link>
                            </li>
                        
                            <li>
                                <Link to="/myprofile">
                                    <img src={profileuser} alt="profile" /> My Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="/myprofile/history">
                                    <img src={historyicon} alt="History" /> History
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="/contact">
                                    <img src={myhelp} alt="contact-us" />
                                 Contact Us
                                </Link>
                            </li>
                            <li>
                                <div className="log_out" onClick={(event) => this.Gettoggle(event)}>
                                    <img src={logout} alt="logout" />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    }

                        
                    </div>
                </section>

                <Modal show={this.state.show} className="logoutPopup">
                    <Modal.Body>
                        <div className="messagelogout">
                            <h5>Are you sure you want to Signout ?</h5>
                        </div>
                        <div className="logout_confirm">
                            <span onClick={(event) => this.Gettoggle(event)}>Cancel</span>
                            <span onClick={()=>this.Logout()}>
                            yes
                            </span>
                        </div>

                    </Modal.Body>
                </Modal>

            </>
        );
    }
}

export default ResponsiveSidebar;