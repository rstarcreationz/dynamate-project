import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import {Dropdown} from "react-bootstrap";
import whitelogo from "../assets/FrontImage/white-logo.png";
import ResponsiveSidebar from './ResponsiveSidebar';
import axios from "axios";
import GoogleTranslate from "./GoogleTranslate";

const Header = () => {
        let history = useHistory();
    const Logout = () => {
       
        localStorage.removeItem("user-token")
        localStorage.clear();
            
            history.push('/login')
        }

       

    return (
    <>
        <div>
        {/* <GoogleTranslate/> */}
            <header>
                <div className="container">
                <Navbar expand="lg">
                <Navbar.Brand>
                {
                        (localStorage.getItem("manager-type")==2) ? 
                        <span style={{cursor:"pointer"}}>
                        <img src={axios.defaults.baseStaticImageURL+whitelogo} alt=""/>
                        </span>
                        :
                        <Link to="/">
                        <img src={axios.defaults.baseStaticImageURL+whitelogo} alt=""/>
                        </Link>
                }
                   
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="togglebar">
                <i class="fa fa-align-left" aria-hidden="true"></i>
                    </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        // alert(localStorage.getItem("manager-type"))
                        (localStorage.getItem("manager-type")==2) ? 
                        <>
                         <Nav className="ml-auto">
                         <Link to="/total_mates">Yard</Link>
                        <p onClick={()=>Logout()}>Logout</p>
                        </Nav>
                        </>
                        :
                        <Nav className="ml-auto">
                        <Link to="/">Home</Link>
                        <Link to="/product_list">Product</Link>
                        <Link to="/jobsite_view">Jobsite</Link>
                        <Link to="/order_list">Orders</Link>
                        <Link to="/project_manager">Project Manager</Link>
                        <Link to="/myprofile">My Profile</Link>
                        <Link to="/contact">Contact us</Link>
                        </Nav>


                    }
                   

                </Navbar.Collapse>
            </Navbar>
                </div>
            </header>
        </div>
        <ResponsiveSidebar/>
    </>
    );
}

export default Header;