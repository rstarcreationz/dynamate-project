import React, { useState,useEffect } from "react";
import Header from "../Header";
import {Modal, Button} from "react-bootstrap";
import Ordermats from "../../assets/FrontImage/righticon.png";
import {Link,useHistory} from "react-router-dom";
import axios  from "axios";


const OrderMats = () => {
   
    
    const [modal, setModal] = useState(false)
    const [category, setcategory] = useState([]);

    const [scategory, setscategory] = useState("");


    const [size, setsize] = useState([]);
    const [ssize, setssize] = useState("");

    const [quantity, setquantity] = useState("");

    const [condition, setcondition] = useState("")


    //error message
   const [errcategory, seterrcategory] = useState();
   const [errsize, seterrsize] = useState();
   const [errquantity, seterrquantity] = useState();
   const [errcondition, seterrcondition] = useState()

    const Gettoggle = (event) =>{
        setModal(!modal)
       
    }

    const submitHandler = (event) =>{
      event.preventDefault();
        // alert(scategory)
        var error = 0;
        
        if(scategory==""){
            seterrcategory("*Please select category.");
            error++;

        }else{
            seterrcategory("")
        }


        if(ssize==""){
            seterrsize("*Please select size.");
            error++;
        }else{
            seterrsize("");
        }



        if(quantity==""){
            seterrquantity("*Quantity is required.");
            error++;
        }else{
            seterrquantity("");
        }


        if(condition==""){
            seterrcondition("*Condition is required.");
            error++;
        }else{
            seterrcondition("");
        }



        if(error==0){
        var capsule = {
            "category_id":scategory,
            "condition":condition,
            "size":ssize,
            "quantity":quantity

        }
            
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
        };

         axios.post('https://cloudwapp.in/dynamatep/users/yard/add',capsule, config)
                    .then(result=>{
                        // console.log(result)
            
                        if(result.data.status==true){
                            Gettoggle();
                        }
                        
                    })

                }
     
    }

    



    useEffect(()=>{
        getCategory();
        getSize();
       
    },[]);

    const getCategory =async()=>{
        await axios.get('https://cloudwapp.in/dynamatep/category')
             .then(result=>{
                // console.log(result.data.data.size)
                if(result.data.status==true)
                {
                      setcategory(result.data.data.category)
                }
               
             })
    }


    const getSize = async() =>{
        // alert(e.target.value);

        await axios.get('https://cloudwapp.in/dynamatep/size')
        .then(result=>{
        //    console.log(result)
           if(result.data.status==true)
           {
            setsize(result.data.data.size)
           }
          
        })
    }



    return (
        <>
            <Header />
           <section className="MatDetails">
                <div className="container">
                <div className="section-title">
                        <h3>Add New Mats</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-sm-3">
                        <div className="OrderCard">
                        <form action="" className="dynamatCard" onSubmit={submitHandler}>

                            <div className="form-group">
                            <label htmlFor="">Select Category</label>
                            <select name="category_name" id="category_name"  className="form-control"  onChange={(e)=>setscategory(e.target.value)}>
                                <option value="" selected disabled>--Select--</option>
                                {
                                    category.map((item,key)=>{
                                        return (
                                            <option key={key} value={item.id}>{item.category_name}</option>
                                        )
                                    })
                                }
                               
                                {/* <option value="mats2">Traditional Mats</option> */}
                                
                                {/* <option value="mats2">Sidewall Mats</option> */}
                            </select>
                          
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{errcategory}</span>
                            </div>

                            <div className="form-group custom_mrg">
                            <label htmlFor="">Size</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setssize(e.target.value)}>
                                <option value="" selected disabled>--Select--</option>
                                {/* <option value="size1">10x15</option>
                                <option value="size2">10x12</option> */}
                                {/* <option value="0" selected disabled>--Select--</option> */}
                                {
                                    size.map((item,key)=>{
                                        return <option key={key} value={item.id}>{item.size_name}</option>
                                    })
                                }
                              
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{errsize}</span>
                            </div>

                            <div className="form-group custom_mrg">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="0"  className="form-control" value={quantity} onChange={(e)=>setquantity(e.target.value)}/>
                            <span className="text-danger">{errquantity}</span>
                            </div>

                            <div className="form-group custom_mrg">
                            <label htmlFor="">Select condition</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setcondition(e.target.value)}>
                                <option value="" selected disabled>--Select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{errcondition}</span>
                            </div>

                            <div className="form-group custom_mrg">
                                <div className="TransferMatbtn">
                                    <button className="btn custom_btn">Add Mats</button>
                                </div>
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
                    <h4>Mats Added</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={(event)=>Gettoggle(event)}>
                <Link to="/Dynamate" style={{color:"#fff"}}>
                Ok
                </Link>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>
           

        </>
    );
}

export default OrderMats;