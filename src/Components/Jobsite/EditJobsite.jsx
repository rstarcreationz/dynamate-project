// import React, { useState } from "react";
// import Header from "../Header";
// import {useHistory, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import axios from 'axios';
// import GPlace from './GPlace';

// // API key of the google map
// const GOOGLE_MAP_API_KEY = 'AIzaSyAUNEwfwKoOYx0gym6UVffBvUoZrazUUxc';

// // load google map script
// const loadGoogleMapScript = (callback) => {
//     if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
//         callback();
//     } else {
//         const googleMapScript = document.createElement("script");
//         googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
//         window.document.body.appendChild(googleMapScript);
//         googleMapScript.addEventListener("load", callback);
//     }
// }

// const EditJobsite = () => {

//     /// api for edit joblist
//     const { id } = useParams();
//     const EditMyJobsite = () => {

//         const token = localStorage.getItem('user-token');
//         const config = {
//             headers: { Authorization: `Bearer ` + token, "Accept": "application/json", 'Content-Type': 'application/json' }
//         };

//         axios.post('users/jobsite/edit', { id: id }, config)
//             .then(result => {
//                 setUpdateJoblist(result.data)
//                 console.log("editjobsite", result.data)
//             });
//     }


//     /// state for update joblist
//     let history = useHistory();
//     const [updatemyJoblist, setUpdateJoblist] = useState({
//         id: "",
//         jobsite_name: "",
//         lat: "",
//         long: "",
//         assigned_project_manager: "",
//         start_date: "",
//         expected_completion_date: ""
//     })

//     // onchange for update manager
//     const updatJoblistHandler = (event) => {
//         setUpdateJoblist({ ...updatemyJoblist, [event.target.name]: event.target.value })
//         console.log(event.target.value);
//     }

//     /// api for update joblist
//     const UpdateJoblist = async () => {
//         // event.preventDefault();
//         const token = localStorage.getItem('user-token');

//         axios.post('users/jobsite/update', updatemyJoblist, {
//             headers: {
//                 Authorization: `Bearer ` + token,
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//             }
//         })

//             .then(response => {
//                 console.log(response.data);
//                 console.log(response);
//                 return response;

//             })
//             .catch(error => {
//                 if (error) {
//                     console.log("Sorry.....Error");
//                 }
//             });
//         history.push('/Dynamate/jobsite_view')
//     }

//     const [loadMap, setLoadMap] = useState(false);

//     useEffect(() => {
//         loadGoogleMapScript(() => {
//             setLoadMap(true)
//             EditMyJobsite();
//             UpdateJoblist();
//         });
//     }, []);

//     return (
//         <>
//             <Header />|


//             <section className="jobmodal jobsiteModal">
//                 <div className="container">
//                     <div className="section-title">
//                         <h3>Edit Jobsite </h3>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 mb-5">
//                             <form action="" method="" onSubmit={(event) => UpdateJoblist(event)}>

//                                 <input type="hidden" class="form-control"
//                                     onChange={(event) => updatJoblistHandler(event)} name="id"
//                                     value={updatemyJoblist.id}
//                                 />
//                                 <div className="form-group">
//                                     <label htmlFor="">Enter Job Site Name</label>
//                                     <input type="text" className="form-control"
//                                         onChange={(event) => updatJoblistHandler(event)} name="jobsite_name"
//                                         value={updatemyJoblist.jobsite_name}
//                                     />
//                                 </div>

//                                 <div className="form-group">
//                                     <label htmlFor="">Enter Job Site Location</label>
//                                     {/* <input type="text" className="form-control"
//                                         onChange={(event) => updatJoblistHandler(event)} name="jobsite_address"
//                                         value={updatemyJoblist}
//                                     /> */}

//                             <div className="address">
//                                 {!loadMap ? <div>Loading...</div> : <GPlace />}
//                             </div>
//                             <div><input type="button" id="lat_id" name="lat" onClick={(event) => updatJoblistHandler(event)} /></div>
//                             <div><input type="button" id="lng_id" name="long" onClick={(event) => updatJoblistHandler(event)} /></div>
//                          </div>

//                                 <div className="form-group">
//                                     <label htmlFor="">Assign Project Manager</label>
//                                     <select id="projectManager" className="form-control" onChange={(event) => updatJoblistHandler(event)} name="assigned_project_manager">
//                                         <option value={updatemyJoblist} selected disabled>--select--</option>
//                                         <option value="Michael">Michael</option>
//                                         <option value="Andrew">Andrew</option>
//                                     </select>
//                                     <i className="fa fa-angle-down"></i>
//                                 </div>

//                                 <div className="form-group">
//                                     <label htmlFor="">Starting date</label>
//                                     <input type="date" className="form-control"
//                                         onChange={(event) => updatJoblistHandler(event)} name="start_date"
//                                         value={updatemyJoblist}
//                                     />
//                                 </div>

//                                 <div className="form-group">
//                                     <label htmlFor="">Expected completion date</label>
//                                     <input type="date" className="form-control"
//                                         onChange={(event) => updatJoblistHandler(event)} name="expected_completion_date"
//                                         value={updatemyJoblist}
//                                     />
//                                 </div>


//                                 <div className="form-group Matsite">
//                                     <button type="submit" className="custom_btn" > Create </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//         </>
//     );
// }

// export default EditJobsite;




