import React, { useState } from "react";
import Header from "../Header";
import { Link, useHistory, useParams } from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import axios from 'axios';
import GPlace from './GPlace';
import GPlaceEdit from './GplaceEdit';
import Ordermats from "../../assets/FrontImage/righticon.png";
import { MDBAlert } from 'mdbreact';
import {Spinner} from "react-bootstrap"; 
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datetime';
// import moment from 'moment';
// import 'react-datetime/css/react-datetime.css';

// API key of the google map


// load google map script
const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=apikeyenterhere`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
    }
}

const JobsiteView = () => {


    let history = useHistory();
    const [modal, setModal] = useState(false)
   


    const Gettoggle = () => {
        seterrsitename("");
        seterrlocation("");
        seterrcompletion("");
        seterrstartdata("");
        setModal(!modal)
       
    }

    const [loading, setloading] = useState(false);
    ////// modal for edit jobsite

    const [Editconfirmmodel, setEditconfirmmodel] = useState(false);
    const modeledit = () =>{
        setEditconfirmmodel(!Editconfirmmodel)
    }
    const dismissedit = () =>{
        modeledit();
        CancelJobsite();
    }

    // //// modal for add jobsite
    const [Addedconfirmmodel, setAddedconfirmmodel] = useState(false);
    const modeladdConf = () =>{
        setAddedconfirmmodel(!Addedconfirmmodel)
    }
    const modaldismissadd = () =>{
        modeladdConf();
        Gettoggle();
    }

  
  

    //// jobsite list view ////

    const [jobsiteList, setJobsiteList] = useState([])
    const [projectManager, setprojectManager] = useState([])


    const [errsitename, seterrsitename] = useState("")
    const [errlocation, seterrlocation] = useState("")
    const [errstartdata, seterrstartdata] = useState("")
    const [errcompletion, seterrcompletion] = useState("")
   

    ////// function for start and end date with javascript //////////
    
   
    const [errorjoblist, seterrorjoblist] = useState("")
    const LoadJobsite = async () => {
        
       
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
        };

       await  axios.get('users/jobsite/list',config)
            .then(result => {
                if(result.data.status==true){
                    setJobsiteList(result.data.data.jobsite)
                    setprojectManager(result.data.data.managers_list)
                    // setviewMap(result.data.data.jobsite)
                }else{
                    seterrorjoblist(result.data.message);
                }
                
                // alert(result.data.jobsite_name)
            });
            setloading(true);
    }




    //// api for add jobsite ////

    // const [myJobsite, setJobsite] = useState({
    //     jobsite_name: "",
    //     lat: "",
    //     long: "",
    //     jobsite_location: "",
    //     assigned_project_manager: "",
    //     expected_completion_date: ""
    // })

   

    const today = new Date()

    const [jobsiteadddate, setjobsiteadddate] = useState(new Date)
    const [addjobsitename, setaddjobsitename] = useState("")
    const [addjobsitelat, setaddjobsitelat] = useState('')
    const [addjobsitelong, setaddjobsitelong] = useState('')
    const [addjobsitelocation, setaddjobsitelocation] = useState('')
    const [addManager, setaddManager] = useState('')
    const [addcompletedate, setaddcompletedate] = useState(new Date)

    const datehandle = (d) => {
        setjobsiteadddate(d)
    }

    const completedatehandle = (d) => {
        setaddcompletedate(d)
    }

    //// modal for confirmation 
    const [confirmModal, setconfirmModal] = useState(false);
 
    const AddJobsite = async (event) => {
      
        event.preventDefault();
        //  alert(myJobsite.jobsite_location)
        var error = 0;

        if(addjobsitename=="")
        {
            seterrsitename("*Jobsite name is required.")
            error++;
        } 
        else{
            seterrsitename("");
        }

        if(addjobsitelocation=="")
        {
            seterrlocation("*Jobsite location is required.")
            error++;
        }else{
            seterrlocation("");
        }

        if(jobsiteadddate=="")
        {
            seterrstartdata("*Start date is required.")
            error++;
        }else{
            seterrstartdata("");
        }


        if(addcompletedate=="")
        {
            seterrcompletion("*Expected Completion date  is required.")
            error++;
        }else{
            seterrcompletion("");
            
        }


        if(error==0){

            var capsule = {
                start_date : jobsiteadddate,
                jobsite_name: addjobsitename,
                lat: addjobsitelat,
                long: addjobsitelong,
                jobsite_location: addjobsitelocation,
                assigned_project_manager: addManager,
                expected_completion_date: addcompletedate
            }


        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
        };
        
        await axios.post("users/jobsite/add",capsule ,config)
        .then(result=>{
            if(result.data.status==true){
                history.push("/jobsite_view");
                setconfirmModal(!confirmModal, !modal)
                modeladdConf();
                // setModal(!modal)
                LoadJobsite();
                setloading(true);
            }else{
                
            }
        });
       
        }
       
    }


    /// api for edit joblist

     /// state for update joblist

     const [updatemyJoblist, setUpdateJoblist] = useState({
        id: "",
        jobsite_name: "",
        jobsite_location:"",
        lat: "",
        long: "",
        assigned_project_manager:"",
        start_date: "",
        expected_completion_date: ""
    })
    // const [updateManager, setUpdateManager] = useState({
    //     id:"",
    //     fullname: ""
    // })

    // onchange for update manager
    const updatJoblistHandler = (event) => {
        setUpdateJoblist({ ...updatemyJoblist, [event.target.name]: event.target.value })
        // setUpdateManager({ ...updateManager, [event.target.name]: event.target.value })
    }
    


   const [managerList, setmanagerList] = useState([])

    const EditMyJobsite = (id) => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", }
        };        

        axios.post('users/jobsite/edit', { id: id }, config)
            .then(result => {
                if(result.data.status==true){
                    setUpdateJoblist(result.data.data.jobsite)
                    setmanagerList(result.data.data.managers_list)
                    CancelJobsite();
                   
                }
              
                // setUpdateManager(result.data.data.managers_list)
                // console.log("editjobsite", result.data)
            });
           
            // console.log('newedit',updateManager.fullname)
    }

    const [Editmodal, setEditmodal] = useState(false)
    const CancelJobsite = () => {
        setEditmodal(!Editmodal)
    }
    

    /// api for update joblist
    const UpdateJoblist = async (event) => {
        event.preventDefault();
        
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", }
        }; 
        // alert(updatemyJoblist.jobsite_location)
        axios.post('users/jobsite/update', updatemyJoblist, config)
             .then(result => {
                 if(result.data.status==true){
                    LoadJobsite()
                    modeledit();
                 }
               
               
            })
          
        //   history.push('/Dynamate/jobsite_view')
    }

        const [DeleteModal, setDeleteModal] = useState(false);

            const Getdelete = () =>{
                setdeleteerrMsg("")
                setDeleteModal(!DeleteModal)            
            }

    
    const [DeletedModal, setDeletedModal] = useState(false);

    const DeletedSucess = () =>{
        setDeletedModal(!DeletedModal)
    }
     
     const [did, setdid] = useState("")
     const fordelete = (jobsite_id) =>{
    //   alert(jobsite_id)
         setdid(jobsite_id)
         setDeleteModal(!DeleteModal) 
         
     }


    //  const fordeleteConfirm = (jobsite_id) =>{
    //     deletesite(jobsite_id)
    //      }

    //// api for delete project manager
    const [deleterrMsg, setdeleteerrMsg] = useState();
    const deletesite = async () => {
    
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
        };

        await axios.post('users/jobsite/delete', { id: did}, config)
        .then(result=>{
            if(result.data.status==true){
                Getdelete();
                DeletedSucess();
            }
            else
            {
                setdeleteerrMsg("")
                setdeleteerrMsg(result.data.message)
            }
           
        });
       
        LoadJobsite();
    };

    const [loadMap, setLoadMap] = useState(false);

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
            LoadJobsite();
            // UpdateJoblist();
        });
    }, []);

 ///////////// google map api integration ///////////////

    // const [viewMap, setviewMap] = useState([]);
    
    // const { isLoaded } = useLoadScript({
    //   googleMapsApiKey: "AIzaSyBqk_v1Hd9dIvch84SXEUg5ngWTe4JB-wA"
    // });

   
    // const mapStyles = {
    //     height: "200px",
    //     width: "100%",
    //     display: "block"
    // };

    // const defaultCenter = {
    //     lat: parseFloat(viewMap.lat), lng: parseFloat(viewMap.long)
    // }
    // console.log("map",viewMap)


    ///////

    return (
        <>
            <Header />|
            {
                loading ?
            <section className="jobsite_view">
                <div className="container">
                    <div className="text-right">
                        <span onClick={() => Gettoggle()} className="create_jobsite">Create <AddCircleOutlineIcon /></span>
                    </div>
                    <div className="section-title">
                        <h3 style={{marginBottom:"20px"}}>Jobsite </h3>
                    </div>

                    {
                       ! errorjoblist ? 
                        <div className="row mt-5">
                        {

                            jobsiteList.map((item, key) => {


                                return (
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-5" key={key}>
                                        <div className="product_Card">
                                        
                                            <div className="card-img">
                                                    <h5>{item.jobsite_name}</h5>
                                                <p id="getAdress">{item.jobsite_location}</p>
                                            </div>
                                           

                                            <div className="card-info">
                                            <Link className="jobsiteopen" style={{color:"#000"}} to={'/jobsite_detail/' + item.id}> View </Link>
                                                {/* <Link to={'/edit_jobsite/' + item.id}> */}
                                                <button type="button" className="viewbtn mb-0" onClick={() => EditMyJobsite(item.id)}>Edit</button>
                                                {/* </Link> */}

                                                <button type="button" onClick={() => fordelete(item.id)} className="viewbtn jobdelete">Delete </button>
                                                {/* <button type="button" onClick={() => Getdelete(item.id)} className="viewbtn jobdelete">Delete </button> */}

                                                {/* <button type="button" onClick={() => deletesite(item.id,item.assigned_project_manager_id)} className="viewbtn jobdelete">Delete</button> */}

                                                {/* <button type="button" onClick={() => deleteid(item.id,item.assigned_project_manager_id)} className="viewbtn jobdelete">Delete</button> */}
                                            </div>
                                        </div>

                                    </div>

                                )

                            })

                        }

                    </div>
                        :
                        <div className="noproductserror">
                            <h5>No Jobsite Available !</h5>
                        </div>
                    }

                   {/* <div className="fulljobsitemaparea">
                   {
                                isLoaded ? 
                               <>
                                <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                >
                                 <Marker key={viewMap.jobsite_name} position={defaultCenter} />
                                </GoogleMap>
                               </>
                                :
                                <p>Maps not available !</p>
                            }
                   </div> */}

                </div>
            </section>

            :
            <div className="normalspinner">
            <Spinner animation="border"></Spinner>
        </div>
}

             {/* // Modal for edit // */}

             <Modal show={Editmodal} className="jobmodal jobsiteModal">
                <div className="closemodal customclose"  onClick={() => CancelJobsite()}>
                <i className="fa fa-times"></i>
                </div>
                <h5 className="text-center">Update jobsite</h5>
                <Modal.Body>
                    <form action="" method="" onSubmit={(event) => UpdateJoblist(event)}>

                        <input type="hidden" class="form-control"
                            onChange={(event) => updatJoblistHandler(event)} name="id"
                            value={updatemyJoblist.id}
                        />
                        <div className="form-group">
                            <label htmlFor="">Enter Job Site Name</label>
                            <input type="text" className="form-control"
                                onChange={(event) => updatJoblistHandler(event)} name="jobsite_name"
                                value={updatemyJoblist.jobsite_name}
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="">Enter Job Site Location</label>
                            <input type="text" className="form-control"
                                onChange={(event) => updatJoblistHandler(event)} name="jobsite_location"
                                value={updatemyJoblist.jobsite_location}
                            />
                        </div>   */}


                        
                        <div className="form-group">
                            <label htmlFor="">Enter Job Site Location</label>
                            {/* <input type="text" className="form-control" 
                        onChange={(event)=>jobsiteHandler(event)} name="lat"
                        /> */}
                              <div className="address">
                                {!loadMap ? <div>Loading...</div> : <GPlaceEdit jobsiteLocation={updatemyJoblist.jobsite_location}  handlechange={updatJoblistHandler} />}
                                {/* <input type="text" className="form-control"
                                onChange={(event) => jobsiteHandler(event)} name="jobsite_location"
                            /> */}
                            </div>
                            {/* <div><input type="text" id="getAddress" className="form-control editlocation" name="jobsite_location" onChange={(event) => updatJoblistHandler(event)} value={updatemyJoblist.jobsite_location} /></div> */}

                            {/* <div><input type="text" id="getAddress" className="form-control editlocation" name="jobsite_location" onClick={(event) => jobsiteHandler(event)}/></div> */}

                            <div><input type="hidden" id="lat_id" name="lat" value={updatemyJoblist.lat} /></div>
                            <div><input type="hidden" id="lng_id" name="long" value={updatemyJoblist.long} /></div>
                            {/* <div>
                                <input type="text" id="editlocation" name="jobsite_location"  className="form-control" value={updatemyJoblist.jobsite_location} onChange={(event) => updatJoblistHandler(event)} />
                            </div> */}
                            <div>
                                <input type="hidden" id="getAddressEdit" name="jobsite_location" onClick={(event) => updatJoblistHandler(event)} />
                            </div>
                            <div>
                                <input type="hidden" id="editlat_id" name="lat" value={updatemyJoblist.lat} onClick={(event) => updatJoblistHandler(event)} />
                            </div>

                            <div>
                                <input type="hidden" id="editlng_id" name="long" value={updatemyJoblist.long} onClick={(event) => updatJoblistHandler(event)} />
                            </div>
                        </div>

                        <div className="form-group">
                        <label htmlFor="">Assign Project Manager</label>
                        {

                            
                                projectManager ? 
                                <select id="projectManager" value={updatemyJoblist.assigned_project_manager}  className="form-control"  onChange={(event) => updatJoblistHandler(event)} name="assigned_project_manager">
                                   
                                  <option value="0">--select-- </option>
                                                { 
                                        managerList.map(item=>{
                                            
                                    return(
                                        <option value={item.id}  >{item.fullname}</option>
                                        );
                                    })
                                    }
                                </select>
                          
                                    :
                                    null
                            }
                                {/* 
                            <label htmlFor="">Assign Project Manager</label>
                            <select id="projectManager" className="form-control" onChange={(event) => updatJoblistHandler(event)} name="assigned_project_manager">
                                <option value={myJobsite} selected disabled>--select--</option>
                                <option value="Michael">Michael</option>
                                <option value="Andrew">Andrew</option>
                            </select>
                            <i className="fa fa-angle-down"></i> */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Starting date</label>
                            <input type="date" className="form-control"
                                onChange={(event) => updatJoblistHandler(event)} name="start_date"
                                value={updatemyJoblist.start_date}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Expected completion date</label>
                            <input type="date" className="form-control"
                                onChange={(event) => updatJoblistHandler(event)} name="expected_completion_date"
                                value={updatemyJoblist.expected_completion_date}
                            />
                        </div>


                        <div className="form-group Matsite">
                            <button type="submit" className="custom_btn" > Update </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* /////// modal for add ////// */}

            <Modal show={modal} className="jobmodal jobsiteModal">

                <div className="closemodal customclose"  onClick={() => Gettoggle()}>
                <i className="fa fa-times"></i>
                </div>
                
                <h5 className="text-center">Create new jobsite</h5>
                <Modal.Body>
                    <form action="" method="" onSubmit={(event) => AddJobsite(event)}>

                        <div className="form-group">
                            <label htmlFor="">Enter Job Site Name</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setaddjobsitename(event.target.value)} name="jobsite_name"
                            />
                            <span className="text-danger">{errsitename}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Enter Job Site Location</label>
                            {/* <input type="text" className="form-control" 
                        onChange={(event)=>jobsiteHandler(event)} name="lat"
                        /> */}
                            <div className="address">
                                {!loadMap ? <div>Loading...</div> : <GPlace />}
                                {/* <input type="text" className="form-control"
                                onChange={(event) => jobsiteHandler(event)} name="jobsite_location"
                            /> */}
                            </div>
                            <div><input type="hidden" id="getAddress" name="jobsite_location" onClick={(event) => setaddjobsitelocation(event.target.value)} /></div>
                            <div><input type="hidden" id="lat_id" name="lat" onClick={(event) => setaddjobsitelat(event.target.value)} /></div>
                            <div><input type="hidden" id="lng_id" name="long" onClick={(event) => setaddjobsitelong(event.target.value)} /></div>
                            <span className="text-danger">{errlocation}</span> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Assign Project Manager</label>
                            {
                                projectManager ? 
                                <select id="projectManager" className="form-control" onChange={(event) => setaddManager(event.target.value)} name="assigned_project_manager">
                                   
                                                <option value="1" selected disabled>--select--</option>
                                                {
                                        projectManager.map(item=>{
                                            return(
                                                <option value={item.id}>{item.fullname}</option>
                                                );
                                            })
                                    }
                                </select>
                          
                                    :
                                    null
                            }

                     

                        </div>

                        <div className="form-group jobsitedatepicker">
                            <label htmlFor="">Starting date</label>
                            {/* <input type="date" className="form-control"
                                onChange={(event) => jobsiteHandler(event.target.value)} name="start_date" dateFormat="DD/MM/YYYY"
                            />
                              <span className="text-danger">{errstartdata}</span>  */}

                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={jobsiteadddate}
                                onChange={datehandle} 
                                minDate={today}
                                todayButton={"Today"}/>

                               <span className="text-danger">{errstartdata}</span> 

                           

                        </div>

                        <div className="form-group jobsitedatepicker">
                            <label htmlFor="">Expected completion date</label>
                            {/* <input type="date" id="end" data-js-start-date className="form-control"
                                onChange={(event) => setaddcompletedate(event.target.value)} name="expected_completion_date" dateFormat="DD/MM/YYYY"
                            />
                              <span className="text-danger">{errcompletion}</span>  */}

                              <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={addcompletedate}
                                onChange={completedatehandle} 
                                minDate={today}
                                todayButton={"Today"}/>
                        </div>


                        <div className="form-group Matsite">
                            <button type="submit" className="custom_btn"> Create </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            
            {/* //////// jobsite delete modal ////// */}
            <Modal show={DeletedModal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Jobsite Deleted</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={()=>DeletedSucess()}>
                    <span>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>

            {/* /////// jobsite delete modal success */}

            {/* <Modal show={confirmModal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Jobsite Added</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={()=>Getconfirmtoggle()}>
                    <span>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>
             */}

            {/* ///// delete confirm pop up */}
                <Modal show={DeleteModal} className="logoutPopup">
                    <Modal.Body>
                    {
                        deleterrMsg ?
                            <MDBAlert className="alert alert-danger" color="warning" dismiss>
                            <strong>{deleterrMsg}</strong>
                        </MDBAlert >
                        :
                        null
                    }
                        <div className="messagelogout">
                            <h5>Are you sure you want to delete jobsite ?</h5>
                           
                            {/* <input type="text" id="xitemid" value="0"/> */}
                        </div>
                        <div className="logout_confirm">
                            <span onClick={(event) => Getdelete(event)}>Cancel</span>
                            <span onClick={()=>deletesite()}>
                                yes
                            </span>
                        </div>

                    </Modal.Body>
                </Modal>


                {/* //////// Edit jobsite success modal ////// */}
                <Modal show={Editconfirmmodel} className="setpasswordpopup">
                    <div className="form_model">
                    <Modal.Body>
                    <div>
                        <img src={Ordermats} alt=""/>
                    </div>
                    <div className="inner_popup">
                        <h4>Jobsite updated</h4>
                        <h5 style={{color:"#F5B729"}}>Successfully</h5>
                    </div>
                    <Button className="custom_btn popup_btn" onClick={()=>dismissedit()}>   
                        <span>OK</span>
                    </Button>
                
                    </Modal.Body>
                    </div>
                </Modal>


                    {/* //////// Added jobsite success modal ////// */}
                    <Modal show={Addedconfirmmodel} className="setpasswordpopup">
                    <div className="form_model">
                    <Modal.Body>
                    <div>
                        <img src={Ordermats} alt=""/>
                    </div>
                    <div className="inner_popup">
                        <h4>Jobsite Added</h4>
                        <h5 style={{color:"#F5B729"}}>Successfully</h5>
                    </div>
                    <Button className="custom_btn popup_btn" onClick={()=>modaldismissadd()}>   
                        <span>OK</span>
                    </Button>

                    </Modal.Body>
                    </div>
                    </Modal>
            
             

        </>
    );
}

export default JobsiteView;




///////// extra code //////////

 {/* <div className="form-group">
                            <label htmlFor="">Enter Job Site Location</label>
                            <input type="text" className="form-control"
                                onChange={(event) => updatJoblistHandler(event)} name="jobsite_location"
                                value={updatemyJoblist.jobsite_location}
                            />
                        </div> */}

                      

                        // <div className="form-group">
                        //     <label htmlFor="">Enter Job Site Location</label>
                        //     {/* <input type="text" className="form-control" 
                        // onChange={(event)=>jobsiteHandler(event)} name="lat"
                        // /> */}
                        //     <div className="address">
                        //         {!loadMap ? <div>Loading...</div> : <GPlace />}
                        //     </div>

                        //     <div>
                        //         <input type="hidden" id="getAddress" name="jobsite_location" onClick={(event) => updatJoblistHandler(event)} />
                        //     </div>
                        //     <div>
                        //         <input type="hidden" id="lat_id" name="lat" onClick={(event) => updatJoblistHandler(event)} />
                        //     </div>

                        //     <div>
                        //         <input type="hidden" id="lng_id" name="long" onClick={(event) => updatJoblistHandler(event)} />
                        //     </div>
                        // </div>


                        // <option value={updatemyJoblist.assigned_manager.id} selected disabled>{updatemyJoblist.assigned_manager.fullname} </option>



                        // var confirm = window.confirm('Are you sure you want to Delete?');
       
                        // if (confirm != true) {    
                        //   return false;
                        // }



                        // <div><input type="text" id="getAddress" className="form-control editlocation" name="jobsite_location" onClick={(event) => jobsiteHandler(event)} value={updatemyJoblist.jobsite_location}/></div>