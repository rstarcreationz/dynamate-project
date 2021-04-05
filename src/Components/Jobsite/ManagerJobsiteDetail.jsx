import React, { useState } from "react";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { useEffect } from "react";
import { MDBAlert } from 'mdbreact';

const ManagerJobsiteDetail = () => {

    const { id } = useParams();
    const [jobsiteList, setJobsiteList] = useState([]);
    const [productdata, setproductdata] = useState([])



    const [transferallerr, settransferallerr] = useState("")

    
    useEffect(() => {
        LoadJobsite();
    }, [])


    ///// transfer all mate to yard ////

    const [matetoggle, setmatetoggle] = useState(false)

    const transferallmate = () => {
        setmatetoggle(!matetoggle)
    }

    ///// transfer all mate to yard ////


    const [jobsiteid, setjobsiteid] = useState("")
    // const [categoryid, setcategoryid] = useState("")

    const Transferall = async() =>{

        var token = localStorage.getItem('user-token');
    const config = {
        headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
    };
    var capsule = {
        "jobsite_id":jobsiteid,
    }

       await axios.post('users/jobsite/return-all-to-yard',capsule, config )
       .then(result=>{
       if(result.data.status==true){
        transferallmate();
        LoadJobsite();
       }else{
        settransferallerr(result.data.message)
       }
       })
    }


    //// jobsite list view ////

    const LoadJobsite = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", }
        }; 

        axios.get('users/home', config)
            .then(result => {
                if (result.data.status == true) {
                    setJobsiteList(result.data.data.jobsite)
                    setproductdata(result.data.data.product)
                    setjobsiteid(result.data.data.jobsite.id)
                }
            });
    }

   



    return (
        <>
            <Header />
            <section className="jobsite_Detail">
                <div className="container">
                    <div className="section-title">
                        <h3>Jobsite Details</h3>
                    </div>
                    <div className="row boxborder">

                    {
                        transferallerr ?
                        <div className="row mb-3">
                        <div className="col-md-6 offset-md-3">
                            <MDBAlert className="alert alert-danger" color="warning" dismiss>
                            <strong>{transferallerr}</strong>
                        </MDBAlert >
                            </div>
                        </div>
                        :
                        null
                    }

                        <div className="col-md-6">
                            <div className="jobsite jobdetailremove" style={{border:"none"}}>
                                <h5>Mats on sites</h5>
                                <div className="row right-card">

                                    {
                                        productdata.map((item, key) => {
                                            return <div className="col-md-12">

                                                <Link to={"/transfer_mat_view/3/" + item.product_id}>
                                                    <div className="card">
                                                        <div className="card-body text-center">
                                                            <div className="card-left">
                                                                <h4>{item.total}</h4>
                                                            </div>

                                                            <div className="right-info">
                                                                <h4>{item.size}</h4>
                                                                <h6>{item.category_name}</h6>
                                                            </div>
                                                            <div className="jobicon">
                                                                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 rightmap">


                            <div className="job-info">
                                <div className="row border-bottom">
                                    <div className="col-md-8">
                                        <h6>Site name</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <p>{jobsiteList.jobsite_name}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-md-8">
                                        <h6>Project manager</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <p>{(jobsiteList.assigned_manager) ? jobsiteList.assigned_manager : "Not assigned"}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-md-8">
                                        <h6>Estimated completion date</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <p>{jobsiteList.expected_completion_date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="Matsite">
                                {/* <Link to="/yard_view/order_mat">
                                <button type="button"
                                className="custom_btn"> Order New Mats </button>
                                </Link> */}
                                {/* <button type="button"  variant="primary" 
                                className="custom_btn" onClick={()=>Gettoggle()}> Order New Mats </button> */}
                                <button type="button" className="custom_btn" onClick={()=>transferallmate()} style={{ margin: "10px auto", flaot: "none" }}> Return all to yard </button>

                                
                            </div>

                        </div>
                    </div>
                </div>
            </section>
              {/* ///////// transfer all mats to yard //////////// */}

        <Modal show={matetoggle} className="logoutPopup">
            <Modal.Body>
                <div className="messagelogout">
                    <h5>Are you sure you want to transfer all mat to yard</h5>
                </div>
                <div className="logout_confirm">
                    <span onClick={()=>transferallmate(!matetoggle)}>Cancel</span>
                    <span onClick={()=>Transferall()}>
                    yes
                    </span>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default ManagerJobsiteDetail;