import React, { useState,useEffect } from "react";
import Header from "../Header";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import {Spinner} from "react-bootstrap";



const Totolmates = () => {

   
    const [modal, setModal] = useState(false)
    const [Mymodal, setMyModal] = useState(false)
    const [updateModel, SetupdateModel] = useState(false)

    const Gettoggle = () => {
        setModal(!modal)
    }

    const transferModel = () => {
        setMyModal(!Mymodal)
    }

    const updateMates = () => {
        SetupdateModel(!updateModel)
    }

    const [total, settotal] = useState();
    const [brand_new, setbrand_new] = useState();
    const [still_good, setstill_good] = useState();
    const [onelast, setonelast] = useState();
    const [recycle, setrecycle] = useState();


    const [product_category, setproduct_category] = useState([]);

    const [loading, setloading] = useState(false);

    useEffect(()=>{
        
      
        getTotalMate();
    },[])

    const [ errortotalmates,seterrortotalmates ] = useState('');
    const getTotalMate = async() =>{
    
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json"}
        };

    await axios.get('users/yard/total-mates', config)
         .then(result=>{
             if(result.data.status==true){
             console.log(result.data.data.product)
             settotal(result.data.data.total_mates.total_mates)
             setbrand_new(result.data.data.total_mates.total_brand_new)
             setstill_good(result.data.data.total_mates.total_still_good)
             setonelast(result.data.data.total_mates.total_one_last_job)
             setrecycle(result.data.data.total_mates.total_to_be_recycled)

             setproduct_category(result.data.data.product)
             }else{
                 seterrortotalmates(result.data.message);
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
                            <h3>Total Mats</h3>
                        </div>
                        {
                            ! errortotalmates ?
                            <div className="row">
    
                            <div className="col-md-12">
                                <div className="Matcard totalmatcard">
                               
                                    <ul className="pb-5">
                                    <h5>Total Mats</h5>
                                    <h4>{total}</h4>
                                        <li>
                                       
                                            <div className="fourmatcard">
                                                <h4>{(brand_new)? brand_new:0}</h4>
                                                <h5>Brand New</h5>
                                            </div>
                                        </li>
                                        <li>
                                       
                                            <div className="fourmatcard">
                                                <h4>{(still_good)?still_good:0}</h4>
                                                <h5>Still Good</h5>
                                            </div>
                                        </li>
                                        <li>
                                       
                                            <div className="fourmatcard">
                                                <h4>{(onelast)?onelast:0}</h4>
                                                <h5>One Last Job</h5>
                                            </div>
                                        </li>
                                        <li>
                                        
                                            <div className="fourmatcard">
                                                <h4>{(recycle?recycle:0)}</h4>
                                                <h5>To be Recycled</h5>
                                               
                                            </div>
                                        </li>
                                    </ul>
    
                                   
                                </div>
                            </div>
    
                            <div className="col-md-12">
                                <div className="card_Sec">
                                   
                                    <div className="row right-card">
    
                                      
    
                                        <div className="col-md-12 mt-5">
                                             <h5>Product Categories</h5>
    
                                    <ul className="totalmatescard mt-3">
                                        {
                                            product_category.map((item,index)=>{                                        
                                             return <li>
                                                <Link to={'/transfer_mat_view/1/'+item.id}>
                                                 <div className="card yardviewCard">
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
                                             </li>
                                            })
                                        }
                                        </ul>
                                          </div>
                                    </div>
                                </div>
                            </div>   
    
                        </div>
                            :
                            <div className="noproductserror">
                            <h5>Mates Not Available !</h5>
                        </div>
                        }
                      
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

export default Totolmates;


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