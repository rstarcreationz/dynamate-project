import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";


const Jobsite = (props) => {

    // const [total, settotal] = useState('');
    // const [available, setavailable] = useState('');
    // const [onsite, setonsite] = useState('');

    useEffect(()=>{
     console.log(props)
    },[]);


    return (
        <>
            <section className="Jobsite">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12 col-lg-4">
                            {/* <div className="section-title">
                                <h3 style={{ marginBottom: "30px" }}>Available Jobsite</h3>
                            </div> */}
                            <Link to="/jobsite_view">
                            <div className="card mdcard">
                                <div className="card-body text-center">
                                   <div className="availablejobsiteleft">
                                        <h2>{(props.data.job_sites)? props.data.job_sites:0}</h2>
                                        <h4>Job Sites</h4>
                                   </div>
                                  
                                    <div className="availablejobsiteright">
                                        <button className="custom_btn changecolor">Create New</button>
                                    </div>
                                    
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                        <div className="col-md-12 col-lg-8 align-item-center">
                            <div className="card_Sec jobsitefront_card">
                          
                                <div className="row right-card">

                                <div className="col-md-4 col-lg-4">
                                    <Link to="/total_mates">
                                        <div className="card jobsite_frontcard">
                                          
                                            <div className="card-body text-center">
                                                <h3>{(props.data.total_mate? props.data.total_mate:0)}</h3>
                                                <h5>Total Mats</h5>
                                            </div>
                                            
                                        </div>
                                        </Link>
                                    </div>

                                    <div className="col-md-4 col-lg-4">
                                       <Link to="/yard_view">
                                       <div className="card jobsite_frontcard">
                                            <div className="card-body text-center">
                                                <h3>{(props.data.available_mate)? props.data.available_mate:0}</h3>
                                                <h5>Available Mats in yard</h5>
                                            </div>
                                        </div>
                                       </Link>
                                    </div>

                                    <div className="col-md-4 col-lg-4">
                                    <Link to="/mates_uses">
                                        <div className="card jobsite_frontcard">
                                           
                                            <div className="card-body text-center">
                                                <h3>{props.data.mate_in_use ? props.data.mate_in_use:0}</h3>
                                                <h5>Mats in use on Jobsite</h5>
                                            </div>
                                          
                                        </div>
                                        </Link>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mobile_Viewbtn">
                                        <Link to="/product_list" className="custom_btn">See our Products</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Jobsite;