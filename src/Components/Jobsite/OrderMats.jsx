import React, { useState,useEffect } from "react";
import Header from "../Header";
import {Modal, Button} from "react-bootstrap";
import Ordermats from "../../assets/FrontImage/righticon.png";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import { MDBAlert } from 'mdbreact';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const OrderMats = () => {
   const history = useHistory();

   const [errorder, seterrorder] = useState()

    const [modal, setModal] = useState(false);

    // state for order mats ////

    const [category, setcategory] = useState([]);

    const [scategory, setscategory] = useState("");

    const [size, setsize] = useState([]);
    const [ssize, setssize] = useState([]);

    const [quantity, setquantity] = useState("");

    const today = new Date()
    const datehandle = (d) =>{
        setdate(d)
    }
    const [date, setdate] = useState(new Date)

    const [jobsiteList, setJobsiteList] = useState([])
    const [jobsiteaddress, setjobsiteaddress] = useState("")

    

    const [showCustomSizeField, setshowCustomSizeField] = useState(false)

    //for get custom size 

    // const [customSize, setcustomSize] = useState("")

    const [customSizewidth, setcustomSizewidth] = useState("")
    const [customSizeheight, setcustomSizeheight] = useState("")

    const customsizeHandler = (size_id) => {
        //  alert(size_id)
         setssize(size_id)
        if(size_id=="custom_size"){
            setshowCustomSizeField(!showCustomSizeField)
        }else{
            setshowCustomSizeField(false)
            setcustomSizewidth("")
            setcustomSizeheight("")
            
        }
        
    }

     //error message
   const [errcategory, seterrcategory] = useState();
   const [errsize, seterrsize] = useState();
   const [errquantity, seterrquantity] = useState();
   const [errsite, seterrsite] = useState()
   const [errdate, seterrdate] = useState()
   const [errorcustomsize, seterrorcustomsize] = useState()
   //

    const Gettoggle = () =>{
        setModal(!modal)
    }

    const Pushthis = () =>{
        history.push('/order_list')
    }


    useEffect(()=>{
        getCategory();
        getSize();
        LoadJobsite();
    },[]);

    const getCategory =()=>{
        axios.get('https://cloudwapp.in/dynamatep/category')
             .then(result=>{
                // console.log(result.data.data.size)
                if(result.data.status==true)
                {
                    seterrorder("")
                      setcategory(result.data.data.category)
                }
               
             })
    }


    const getSize = () =>{
        // alert(e.target.value);

        axios.get('https://cloudwapp.in/dynamatep/size')
        .then(result=>{
        //    console.log(result)
           if(result.data.status==true)
           {
            setsize(result.data.data.size)
           }
          
        })
    }


    
  

    const LoadJobsite = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };

        await axios.get('users/jobsite/list', config)
            .then(result => {
                if(result.data.status==true){
                    setJobsiteList(result.data.data.jobsite)
                }
            });
    }



    const submitHandler = (e)=> {
    //  alert('submit');
    e.preventDefault();

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

    if(ssize=="custom_size"){
       if (customSizewidth==""){
        seterrorcustomsize("*Please enter custom size.");
        error++;
       } else if(customSizeheight==""){
        seterrorcustomsize("*Please enter custom size.");
        error++;
       }
       else{
        seterrorcustomsize("");
       }
    }

    if(quantity==""){
        seterrquantity("*Please select quantity.");
        error++;
    }else if(quantity==0){
        seterrquantity("*Quantity should be greater than 0.");
        error++;
    }else{
        seterrquantity("")
    }

    if(jobsiteaddress==""){
        seterrsite("*Please select site.");
        error++;
    }else{
        seterrsite("")
    }


    if(date==""){
        seterrdate("*Please select date.");
        error++;
    }else{
        seterrdate("")
    }

    /////

    //  alert(customSize)
    if(error==0){
       
      var data ={
        category_id:scategory,
        size:(ssize=="custom_size") ? "":ssize,
        custom_size:customSizewidth + "x" + customSizeheight,
        quantity:quantity,
        expected_receiving_date:date,
        site:jobsiteaddress

      }

      console.log(data)

      var token = localStorage.getItem('user-token');
      const config = {
          headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type": "application/json" }
      };

      axios.post('https://cloudwapp.in/dynamatep/users/order',data, config)
           .then(result=>{
           if(result.data.status==true){
            Gettoggle();
            // console.log(result);
           }
           else{
               seterrorder(result.data.message)
           }
           })
           
        }


    }

    // onChange={()=>setselectValue(!selectedValue)}


    return (
        <>
            <Header />
           <section className="MatDetails">
                <div className="container">
                <div className="section-title">
                        <h3>Order New Mats</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lg-6 offset-sm-3 offsetremove">
                        <div className="OrderCard">
                        <form action="" className="dynamatCard" onSubmit={submitHandler}>

                            {
                                errorder ?
                                    <MDBAlert className="alert alert-danger" color="warning" >
                                        <strong>{errorder}</strong>
                                    </MDBAlert >
                                    :
                                    null
                            }

                            <div className="form-group">
                            <label htmlFor="">Select Category</label>
                            <select name="category_name" id="category_name"  className="form-control"  onChange={(e)=>setscategory(e.target.value)}>
                                <option value="0" selected disabled>--Select--</option>
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
                            <label htmlFor="">Select Size* (Optional)</label>
                            <select name="" id="" className="form-control" onChange={(e)=>customsizeHandler(e.target.value)} >
                                <option value="0" selected disabled>--Select--</option>
                                {/* <option value="size1">10x15</option>
                                <option value="size2">10x12</option> */}
                                {/* <option value="0" selected disabled>--Select--</option> */}
                                {
                                    size.map((item,key)=>{
                                        return <option key={key} value={item.id}>{item.size_name}</option>
                                    })
                                }
                                <option value="custom_size" >Custom size</option>
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{errsize}</span>
                            </div>

                            {showCustomSizeField==true ?
                            <div className="form-group custom_mrg">
                                <label htmlFor="">Custom size</label>
                                <div className="customsizearea">
                                    <div className="widthsize">
                                        <label htmlFor="">width</label>
                                        <input type="number" className="form-control" onChange={(e) =>setcustomSizewidth(e.target.value)}/>
                                    </div>
                                    <span className="sizex">X</span>
                                   
                                    <div className="heightsize">
                                        <label htmlFor="">height</label>
                                        <input type="number" className="form-control"  onChange={(e) =>setcustomSizeheight(e.target.value)}/>
                                    </div>
                                </div>
                                <span className="text-danger">{errorcustomsize}</span>
                            </div>
                            :
                            null
                            }

                            <div className="form-group custom_mrg">
                            <label htmlFor="">Quantity</label>
                            <input type="number" className="form-control" value={quantity} onChange={(e)=>setquantity(e.target.value)}/>
                            <span className="text-danger">{errquantity}</span>
                            </div>

                            <div className="form-group custom_mrg">
                            <label htmlFor="">Select Site</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setjobsiteaddress(e.target.value)}>
                                <option value="" selected disabled>--Select--</option>
                                {
                                    jobsiteList.map((item,key)=>{
                                        return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                    })
                                }
                                 <option value="YARD" >Yard</option>
                                {/* <option value="size1">Cottingham</option>
                                <option value="size2">Oxfordshire</option>
                                <option value="size2">Horsforth</option> */}
                            </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{errsite}</span>
                            </div>

                            {/* <div className="form-group custom_mrg">
                            <label htmlFor="">Expected receiving date</label>
                            <input type="date" className="form-control" value={date} onChange={(e)=>setdate(e.target.value)}/>
                            <span className="text-danger">{errdate}</span>
                            </div> */}
                            
                            <div className="form-group custom_mrg">
                            <label htmlFor="">Expected receiving date</label> <br/>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={date}
                                onChange={datehandle} 
                                minDate={today}
                                todayButton={"Today"}/>
                                <span className="text-danger">{errdate}</span>
                            </div>

                            <div className="form-group custom_mrg">
                                <div className="TransferMatbtn">
                                    <button className="btn custom_btn">Order</button>
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
                    <h4>Your request is</h4>
                    <h5 style={{color:"#F5B729"}}>submitted</h5>
                </div>
                <Button className="custom_btn popup_btn" onClick={()=>Gettoggle()}>
                    <span onClick={()=>Pushthis()} style={{padding:"5px 20px"}}>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>

         
           

        </>
    );
}

export default OrderMats;