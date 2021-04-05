import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Header from "../Header";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { NavItem } from "react-bootstrap";
import {Modal, Button} from "react-bootstrap";
import Ordermats from "../../assets/FrontImage/righticon.png";
import {Spinner} from "react-bootstrap";

const ProjectManager = () => {

    const [managerView, SetmanagerView] = useState([])
    const [loading, setloading] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        LoadData();
    }, [])


    const Gettoggle = () =>{
        setModal(!modal)
        setDeleteManager(!DeleteManager)
    }

    /// api for list project manager

    const [errormanagerView, seterrormanagerView] = useState('')

    const LoadData = async () => {
    //  alert('ok')
        
    var token = localStorage.getItem('user-token');
    const config = {
        headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };

       await axios.get('users/project-manager/list', config)
            .then(result => {
               
                if(result.data.status==true){
                SetmanagerView(result.data.data.projectmanagers)
                
                }else{
                    seterrormanagerView(result.data.message);
                }
            });
            setloading(true);
    }

    //// onload delete function

    const [did, setdid] = useState("")
  

    /// popup for delete manager 
    const [DeleteManager, setDeleteManager] = useState(false);

    const toggledeletePM = (jobsite_id) =>{
        setdid(jobsite_id)
        setDeleteManager(!DeleteManager)
    }    

    //// api for delete project manager
    const deleteRow = async () =>{

       
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token,"Accept": "application/json", "Content-type":"application/json" }
        };

        await axios.post('users/project-manager/delete',{id:did}, config);
        LoadData();
        setModal(!modal)
       };
    
    return (
        <>
        <Header/>
        {
            loading ? 
            <section className="projectmanagerSec">
            <div className="container">
            <div className="section-title responsive-manager-title">
                <h3>Project Manager</h3>
                    <Link to="/add_project_manager" className="float-right" style={{color:"#000"}}>
                    <span className="create_jobsite">Create <AddCircleOutlineIcon/></span>
                    </Link>
            </div>
                <div className="row">
                    <div className="col-md-12">

                        {
                          ! errormanagerView ? 
                            <div className="Project_manage projectmanager_list">
                            {
                            managerView.map((item) =>   {
                                console.log(item.fullname)
                                return(
                                    <div className="row border-bottom mb-3">
                                
                                <div className="col-xs-8 col-sm-8 col-md-10">
                                        <Link to={'/edit_project_manager/' + item.id}>
                                        <h5>{item.fullname}</h5>
                                        </Link>
                                        <p>{(item.jobsite_location)? item.jobsite_location:'Not assigned'} </p>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-2">
                                        <div className="projectbtn">
                                        <p style={{background:"red", cursor:"pointer"}} onClick={() => toggledeletePM(item.id)} >Delete</p>

                                        {/* <p style={{background:"red", cursor:"pointer"}} onClick={() => deleteRow(item.id)} >Delete</p> */}
                                            <p className={item.status=="Not Assigned" ? "assignyellow" : "assigngreen" }>{item.status}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                )
                                
                            })
                               
                        }

                            </div>
                            :
                            <div className="noproductserror">
                                <h5>You have no Project Manager !</h5>
                            </div>
                        }
                    </div>
                </div>
            </div>
       </section>
            :
            <div className="normalspinner">
            <Spinner animation="border"></Spinner>
            </div>
        }
         

            {/* ///// delete confirm pop up */}
            <Modal show={DeleteManager} className="logoutPopup">
                    <Modal.Body>

                        <div className="messagelogout">
                            <h5>Are you sure you want to delete project manager ?</h5>
                           
                            {/* <input type="text" id="xitemid" value="0"/> */}
                        </div>
                        <div className="logout_confirm">
                            <span onClick={(event) => toggledeletePM(event)}>Cancel</span>
                            <span onClick={()=>deleteRow()}>
                            yes
                            </span>
                        </div>

                    </Modal.Body>
                </Modal>

           <Modal show={modal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Project Manager Deleted</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={()=>Gettoggle()}>
                    <span>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>

        </>
    );
}

export default ProjectManager;