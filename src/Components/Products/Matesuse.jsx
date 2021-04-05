import React, { useState,useEffect } from "react";
import Header from "../Header";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import {Spinner} from "react-bootstrap";

const Matesuse = () => {

    const [modal, setModal] = useState(false)
    const [Mymodal, setMyModal] = useState(false)
    const [updateModel, SetupdateModel] = useState(false)
    const [loading, setloading] = useState(false);

    const Gettoggle = () => {
        setModal(!modal)
    }

    const transferModel = () => {
        setMyModal(!Mymodal)
    }

    const updateMates = () => {
        SetupdateModel(!updateModel)
    }



      const [totaluse, settotaluse] = useState();
      const [jobsitedata, setjobsitedata] = useState([]);
   
    const [errorMSG,seterrorMSG] = useState("");

   
       useEffect(()=>{
           getTotalMate();
       },[])
   
       const getTotalMate = async() =>{
      
       var token = localStorage.getItem('user-token');
       const config = {
           headers: { "Authorization":"Bearer "+token,"Content-Type": "multipart/form-data", "Accept": "application/json" }
       };
       await axios.get('users/yard/mates-on-site',config)
            .then(result=>{
            //    console.log(result.data.data.jobsite)
               if(result.data.status==true){
                 
                 settotaluse(result.data.data.mate_in_use);
                 setjobsitedata(result.data.data.jobsite)
                //  setjobsitedata(result.data.data.jobsite)
                //  setproduct_category(result.data.data.product)
               }else{
                seterrorMSG(result.data.message);
               }
            })
            setloading(true);
       }

    return (
        <>
            <Header />
            {
            loading ? 
            <section className="MatDetails">
                <div className="container">
                    <div className="section-title">
                        <h3>Total mats in your yard</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                               ! errorMSG ? 

                                <div className="Matcard Mats_in_use">
                           
                                <ul className="pb-5">
                                <h5>Mats in use - <span style={{fontSize:"28px"}} >{totaluse}</span> </h5>
                                
                                    {
                                        jobsitedata.map((item,index) =>{

                                            return <li>
                                                 <Link to={"/jobsite_detail/"+item.jobsite_id}>
                                            <div class="mates_useCard">

                                                <div class="card-img">
                                                    <h4 className="totalmateview"> <span>Total Mats - </span>{item.total.total_mates}</h4>
                                                   
                                                        <h5>{item.jobsite_name}</h5>
                                                    
                                                    <p>{item.jobsite_location}</p>
                                                </div>
                                              
                                            </div>
                                            </Link>
                                        </li>


                                        })
                                    }
                                   
                                  
                                </ul>

                              
                            </div>

                                :
                                <div className="noproductserror">
                                    <h5>Mates Not Available !</h5>
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
            <Modal show={modal} className="jobmodal">
                <i className="fa fa-times closemodal" onClick={() => Gettoggle()}></i>
                <Modal.Body>
                    <form action="" method="POST">
                        <div className="form-group">
                            <label htmlFor="">Select Condition</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">New Mats</option>
                                <option value="2">Old Mats</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group Matsite">
                            <button type="button" className="custom_btn" > Add</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={Mymodal} className="jobmodal">
                <i className="fa fa-times closemodal" onClick={() => transferModel()}></i>
                <Modal.Body>
                    <form action="" method="POST">

                    <div className="form-group">
                            <label htmlFor="">Select Category</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">Trade mat 10X15</option>
                                <option value="2">Traditional mat 10X15</option>
                                <option value="2">Sidewall mat 10X15</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Select Condition</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">Brand new</option>
                                <option value="2">Still good</option>
                                <option value="2">One last job</option>
                                <option value="2">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Select Site</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">Cottingham</option>
                                <option value="2">Oxfordshire</option>
                                <option value="2">Kidlington</option>
                                <option value="2">Horsforth</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group Matsite">
                            <button type="button" className="custom_btn" >Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={updateModel} className="jobmodal">
                <i className="fa fa-times closemodal" onClick={() => updateMates()}></i>
                <Modal.Body>
                    <form action="" method="POST">

                        <div className="form-group">
                            <label htmlFor="">From</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">New Mats</option>
                                <option value="2">Old Mats</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">To</label>
                            <select name="" id="" className="form-control">
                                <option value="1" selected disabled>--select--</option>
                                <option value="2">first</option>
                                <option value="2">second</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group Matsite">
                            <button type="button" className="custom_btn" >Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Matesuse;




// <div className="col-md-8">
// <div className="card_Sec">
//     <h5>In your yard</h5>
//     <div className="row right-card">

//         <div className="col-md-4">
//            <Link to="/Dynamate/yard_view">
//            <div className="card">
//                 <div className="card-body text-center">
//                     <h3>200</h3>
//                     <h5>Available Mates</h5>
//                 </div>
//             </div>
//            </Link>
//         </div>

//         <div className="col-md-4">
//         <Link to="/Dynamate/yard_view">
//             <div className="card">

//                 <div className="card-body text-center">
//                     <h3>100</h3>
//                     <h5>Mates in use</h5>
//                 </div>

//             </div>
//             </Link>
//         </div>

//         <div className="col-md-4">
//         <Link to="/Dynamate/yard_view">
//             <div className="card">

//                 <div className="card-body text-center">
//                     <h3>100</h3>
//                     <h5>Mates on sites</h5>
//                 </div>

//             </div>
//             </Link>
//         </div>


//         <div className="col-md-6">
//             <div className="mobile_Viewbtn">
//             <Link to="/Dynamate/product_list" className="custom_btn">See our Products</Link>
//             </div>
//         </div>

//     </div>

// </div>
// </div>


 {/* <div className="col-md-8 offset-md-2">
                                       <Link to="/Dynamate/yard_view">
                                       <div className="card">
                                            <div className="card-body text-center">
                                                <h3>200</h3>
                                                <h5>Total Mates</h5>
                                            </div>
                                        </div>
                                       </Link>
                                    </div> */}