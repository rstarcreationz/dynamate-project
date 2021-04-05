import React, { useState } from "react";
import { MDBAlert } from 'mdbreact';
import { Modal, Button } from "react-bootstrap";
import Header from "../Header";
import axios from "axios";
import Ordermats from "../../assets/FrontImage/righticon.png";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import {Spinner} from "react-bootstrap";

const EditProjectManager = () => {

    /// state for update manager
    let history = useHistory();
    const [manager, setManager] = useState({
        id:"",
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        job_site_id:""
    })

    const [loading, setloading] = useState(false)
    
    // onchange for update manager
    const inputHandler = (event) => {
        // alert(event.target.name);
        setManager({ ...manager, [event.target.name]: event.target.value })
        // alert(manager.job_site_id);
    }


    /// api for edit project manager
    const {id} = useParams();
    useEffect(()=>{
        EditManager();
        // UpdateManager();
        // getUnassignedJobsites();
    },[])

    ////// modal for edit

    const [Editmodel, setEditmodel] = useState(false);
    const modeledit = () =>{
        setEditmodel(!Editmodel)
    }

    const [jobsites, setjobsites] = useState([])

    const getUnassignedJobsites = async(job_site_id)=>{
        // alert(manager.job_site_id)
      var  capsule =  {
            jobsite_id:job_site_id
        }
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json"}
        };
        await axios.post('users/jobsite/get-unasigned-jobsites',capsule, config)
                   .then(result=>{
                       if(result.data.status==true){
                        setjobsites(result.data.data.jobsite)
                       }
                   })
    }


    
    const EditManager = async() =>{
        
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type":"application/json"}
        };
        
        await axios.post('users/project-manager/edit',{id:id}, config)
            .then(result => {
                if(result.data.status==true){
                setManager(result.data.data.projectmanagers)
                setloading(true)
                // console.log(result.data.data)
                getUnassignedJobsites(result.data.data.projectmanagers.job_site_id)
                }
            });

        ///// new code

       
    }

    const [editerr,setediterr] = useState('');
   
/// api for update project manager
    const UpdateManager = async (event) => {
        event.preventDefault();
      
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json","Content-type":"application/json"}
        };
        
        axios.post('users/project-manager/update',  manager, config)
        .then(result => {
            if(result.data.status==true){
                modeledit();
            }else{
                setediterr(result.data.message)
            }

            })
            
        
    }

    return (
        <>
            <Header />
            {
                loading ?
            
            <section className="MatDetails">
                <div className="container">

                    <div className="section-title">
                        <h3>Edit Project Manager</h3>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-6 offset-sm-3 custom_mrgleft">
                            <div className="Project_manage addManager">
                                {
                                     editerr ?
                                     <MDBAlert className="alert alert-danger" color="warning" dismiss>
                                     <strong>{editerr}</strong>
                                 </MDBAlert >
                                 :
                                 null
                                }
                                <form action="" method="" onSubmit={(event) => UpdateManager(event)}>

                                    {/* <div className="form-group text-center">

                                        <label htmlFor="photo-upload" className="custom-file-upload fas">
                                            <div className="img-wrap img-upload" >
                                                <img for="photo-upload" src={profileImg.profilePic} />
                                            </div>

                                            <div class="p-image"> <i class="fa fa-camera upload-button"></i>
                                                <input class="file-upload" id="photo-upload" type="file" name="image" accept="image/*" onChange={(event) => photoUpload(event)} />
                                            </div>
                                        </label>
                                    </div> */}

                                    {/* <div class="Profile_pic" style={{border:"none"}}><img src="https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2017/05/shutterstock_529646395.jpg?fit=1024%2C682&amp;ssl=1" alt="" /><h5>Jhon disuza</h5></div>
                                    </div> */}
                                     <input type="hidden" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="id"
                                            value={manager.id}
                                        />
                                    <div class="form-group">
                                        <label for="">Full Name</label>
                                        <input type="text" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="fullname"
                                            value={manager.fullname}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" class="form-control"
                                          pattern="[^\s]+"  onChange={(event) => inputHandler(event)} name="email"
                                            value={manager.email}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="">Phone No.</label>
                                        <input type="number" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="phone"
                                            value={manager.phone}
                                        />
                                    </div>
                                    {/* <div class="form-group">
                                        <label for="">Username</label>
                                        <input type="text" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="username"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="">Password</label>
                                        <input type="password" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="password"
                                        />
                                    </div> */}
                                    <div class="form-group">
                                        <label for="">Select Job Site (Optional)</label>
                                        {/* {alert(manager.job_site_id)} */}
                                        <select name="job_site_id" id="" class="form-control" value={manager.job_site_id}   onChange={(event) => inputHandler(event)}>
                                            <option value="0" >--select--</option>
                                            {
                                                jobsites?
                                                jobsites.map((item,key)=>{
                                                return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                                })
                                                :null
                                            }
                                            {/* <option value="Cottingham">Cottingham</option>
                                            <option value="Oxfordshire">Oxfordshire</option>
                                            <option value="2">Cottingham</option>
                                            <option value="2">Oxfordshire</option> */}
                                        </select><i class="fa fa-angle-down"></i>
                                    </div>
                                    <div class="form-group profileEdit_btn">
                                        <button type="submit" class="custom_btn" style={{ margin: "35px auto" }}>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :
             <div className="chatspinner">
                 <Spinner animation="border"></Spinner>
             </div>

             }
                
              {/* //////// Edit success modal ////// */}
              <Modal show={Editmodel} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Project Manager update</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={()=>modeledit()}>
                    <Link style={{color:"#fff"}} to="/project_manager">
                    <span>OK</span>
                    </Link>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>

        </>
    );
}

export default EditProjectManager;



