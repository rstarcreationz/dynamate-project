import React, { useState,useEffect } from "react";
import Header from "../Header";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-bootstrap";

const YardView = () => {

    const [modal, setModal] = useState(false)
    const [Mymodal, setMyModal] = useState(false)
    const [updateModel, SetupdateModel] = useState(false)

    const [loading, setloading] = useState(false);

    const Gettoggle = () => {
        LoadJobsite();
        setModal(!modal)
        
    }

    const transferModel = () => {
        setservermesg("")
        setecategory("")
        setecondition("")
        setesite("")
        setequantity("")
        setMyModal(!Mymodal)
    }

    const updateMates = () => {
        SetupdateModel(!updateModel)
    }



    // const [total, settotal] = useState();
    const [brand_new, setbrand_new] = useState();
    const [still_good, setstill_good] = useState();
    const [onelast, setonelast] = useState();
    const [recycle, setrecycle] = useState();

  
    const [product_category, setproduct_category] = useState([]);

    const [Dropdowncategory, setDropdowncategory] = useState([]);

    const [jobsiteList, setJobsiteList] = useState([]);
  
    const [category, setcategory] = useState("");
    const [condition, setcondition] = useState("");
    const [site, setsite] = useState("");
    const [quantity, setquantity] = useState("");


    //for error 
    const [servermesg, setservermesg] = useState("");
    const [ecategory, setecategory] = useState("");
    const [econdition, setecondition] = useState("");
    const [esite, setesite] = useState("");
    const [equantity, setequantity] = useState("");



    useEffect(()=>{
        getTotalMate();
        LoadJobsite();
        
    },[])

    const [totalavailable,settotalavailable] = useState("");

    const getTotalMate = async() =>{
    //  alert('okk');
    
    var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-Type": "application/json", "Accept": "application/json" }
    };

    await axios.get('users/yard/total-available',config)
         .then(result=>{
            // console.log(result.data)
            if(result.data.status==true){
           
            //  settotal(result.data.data.total_mates_available.total_mates)
             setbrand_new(result.data.data.total_mates_available.total_brand_new)
             setstill_good(result.data.data.total_mates_available.total_still_good)
             setonelast(result.data.data.total_mates_available.total_one_last_job)
             setrecycle(result.data.data.total_mates_available.total_to_be_recycled)

             setproduct_category(result.data.data.product)
             setDropdowncategory(result.data.data.product)

             
            }else{
                settotalavailable(result.data.message)
            }
         })
         setloading(true);
    }




    const LoadJobsite = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type":"application/json"}
        };

     await axios.get('users/jobsite/list', config)
            .then(result => {
                if(result.data.status==true){
                 setJobsiteList(result.data.data.jobsite)
                    // setprojectManager(result.data.data.managers_list)
                }
                
                // alert(result.data.jobsite_name)
            });
            setloading(true);
    }


    const submitHandler= async(event)=>{
        event.preventDefault();
        
        var error = 0;
        if(category==""){
            setecategory("*Please select category.");
            error++;
        }else{
            setecategory("")
        }


        if(condition==""){
            setecondition("*Please select condition.");
            error++;
        }else{
            setecondition("")
        }


        if(site==""){
            setesite("*Please select site.");
            error++;
        }else{
            setesite("")
        }




        if(quantity==""){
            setequantity("*Please select quantity.");
            error++;
        }else if(quantity==0){
            setequantity("*Quantity should be greater than 0.");
            error++;
        }else{
            setequantity("")
        }


        if(error==0){
            // alert('oj')
            //*note this category is a id of available mate table

          var capsule ={
            "id":category,
            "quantity":quantity,
            "condition":condition,
            "job_site_id":site,
            // "Size_id":2
        
          }
        //   console.log(capsule)

       
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-Type": "application/json", "Accept": "application/json" }
        };

             await axios.post('users/yard/transfer-yard-to-site',capsule,config)
                        .then(result=>{
                        //  console.log(result) 
                          if(result.data.status==true){
                            setMyModal(!Mymodal)
                            getTotalMate();
                          }else{
                            setservermesg(result.data.message)
                          }  
                        })
        }
        
       

    }


    return (
        <>
            <Header />
            {
                loading ?
            <section className="MatDetails">
                <div className="container">
                    <div className="section-title">
                        <h3>Available Mats in your yard</h3>
                    </div>
                   
                    <div className="row">
                       
                            <div className={totalavailable ? "col-md-12" : "col-md-6"}>
                            <div className="Matcard">
                           
                                <ul className={totalavailable ? "conditionli" : null}>
                                <h5>Available mats condition</h5>
                                    <li>
                                   
                                        <div className="fourmatcard">
                                            <h4>{(brand_new)?brand_new:0}</h4>
                                            <h5>Brand New</h5>
                                        </div>
                                    </li>
                                    <li>
                                   
                                        <div className="fourmatcard">
                                            <h4>{(still_good)? still_good:0}</h4>
                                            <h5>Still Good</h5>
                                        </div>
                                    </li>
                                    <li>
                                   
                                        <div className="fourmatcard">
                                            <h4>{(onelast)? onelast:0}</h4>
                                            <h5>One Last Job</h5>
                                        </div>
                                    </li>
                                    <li>
                                    
                                        <div className="fourmatcard">
                                            <h4>{(recycle)? recycle:0}</h4>
                                            <h5>To be Recycled</h5>
                                           
                                        </div>
                                    </li>
                                </ul>
                                
                                <div className="TransferMatbtn">
                                    <Link to="/yard_view/yard_add">
                                        <button className="btn custom_btn">Add mats to yard</button>
                                    </Link>
                                </div>

                              
                                <div className="TransferMatbtn">
                                    <Link to="/yard_view/order_mat">
                                        <button className="btn custom_btn">Order new mats</button>
                                    </Link>
                                </div>

                                {/* {
                                   ! (localStorage.getItem("manager-type")==2) ? 
                                <div className="TransferMatbtn">
                                    <Link to="/yard_view/order_mat">
                                        <button className="btn custom_btn">Order new mats</button>
                                    </Link>
                                </div>
                                :
                                null
                                } */}
                              
                            </div>
                        </div>

                        {
                           ! totalavailable ?
                        <div className="col-md-5">
                            <div className="card_Sec availablematscard">
                               
                                <div className="row right-card">

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
                                    
                                    <div className="col-md-12">
                                        <h5>Product Categories</h5>
                                        
                                    {
                                        product_category.map((item,index) =>{


                                        return <Link to={"/transfer_mat_view/2/"+item.id}>
                                            <div className="card yardviewCard mt-3">
                                                <div className="card-body text-center">
                                                    <div className="card-left">
                                                        <h4>{item.total}</h4>
                                                    </div>
    
                                                    <div className="right-info">
                                                        <h4>{item.size}</h4>
                                                        <h6>{item.category_name}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                       
                                        })
                                    }
                                     </div>
                                    

                                </div>

                            </div>
                        </div>

                        :
                   null
                    }
                           
                       

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


            {/* <Modal show={Mymodal} className="jobmodal">
                <i className="fa fa-times closemodal" onClick={() => transferModel()}></i>
                <Modal.Body>

                    <form action="" method="POST" onSubmit={(event)=>submitHandler(event)}>
                    <span className="text-danger">{(servermesg)? '*'+servermesg:''}</span>
                    <div className="form-group">
                            <label htmlFor="">Select Category</label>
                            <select name="" id="" className="form-control" onClick={(e)=>setcategory(e.target.value)}>
                                <option value="1" selected disabled>--select--</option>
                                {
                                    Dropdowncategory.map((item,index) =>{
                                        return <option  value={item.id}>{item.category_name} {item.size}</option>
                                    })
                                }
                               
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{ecategory}</span>
                        </div>
                      

                        <div className="form-group">
                            <label htmlFor="">Select Condition</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setcondition(e.target.value)}>
                                <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{econdition}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Select Site</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setsite(e.target.value)}>
                                <option value="1" selected disabled>--select--</option>
                                {
                                    jobsiteList.map((item,index) =>{
                                        return <option value={item.id}>{item.jobsite_name}</option>
                                    })
                                }
                              
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{esite}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="0" className="form-control" value={quantity} onChange={(e)=>setquantity(e.target.value)}/>
                            <span className="text-danger">{equantity}</span>
                        </div>

                        <div className="form-group Matsite">
                            <button type="submit" className="custom_btn" >Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal> */}


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

export default YardView;




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