import React, { useState, Fragment } from "react";
import Header from "../Header";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { MDBAlert } from 'mdbreact';
import {Spinner} from "react-bootstrap";

const JobsiteDetail = () => {

    const [allmates ,setallmates] = useState(1);
    const [choosemats ,setchoosemats] = useState(1);

    const allmateshandle = () =>{
        setallmates(0)
        setchoosemats(0)
    }

    const choosehandle = () =>{
        setchoosemats(!choosemats)
        setallmates(1)
    }

    const {id}  = useParams();
    const [jobsiteList, setJobsiteList] = useState([]);

    const [detailstab, setdetailstab] = useState("");


    const [productdata, setproductdata] = useState([])
    

    const [siteList, setsiteList] = useState([])


    const [product, setproduct] = useState("")
    const [site, setsite] = useState("")
    const [quantity, setquantity] = useState("")
    const [condition, setcondition] = useState("")
    const [loading, setloading] = useState(false);

    // for error 
    const [eproduct, seteproduct] = useState("")
    const [esite, setesite] = useState("")
    const [equantity, setequantity] = useState("")
    const [econdition, setecondition] = useState("")

    // const [modal, setModal] = useState(false)
    const [Mymodal, setMyModal] = useState(false)

    ////tranfer all mate error msg 
    const [transferallerr, settransferallerr] = useState("")
    // const [tranferallmateserr, settranferallmateserr] = useState("")
    
    ///// transfer all mate to yard ////
    const [matetoggle, setmatetoggle] = useState(false)

    const transferallmate = () => {
        //alert(3)
        setdetailstab(3)
        setmatetoggle(!matetoggle)
        settransferallerr("")
        setbrand_new("");
        setstill_good("");
        setonelast("");
        setrecycle("");
        setchoosemats(0)
        setallmates(0)
    }

    const [transferalltoyard, settransferalltoyard] = useState("")
    const Transferall = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };
        var capsule = {
            "jobsite_id": transferalltoyard
        }

        await axios.post('users/jobsite/return-all-to-yard', capsule, config)
            .then(result => {
                if (result.data.status == true) {
                    transferallmate();
                    LoadJobsite();
                    setchoosemats(0)
                    setallmates(0)

                } else {
                    settransferallerr(result.data.message)
                }
            })
    }


    ///////////// google map api integration ///////////////

    const [viewMap, setviewMap] = useState([]);
    
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyBqk_v1Hd9dIvch84SXEUg5ngWTe4JB-wA"
    });

   
    const mapStyles = {
        height: "220px",
        width: "370px",
        display: "block"
    };

    const defaultCenter = {
        lat: parseFloat(viewMap.lat), lng: parseFloat(viewMap.long)
    }
    console.log(defaultCenter)


    ///////

    const transferModel = () => {
        setdetailstab(3)
        setMyModal(!Mymodal)

        setproduct("")
        setquantity("")
        setsite("")
        setcondition("")


        setservermessage("")
        seteproduct("")
        setequantity("")
        setesite("")
        setecondition("")

        setbrand_new("");
        setstill_good("");
        setonelast("");
        setrecycle("");
    }

    useEffect(() => {
        LoadJobsite();
        LoadMatesfromyard();
        singleMatDetails();
    }, [])

    //// jobsite list view ////

    const [productid,setproductid] = useState("")
    const LoadJobsite = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };

        await axios.post('users/jobsite/details', { jobsite_id: id }, config)
            .then(result => {
                if (result.data.status == true) {
                    setJobsiteList(result.data.data.jobsite)
                    setproductdata(result.data.data.product)
                    setsiteList(result.data.data.jobsiteDropdown)
                    setviewMap(result.data.data.jobsite)
                    settransferalltoyard(result.data.data.jobsite.id)
                    setproductid(result.data.data.product.product_id)
                    setloading(true);
                }

            });
            console.log(productid)
    }

   


    //       console.log(map);
    //   console.log(google); 



    const [servermessage, setservermessage] = useState("")
    const transferHandler = async () => {
        // alert("ok")
        var error = 0;

        if (product == "") {
            seteproduct("*Please select category.");
            error++;
        } else {
            seteproduct("");
        }

        if (site == "") {
            setesite("*Please select site.");
            error++;
        } else {
            setesite("");
        }



        if (quantity == "") {
            setequantity("*Please enter quantity.");
            error++;
        } else if (quantity == 0) {
            setequantity("*Quantity should be greater than zero.");
            error++;
        } else {
            setequantity("");
        }


        if (condition == "") {
            setecondition("*Please select condition.");
            error++;
        } else {
            setecondition("");
        }



        if (error == 0) {

            var capsule = {
                "product_id": product,
                "from_jobsite_id": id,
                "to_jobsite_id": site,
                "quantity": quantity,
                "condition": condition
            }
            console.log(capsule)

            var token = localStorage.getItem('user-token');
            const config = {
                headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
            };

            await axios.post('users/jobsite/transfer-to-another-site', capsule, config)
                .then(result => {
                    if (result.data.status == true) {
                        LoadJobsite()
                        setMyModal(!Mymodal)
                    } else {
                        setservermessage(result.data.message)
                    }
                    console.log(result)
                })
        }

    }

    ////// get mates from yard /////
    const [yardmodal, setyardmodal] = useState(false)
    const getMates = () => {
        setdetailstab(2)
        setyardmodal(!yardmodal)
        setgetmateserr("");
        setbrand_new("");
        setstill_good("");
        setonelast("");
        setrecycle("");
    }


    //////// get mates from yard 

    const [getmatesfromyard, setgetmatesfromyard] = useState([])

    const LoadMatesfromyard = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json" }
        };

        await axios.get('users/yard/total-available', config)
            .then(result => {
                if (result.data.status == true) {
                    setgetmatesfromyard(result.data.data.product)
                }
            });

    }


    //////// get mates from yard 

    const [CategoryId, setCategoryId] = useState("")
    const [matesquantity, setmatesquantity] = useState("")
    const [matescondition, setmatescondition] = useState("")
    //// error message for get mates from yard
    const [getmateserr, setgetmateserr] = useState("")

    const PostMatesfromyard = async () => {
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };

        var capsule = {
            condition: matescondition,
            id: CategoryId,
            job_site_id: id,
            quantity: matesquantity
        }

        await axios.post('users/yard/transfer-yard-to-site', capsule, config)
            .then(result => {
                if (result.data.status == true) {
                    LoadMatesfromyard();
                    LoadJobsite();
                    getMates();
                } else {
                    setgetmateserr(result.data.message)
                }
            });

    }

    /////////// single mats details
        const [brand_new,setbrand_new] = useState("")
        const [still_good,setstill_good] = useState("")
        const [onelast,setonelast] = useState("")
        const [recycle,setrecycle] = useState("")

        const singleMatDetails = (e)=>{
            setCategoryId(e)
            setallmatescategory(e)
            setproduct(e)
            var token = localStorage.getItem('user-token');
            const config = {
                headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
            };
        
            axios.post('users/yard/single-mates-details',{tab_id: detailstab,mate_id:e,jobsite_id: id}, config)
            .then(result=>{
                if(result.data.status==true)
                {
                    setbrand_new(result.data.data.product.brand_new);
                    setstill_good(result.data.data.product.still_good);
                    setonelast(result.data.data.product.one_last_job);
                    setrecycle(result.data.data.product.to_be_recycled);
                    LoadJobsite();
                }
                
            })
            
            }
    
            ////// transfer all mates state and api

            const [allmatescategory, setallmatescategory] = useState("")
            const [allmatescondition, setallmatescondition] = useState("")
            const [allmatesquantity, setallmatesquantity] = useState("")

            const choosesubmit = async () => {

                var token = localStorage.getItem('user-token');
                const config = {
                    headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
                };
                var capsule = {
                    "jobsite_id":id,
                    "mat_id":allmatescategory,
                    "condition":allmatescondition,
                    "quantity":allmatesquantity

                }
        
                await axios.post('users/jobsite/return-to-yard-single', capsule, config)
                    .then(result => {
                        if (result.data.status == true) {
                            transferallmate();
                            LoadJobsite();
                        } else {
                            settransferallerr(result.data.message)   
                        }
                    })
            }

    return (
        <>
            <Header />
            {
                loading ?
                <section className="jobsite_Detail">
                <div className="container">
                    <div className="section-title">
                        <h3>Jobsite Details</h3>
                    </div>

                    <div className="row boxborder">
                        <div className="col-md-12">
                            <div className="jobsite jobdetailremove" style={{ border: "none" }}>
                                <h5>Mats on sites</h5>
                                <div className="row right-card">

                                    {
                                        productdata ?

                                            productdata.map((item, key) => {
                                                return (
                                                    <div key={key} className="col-md-6 col-lg-4">

                                                        <Link to={"/transfer_mat_view/3/" + (item.product_id)}>
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
                                                )

                                            })


                                            :
                                            null
                                    }



                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 mt-3">
                            <div className="map_View">
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
                            

                                
                            </div>

                            <div className="job-info">
                                <div className="row border-bottom">
                                    <div className="col-sm-8 col-md-8">
                                        <h6>Site name</h6>
                                    </div>
                                    <div className="col-sm-4 col-md-4">
                                        <p>{jobsiteList.jobsite_name}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-sm-8 col-md-8">
                                        <h6>Project manager</h6>
                                    </div>
                                    <div className="col-sm-4 col-md-4">
                                        <p>{(jobsiteList.assigned_manager) ? jobsiteList.assigned_manager : "Not assigned"}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-sm-8 col-md-8">
                                        <h6>Estimated completion date</h6>
                                    </div>
                                    <div className="col-sm-4 col-md-4">
                                        <p>{jobsiteList.expected_completion_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="Matsite MultipleBtn">
                                {
                                  ! productdata.length==0 ? 
                                   <>
                                    <button type="button" className="custom_btn" onClick={() => transferModel()}> Transfer mats to another site </button>
                                    <button type="button" className="custom_btn" onClick={() => transferallmate()}>Transfer mats to yard</button>
                                     </>
                                     :
                                     null
                                    }

                                    <Link to="/yard_view/order_mat">
                                    <button type="button"
                                        className="custom_btn"> Order new mats </button>
                                    </Link>
                                     <button type="button" className="custom_btn" onClick={() => getMates()}> Get mats from yard</button>
                                   
                                   
                                
                            </div>
                        </div>

                    </div>
                </div>
            </section>
                :
                <div className="normalspinner">
                <Spinner animation="border"></Spinner>
            </div>
            }
           

            {/* ////// transfer mat to another site ///// */}

            <Modal show={Mymodal} className="jobmodal">
               <div className="closemodal" onClick={() => transferModel()}>
               <i className="fa fa-times"></i>
               </div>
                <Modal.Body>
                {
                        servermessage ?
                            <MDBAlert className="alert alert-danger" color="warning">
                                <strong style={{fontSize:"12px"}}>{servermessage}</strong>
                            </MDBAlert >
                            :
                            null
                    }

                    <form action="" method="POST">
                        <div className="form-group">
                            <label htmlFor="">Select category</label>
                            <select name="" id="" className="form-control" onChange={(e) => singleMatDetails(e.target.value)}>
                                <option value="" selected disabled>--select--</option>

                                {
                                    productdata.map((item, key) => {
                                        return <option key={key} value={item.product_id}>{item.category_name}&nbsp;({item.size})</option>
                                    })
                                }

                                {/* <option value="2">Trade mats 10x15</option>
                            <option value="2">Trade mats 10x12</option> */}
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{eproduct}</span>
                        </div>
                        

                        <div className="form-group modaltable">
                               <table className="table">
                                   <thead className="thead-dark">
                                   <th>Brand new</th>
                                   <th>Still good</th>
                                   <th>One last job</th>
                                   <th>To be recycled</th>
                                   </thead>

                                   <tbody>
                                        <tr>
                                            <td>{brand_new ? brand_new : "0"}</td>
                                            <td>{still_good ? still_good : "0"}</td>
                                            <td>{onelast ? onelast : "0"}</td>
                                            <td>{recycle ? recycle : "0"}</td>
                                        </tr>
                                   </tbody>
                                   
                               </table>
                            </div>
                        

                        <div className="form-group">
                            <label htmlFor="">Select site</label>
                            <select name="" id="" className="form-control" onChange={(e) => setsite(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                {
                                    siteList.map((item, key) => {
                                        return <option value={item.id}>{item.jobsite_name}</option>
                                    })
                                }
                                {/* <option value="2">Cottingham</option>
                            <option value="2">Oxfordshire</option>
                            <option value="2">Horsforth</option>
                            <option value="2">Kidlington</option> */}
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{esite}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="1" className="form-control" value={quantity} onChange={(e) => setquantity(e.target.value)} />
                            <span className="text-danger">{equantity}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Select condition</label>
                            <select name="" id="" className="form-control" onChange={(e) => setcondition(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{econdition}</span>
                        </div>

                        <div className="form-group Matsite">
                            {/* <Link to="/transfer_mat_view"> */}
                            <button type="button" className="custom_btn" onClick={transferHandler}>Add Mates</button>
                            {/* </Link> */}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>



            {/* /////// get mates from yard //// */}

            <Modal show={yardmodal} className="jobmodal">
            <div className="closemodal" onClick={() => getMates()}>
            <i className="fa fa-times"></i>
               </div>
              
                <Modal.Body>
                    {
                        getmateserr ?
                            <MDBAlert className="alert alert-danger" color="warning">
                                <strong style={{fontSize:"12px"}}>{getmateserr}</strong>
                            </MDBAlert >
                            :
                            null
                    }
                    <form action="" method="POST">
                        <div className="form-group">
                            <label htmlFor="">Select mats</label>
                            <select name="" id="" className="form-control" onChange={(e) => singleMatDetails(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                {
                                    getmatesfromyard.map((item, key) => {
                                        return <option key={key} value={item.id}>{item.category_name}&nbsp;({item.size}) </option>

                                    })
                                }

                            </select>
                            <i className="fa fa-angle-down"></i>

                        </div>
                        
                        <div className="form-group modaltable">
                               <table className="table">
                                   <thead className="thead-dark">
                                   <th>Brand new</th>
                                   <th>Still good</th>
                                   <th>One last job</th>
                                   <th>To be recycled</th>
                                   </thead>

                                   <tbody>
                                        <tr>
                                            <td>{brand_new ? brand_new : "0"}</td>
                                            <td>{still_good ? still_good : "0"}</td>
                                            <td>{onelast ? onelast : "0"}</td>
                                            <td>{recycle ? recycle : "0"}</td>
                                        </tr>
                                   </tbody>
                                   
                               </table>
                            </div>

                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="1" className="form-control" onChange={(e) => setmatesquantity(e.target.value)} />
                        </div>

                      

                        <div className="form-group">
                            <label htmlFor="">Select condition</label>
                            <select name="" id="" className="form-control" onChange={(e) => setmatescondition(e.target.value)} >
                                <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                        <div className="form-group Matsite">
                            <button type="button" className="custom_btn" onClick={() => PostMatesfromyard()}>Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


            {/* //////// transfer all mates new modal ///////// */}
           
             <Modal show={matetoggle} className="jobmodal">
            <div className="closemodal" onClick={() => transferallmate()}>
            <i className="fa fa-times"></i>
               </div>
              
                <Modal.Body>
                    
                    {
                        transferallerr ?
                            <MDBAlert className="alert alert-danger" color="warning">
                                <strong style={{fontSize:"12px"}}>{transferallerr}</strong>
                            </MDBAlert >
                            :
                            null
                    }

                   

                    <div className="form-group">

                    {/* <label className="customradio mr-5">
                        <input className="mr-2" type="radio" name="mats" id={allmates}
                        onClick={()=>allmateshandle()}/><span class="checkmark"></span>
                        Transfer all mats
                    </label>

                    <label className="customradio">
                        <input className="mr-2" type="radio" name="mats" id={choosemats} onClick={()=>choosehandle()} /><span class="checkmark"></span>
                        Choose mats
                    </label> */}

                    <label className="customradio mr-5">
                        <input className="mr-2" type="radio" name="mats" id={allmates}
                        onClick={()=>allmateshandle()}/><span class="checkmark"></span>
                        Transfer all mats
                    </label>

                    <label className="customradio">
                        <input className="mr-2" type="radio" name="mats" id={choosemats} onClick={()=>choosehandle()} /><span class="checkmark"></span>
                        Choose mats
                    </label>

                    </div>
                    
                
                    <form action="" method="POST" className={ choosemats==1 ? "showfield" :  "hidefield"}>
                        <div className="form-group">
                            <label htmlFor="">Select mats</label>
                            <select name="" id="" className="form-control" onChange={(e) => singleMatDetails(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                {
                                    productdata.map((item, key) => {
                                        return <option key={key} value={item.product_id}>{item.category_name}&nbsp;({item.size})</option>

                                    })
                                }

                            </select>
                            <i className="fa fa-angle-down"></i>

                        </div>
                        
                        <div className="form-group modaltable">
                               <table className="table">
                                   <thead className="thead-dark">
                                   <th>Brand new</th>
                                   <th>Still good</th>
                                   <th>One last job</th>
                                   <th>To be recycled</th>
                                   </thead>

                                   <tbody>
                                       <tr>
                                           <td>{brand_new ? brand_new : "0"}</td>
                                           <td>{still_good ? still_good : "0"}</td>
                                           <td>{onelast ? onelast : "0"}</td>
                                           <td>{recycle ? recycle : "0"}</td>
                                       </tr>
                                   </tbody>
                                   
                               </table>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Select condition</label>
                            <select name="" id="" className="form-control" onChange={(e) => setallmatescondition(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                        </div>

                    
                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="1" className="form-control" onChange={(e) => setallmatesquantity(e.target.value)}/>
                        </div>


                        <div className="form-group Matsite">
                            <button type="button" className="custom_btn"  onClick={() => choosesubmit()}>Submit</button>
                        </div>
                    </form>
                   
                    <form action="" method="POST" className={allmates==1 ? "hidefield" : "showfield"}>
                    <div className="form-group Matsite">
                            <button type="button" className="custom_btn" onClick={() => Transferall()}>Submit</button>
                        </div>
                    </form> 
                    

                </Modal.Body>
            </Modal>

                


            {/* ///////// transfer all mats to yard //////////// */}

            {/* <Modal show={matetoggle} className="logoutPopup">
                <Modal.Body>
                    {
                        transferallerr ?
                                    <MDBAlert className="alert alert-danger custom-alert" color="warning">
                                        <strong>{transferallerr}</strong> &nbsp; <b style={{cursor:"pointer"}} onClick={() => transferallmate(!matetoggle)}> X </b>
                                    </MDBAlert >
                            :
                            null
                    }
                    <div className="messagelogout">
                        <h5>Are you sure you want to transfer mat to yard</h5>
                    </div>
                    <div className="logout_confirm">
                        <span onClick={() => transferallmate(!matetoggle)}>Cancel</span>
                        <span onClick={() => Transferall()}>
                            yes
                    </span>
                    </div>
                </Modal.Body>
            </Modal> */}




        </>
    );
}

export default JobsiteDetail;




// const LoadJobsite = async () => {

//     ///// new code here ///////
//     const token = localStorage.getItem('user-token');
//     axios.get('users/jobsite/list',  {id:id}, jobsiteList, {
//         headers: {
//             Authorization: `Bearer ` +  token,
//             'Accept': 'application/json, text/plain, */*',
//         }
//     })

//         .then(result => {
//            setJobsiteList(result.data.data.jobsite)

//         })
//         .catch(error => {
//             if (error) {
//                 console.log("Sorry.....Error");
//             }
//         });
// }


