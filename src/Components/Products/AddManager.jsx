import React, { useState,useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "bootstrap";
import {Modal, Button} from "react-bootstrap";
import Ordermats from "../../assets/FrontImage/righticon.png";

const AddManager = () => {

    const [profileImg, SetprofileImg] = useState({
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT7YG7eR09uIIv8Ep_D6UQbDkoYVU3cL6PiaSBUkrKUc88OIfhNpvvT0v6TArf2ygzFM2Gw&usqp=CAU&ec=45771803"
    })

    const [modal, setModal] = useState(false);

    const AddModal = () =>{
        setModal(!modal)
    }

    const Pushthis = () => {
        history.push('/project_manager')
    }

    const photoUpload = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            if (reader.readyState == 2) {
                SetprofileImg({
                    profilePic: reader.result
                });
            }
        }
        reader.readAsDataURL(file);
    }


    let history = useHistory();
    const [manager, setManager] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    })



    useEffect(()=>{
        getUnassignedJobsites();
    },[]);


     //error 
     const [servermessage, setservermessage] = useState("")
     const [eemail, seteemail] = useState("");
     const [ephone, setephone] = useState("");
     const [eusername, seteusername] = useState("");
     const [efullname, setefullname] = useState("");
     const [epassword, setepassword] = useState("")

     const [errmessage, seterrmessage] = useState("")

    const [SelectedJobsite, setSelectedJobsite] = useState("")    
    const [jobsites, setjobsites] = useState([])

    const getUnassignedJobsites = async()=>{

        var token = localStorage.getItem('user-token');
        const config = {
        headers: { 
            'Authorization' : 'Bearer '+token,
                'Accept' : 'application/json'
         }
        };

        await axios.post('users/jobsite/get-unasigned-jobsites',{},config)
                   .then(result=>{
                       if(result.data.status==true){
                        setjobsites(result.data.data.jobsite)
                       }
                   })
    }

    const inputHandler = (event) => {

        if (event.currentTarget.value.includes(" ")) {
            event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
          }

        setManager({ ...manager, [event.target.name]: event.target.value })
        console.log(event.target.value);
    }

    const handleKeyDown = e => {
        if (e.key === " ") {
          e.preventDefault();
        }
      };

    //   const handleKeyUp = e => {
    //     if (e.key === "") {
    //     }
    //   };

      const AddtoManager = async (event) => {
        event.preventDefault();
      
       

        var error = 0;

        if(manager.fullname==""){
            setefullname("*Fullname is required.");
            error++;
        }else{
            setefullname("");
        }


        if(manager.email==""){
           seteemail("*Email is required.");
           error++;
        }else{
            seteemail("");
        }


        if(manager.phone==""){
          setephone("*Phone number is required.");
          error++;
        }
        else if (manager.phone.length > 10) {
            setephone("*Phone number should be smaller than 10.");
            error++;
        }
        else{
          setephone("");
        }
        

        if(manager.password==""){
         setepassword("*Password is required.");
         error++;
        }
        else if (manager.password.length < 6) {
            setepassword("*Password should be greater than 6.");
            error++;
        }
        else{
          setepassword("");
        }


        if(manager.username==""){
          seteusername("*Username is required.");
          error++;
        }else{
          seteusername("")
        }

        
        if(error==0){
    
            var capsule = {
                "fullname": manager.fullname,
                "email": manager.email,
                "phone": manager.phone,
                "password": manager.password,
                "username": manager.username,
                "job_site_id":SelectedJobsite
            }
    
            console.log(capsule)

                var token = localStorage.getItem('user-token');
            const config = {
            headers: { 
                "Authorization":"Bearer "+token,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
             }
        };
    
           await axios.post('users/project-manager/add',capsule, config, {
            
            }).then(result => {
                    if(result.data.status==true){
                        // alert("ok")
                        AddModal();
                    }
                    else{
                        seterrmessage(result.data.message)
                    }
    
                })
        }

        
           
       
    }






    return (
        <>
            <Header />
            <section className="MatDetails">
                <div className="container">

                    <div className="section-title">
                        <h3>Add Project Manager</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lg-6 offset-sm-3 offsetremove">
                            <div className="Project_manage addManager">
                                <form action="" method="" onSubmit={(event) => AddtoManager(event)}>

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
                                     <span className="text-danger">{servermessage}</span>
                                    <div class="form-group">
                                        <label for="">Full Name</label>
                                        <input type="text" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="fullname"
                                        autoComplete="off" />
                                         <span className="text-danger">{efullname}</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" class="form-control"
                                           pattern="[^\s]+" onChange={(event) => inputHandler(event)} name="email"  autoComplete="off"
                                        />
                                         <span className="text-danger">{eemail}</span>
                                         <span className="text-danger">{errmessage}</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Phone No.</label>
                                        <input type="number" class="form-control"
                                            onChange={(event) => inputHandler(event)} name="phone"  autoComplete="off"
                                        />
                                         <span className="text-danger">{ephone}</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Username</label>
                                        <input type="text" class="form-control"
                                         pattern="[^\s]+"   onChange={(event) => inputHandler(event)} name="username"  autoComplete="off"
                                            />
                                         <span className="text-danger">{eusername}</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Password</label>
                                        <input type="password" class="form-control"
                                         pattern="[^\s]+"   onChange={(event) => inputHandler(event)} name="password"  autoComplete="off"
                                        />
                                         <span className="text-danger">{epassword}</span>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Select Job Site (Optional)</label>
                                        <select name="" id="" class="form-control" onChange={(e)=>setSelectedJobsite(e.target.value)}>
                                            <option value="1" disabled="">--select--</option>
                                            {
                                                jobsites.map((item,key) =>{
                                                    return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                                })
                                            }
                                            {/* <option value="2">Cottingham</option>
                                            <option value="2">Oxfordshire</option> */}
                                        </select><i class="fa fa-angle-down"></i>
                                        {/* <span className="text-danger">{servermessage}</span> */}
                                    </div>
                                    <div class="form-group profileEdit_btn">
                                        <button type="submit" class="custom_btn" style={{ margin: "35px auto" }}>Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal show={modal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Project Manager Created</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn">
                    <span onClick={()=>Pushthis()} style={{padding:"0 15px"}}>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>

        </>
    );
}

export default AddManager;