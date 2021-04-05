import React,{useState,useEffect} from "react";
import { Link, useParams,useLocation } from "react-router-dom";
import {Modal, Button} from "react-bootstrap";
import Header from "../Header";
import axios from 'axios';
import Ordermats from "../../assets/FrontImage/righticon.png";
import {Spinner} from "react-bootstrap";

const TransfermatDetail = (props) => {
    
    const {tab_id,id}  = useParams();
    // const {id} = useParams();
    // const {threejobsiteid, id}  = useParams();
    // let params = useParams();
    

    // let location = useLocation();

    const [heading, setheading] = useState()
    const [brand_new, setbrand_new] = useState();
    const [still_good, setstill_good] = useState();
    const [onelast, setonelast] = useState();
    const [recycle, setrecycle] = useState();

    const [Mymodal, setMyModal] = useState(false)
    const [threeMymodal, setthreeMyModal] = useState(false)

    const [Yard, setYard] = useState(false)


    const [jobsiteList, setJobsiteList] = useState([]);

    const [loading, setloading] = useState(false)


    const transferModel = (event) =>{
        // event.preventDefault();
        setMyModal(!Mymodal)
        setthreeMyModal(!threeMymodal)

        setsite("")
        setcondition("");
        setquantity("");

        setservermesg("");


        setesite("")
        setecondition("");
        setequantity("");
        // LoadJobsite();
       
    }

    const changeCondition = () =>{
        setYard(!Yard)
        setfromcondition("");
        settocondition("");
        setquantity("");
        

       // set error
        setefromcondition("");
        setetocondition("");
        setequantity("");
    }


    /// state for tabid=2 transfer yard to site api
    // const [category, setcategory] = useState("");
    const [condition, setcondition] = useState("");
    const [site, setsite] = useState("");
    const [quantity, setquantity] = useState("");

   

    

    //error  message
    const [servermesg, setservermesg] = useState("");
    // const [ecategory, setecategory] = useState("");
    const [econdition, setecondition] = useState("");
    const [esite, setesite] = useState("");
    const [equantity, setequantity] = useState("");

    


    //change conditon
    const [fromcondition, setfromcondition] = useState("");
    const [tocondition, settocondition] = useState("");

    //error
    const [efromcondition, setefromcondition] = useState("");
    const [etocondition, setetocondition] = useState("");


    /// state for tabid=3 transfer to another site api
    const [threecondition, setthreecondition] = useState("");
    const [threesite, setthreesite] = useState("");
    const [threequantity, setthreequantity] = useState("");
    const [threejobsiteid, setthreejobsiteid] = useState("");
    const [listthreejobsiteid, setlistthreejobsiteid] = useState("");
    // const [threeproduct, setthreeproduct] = useState("");
    /////error
    const [threeERRsite, setthreeERRsite] = useState();
    const [threeERRcondition, setthreeERRcondition] = useState();
    const [threeERRquantity, setthreeERRquantity] = useState();
    
    
    
    const [nlistjobsite, setnewlistjobsite] = useState([]);

    //// condition success popup

    const [conditionModal, setconditionModal] = useState(false)

    const conditiontoggle = () =>{
        setconditionModal(!conditionModal)
        
    }

    const dismiscondition = () =>{
        setconditionModal(!conditionModal)
        changeCondition();
    }

    //// transfer success popup

    const [mytransferModal, setmytransferModal] = useState(false)

    const transfertoggle = () =>{
        setmytransferModal(!mytransferModal)
        
    }

    const dismistransfer = () =>{
        setmytransferModal(!mytransferModal);
        transferModel();
    }




    useEffect(()=>{
        singleMatDetails();
    },[])

    //// delete mates toggle
    const [deleteinvetory, setdeleteinvetory] = useState("")

    const toggleInventory = () =>{
        setdeleteinvetory (!deleteinvetory)
    }


    const ExcludeJobsite = async (jbs) => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };
        
        await axios.post('users/jobsite/details',{jobsite_id:jbs}, config)
            .then(result => {
                if(result.data.status==true){
                    // console.log(result.data.data.jobsiteDropdown)
                  setnewlistjobsite(result.data.data.jobsiteDropdown)
                  setloading(true);
                  if(result.data.data.jobsite){
                    setlistthreejobsiteid(result.data.data.jobsite.jobsite_id) 
                  }
                 
                 
                 // setprojectManager(result.data.data.managers_list)
                 console.log(nlistjobsite)
                }
                
                
                // alert(result.data.jobsite_name)
            });
    }

    const LoadJobsite = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };
        
        axios.get('users/jobsite/list', config)
            .then(result => {
                if(result.data.status==true){
                    // console.log(result.data.data)
                 setJobsiteList(result.data.data.jobsite)
                 setloading(true);
                //  setlistthreejobsiteid(result.data.data.jobsite.jobsite_id) 
                 // setprojectManager(result.data.data.managers_list)
                }
                
                // alert(result.data.jobsite_name)
            });
    }
 


    const submitHandler= async()=>{
        //  alert('ok')
        
        var error = 0;
     


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
            setequantity("*Quantity should be greater than zero.");
            error++;
        }else{
            setequantity("")
        }


        if(error==0){
            // alert('oj')
            //*note this category is a id of available mate table
          var capsule ={
            "id":id,
            "quantity":quantity,
            "condition":condition,
            "job_site_id":site,
            // "Size_id":2
          }


        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
        };
             await axios.post('users/yard/transfer-yard-to-site',capsule, config)
                        .then(result=>{
                        //  console.log(result) 
                          if(result.data.status==true){
                           transfertoggle();
                            singleMatDetails()
                          
                          }else{
                            setservermesg(result.data.message)
                          }  
                        })
        }
    }

    // transfer-to-another-site

    const threesubmitHandler= async()=>{
        
        var error = 0;
   
        if(threecondition==""){
            setthreeERRcondition("*Please select condition.");
            error++;
        }else{
            setthreeERRcondition("")
        }

        if(threesite==""){
            setthreeERRsite("*Please select site.");
            error++;
        }else{
            setthreeERRsite("")
        }

        if(threequantity==""){
            setthreeERRquantity("*Please select quantity.");
            error++;
        }else if(threequantity==0){
            setthreeERRquantity("*Quantity should be greater than zero.");
            error++;
        }else{
            setthreeERRquantity("")
        }
           
      
        if(error==0){
            // alert('oj')
            //*note this category is a id of available mate table
        //   var capsule ={
        //     "id":id,
        //     "quantity":threequantity,
        //     "condition":threecondition,
        //     "job_site_id":threesite,
        //     "threejobsite_id":threejobsiteid
        //   }

          var capsule = {
            "product_id":id,
            "from_jobsite_id":threejobsiteid,
            "to_jobsite_id":threesite,
            "quantity":threequantity,
            "condition":threecondition
        
        }


        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
        };
             await axios.post('users/jobsite/transfer-to-another-site',capsule, config)
                        .then(result=>{
                        //  console.log(result) 
                          if(result.data.status==true){
                            setthreeMyModal(!threeMymodal)
                            singleMatDetails()
                          
                          }else{
                            setservermesg(result.data.message)
                          }  
                        })
        }
       
    }

    //// transfer to another site


    const changeConditionSubmit= async()=>{
        //  alert('ok')
        
        var error = 0;

        if(fromcondition==""){
            setefromcondition("*Please select from condition.");
            error++;
        }else{
            setefromcondition("")
        }

        if(tocondition==""){
            setetocondition("*Please select to condition.");
            error++;
        }else if(fromcondition == tocondition){
            setetocondition("*Same condition transfer cannot be done.");
        }else{
            setetocondition("")
        }

       if(quantity==""){
       
            setequantity("*Please select quantity.");
            error++;
        }else if(quantity==0){
          
            setequantity("*Quantity should be greater than zero.");
            error++;
        }else{
            setequantity("")
        }

       
      

        if(error==0){
            // alert('oj')
            //*note this category is a id of available mate table
          var capsule ={
            "id":id,
            "from_condition":fromcondition,
            "to_condition":tocondition,
            "quantity":quantity,
            "tab_id":tab_id

        
          }
        
          var token = localStorage.getItem('user-token');
          const config = {
              headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
          };
        await axios.post('users/yard/change-mate-condition',capsule, config)
                .then(result=>{
                //  console.log(result) 
                    if(result.data.status==true){
                    singleMatDetails()
                    conditiontoggle();
                    }else{
                    setservermesg(result.data.message)
                    }  
                })
            }
        }




    const singleMatDetails = ()=>{

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
        };
      
          axios.post('users/yard/single-mates-details',{tab_id:tab_id,mate_id:id,jobsite_id: id}, config)
          .then(result=>{
            // console.log(result.data.data.product)
              if(result.data.status==true)
              {
                setheading(result.data.data.product.category_name+' '+result.data.data.product.size)
                setbrand_new(result.data.data.product.brand_new)
                setstill_good(result.data.data.product.still_good)
                setonelast(result.data.data.product.one_last_job)
                setrecycle(result.data.data.product.to_be_recycled)
                setthreejobsiteid(result.data.data.product.jobsite_id)
                // alert(result.data.data.product.jobsite_id)
                ExcludeJobsite(result.data.data.product.jobsite_id); 
                LoadJobsite();
              }
              
          })
          
        }

        const [deletecondition, setdeletecondition] = useState("");
        const [deletequantity, setdeletequantity] = useState("");
        /// delete mats error state
        const [deleteconditionerr, setdeleteconditionerr] = useState("");
        const [deletequantityerr, setdeletequantityerr] = useState("");

        const DeleteMate = () =>{
            
            var error = 0;
            if(deletecondition==""){
                setdeleteconditionerr("*Please select condition.");
                error++;
            }else{
                setdeleteconditionerr("")
            }
    
           if(deletequantity==""){
           
            setdeletequantityerr("*Please select quantity.");
                error++;
            }else if(deletequantity==0){
              
                setdeletequantityerr("*Quantity should be greater than zero.");
                error++;
            }else{
                setdeletequantityerr("")
            }
        
        //    alert(id)
        if(error==0){
            var capsule ={
                "tab_id":tab_id,
                "mate_id":id,
                "quantity":deletequantity,
                "condition":deletecondition
              }

            var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-type":"application/json", "Accept": "application/json" }
        };

            axios.post('users/yard/delete-mate-from-available',capsule, config)
            .then(result=>{
              // console.log(result.data.data.product)
                if(result.data.status==true)
                {
                   toggleInventory();
                   singleMatDetails();
                }
                
            })
        }
        }


    return (
        <>
            <Header />
            {
                loading ? 
                <section className="MatDetails transfermat_Details">
                <div className="container">
                <div className="section-title">
                        <h3>Mats Details</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="Matcard">
                             
                                <ul>
                                <h5>{heading}</h5>
                                    <li>
                                        <div className="fourmatcard">
                                            <h4>{brand_new}</h4>
                                            <h5>Brand New</h5>
                                        </div>
                                    </li>
                                    <li>
                                         <div className="fourmatcard">
                                            <h4>{still_good}</h4>
                                            <h5>Still Good</h5>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fourmatcard">
                                            <h4>{onelast}</h4>
                                            <h5>One Last Job</h5>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="fourmatcard">
                                            <h4>{recycle}</h4>
                                            <h5>To be Recycled</h5>
                                        </div>
                                    </li>
                                </ul>

                                {/* <div className="TransferMatbtn">
                                    <Link to="/Dynamate/order_mat">
                                    <button className="btn custom_btn">Order new mats</button>
                                    </Link>
                                </div> */}

                            {
                             (tab_id==1) ? 
                             null
                             :
                            
                             <div className="row">

                            {
                                (localStorage.getItem("manager-type")!=2) ?
                                <div className={(tab_id==3) ? "col-md-12" : "col-md-4", (tab_id==1) ? "col-md-4 offset-md-2" : "col-md-4"}>
                                <div className="TransferMatbtn">
                                     <button type="button" className="btn custom_btn" onClick={(event)=>transferModel(event)}>
                                     Transfer mats to other site
                                     </button>
                                     </div>
                                </div>
                                :
                                null

                            }

                                
                                <div className={(tab_id==3)  ? "col-md-12" : "col-md-4", (tab_id==1) ? "col-md-4" : "col-md-4" }>

                                <div className="TransferMatbtn">
                                    <button type="button" className="btn custom_btn"  onClick={(event)=>changeCondition(event)}>
                                        Change mats condition
                                    </button>

                                </div>
                                
                                </div>

                                {
                                     (tab_id==1) ? 
                                    null
                                    :
                                    <div className={  (tab_id==3)   ? "col-md-12" : "col-md-4", (tab_id==2) ? "col-md-4" : "col-md-4" }>
                                    <div className="TransferMatbtn">
                                            <button type="button" className="btn custom_btn" onClick={()=>toggleInventory()}>Delete mats</button>
                                    </div>
                                    </div>
                                }

                                {/* {
                                     (tab_id==3)&&(tab_id==2) ? 
                                    <div className={  (tab_id==3)&&(tab_id==2)   ? "col-md-12" : "col-md-4", (tab_id==1) ? "col-md-4" : "col-md-4" }>
                                        <div className="TransferMatbtn">
                                                <button type="button" className="btn custom_btn" onClick={()=>toggleInventory()}>Delete mats</button>
                                        </div>
                                    </div>
                                    :
                                    null
                                } */}

                            </div>
                        
                        }
                                  
                            </div>
                        </div>

                       

                    </div>
                </div>
           </section>
                :
                <div className="chatspinner">
                    <Spinner animation="border"></Spinner>
                </div>
            }
          



           {
                (tab_id==3) ? 

                <Modal show={threeMymodal} className="jobmodal">
                     <div className="closemodal"  onClick={(event)=>transferModel(event)}>
                <i className="fa fa-times"></i>
                </div>
                
               
                    <Modal.Body>
                        {/* <form action="" method="POST"> */}
                        <span className="text-danger">{servermesg}</span>
                        <div className="form-group">
                                <label htmlFor="">Select site</label>
                                
                                {
                                    // alert(JSON.stringify(newlistjobsite))
                                    tab_id ==3 ?
                                    <select name="" id="" className="form-control" onChange={(e)=>setthreesite(e.target.value)}>
                                        <option value="" selected disabled>--select--</option>
                                        {
                                            nlistjobsite.map((item,key) =>{

                                                return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                            })
                                        }
                                    </select>
                                    :

                                    <select name="" id="" className="form-control" onChange={(e)=>setthreesite(e.target.value)}>
                                        <option value="" selected disabled>--select--</option>
                                        {
                                            jobsiteList.map((item,key) =>{

                                                return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                            })
                                        }
                                    </select>

                                }

                                
                                <i className="fa fa-angle-down"></i>
                                <span className="text-danger">{threeERRsite}</span>
                            </div>
        
                        <div className="form-group">
                                <label htmlFor="">Quantity</label>
                                <input type="number" min="1" className="form-control"  onChange={(e)=>setthreequantity(e.target.value)}/>
                                <span className="text-danger">{threeERRquantity}</span>
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="">Select condition</label>
                                <select name="" id="" className="form-control" onChange={(e)=>setthreecondition(e.target.value)}>
                                 
                                       <option value="" selected disabled>--select--</option>
                                        <option value="brand_new">Brand new</option>
                                        <option value="still_good">Still good</option>
                                        <option value="one_last_job">One last job</option>
                                        <option value="to_be_recycled">To be recycled</option>
                                </select>
                                <i className="fa fa-angle-down"></i>
                                <span className="text-danger">{threeERRcondition}</span>
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
                            
                            <div className="form-group Matsite">
                            {/* <Link to="/Dynamate/transfer_mat_view"> */}
                            <button type="button" className="custom_btn" onClick={()=>threesubmitHandler()}>Transfer</button>
                            {/* </Link> */}
                            </div>
                        {/* </form> */}
                    </Modal.Body>
                  
                </Modal>

                :

                <Modal show={Mymodal} className="jobmodal">
                
                <div className="closemodal"  onClick={(event)=>transferModel(event)}>
                <i className="fa fa-times"></i>
                </div>
                <Modal.Body>
                    {/* <form action="" method="POST"> */}
                    <span className="text-danger">{servermesg}</span>
                    <div className="form-group">
                            <label htmlFor="">Select site</label>
                            <select name="" id="" className="form-control" onChange={(e)=>setsite(e.target.value)}>
                                    <option value="" selected disabled>--select--</option>
                                    {
                                        jobsiteList.map((item,key) =>{
                                            return <option key={key} value={item.id}>{item.jobsite_name}</option>
                                        })
                                    }
                                
                                </select>
                            <i className="fa fa-angle-down"></i>
                            <span className="text-danger">{esite}</span>
                        </div>

                    <div className="form-group">
                            <label htmlFor="">Quantity</label>
                            <input type="number" min="1" className="form-control" value={quantity} onChange={(e)=>setquantity(e.target.value)}/>
                            <span className="text-danger">{equantity}</span>
                        </div>

                        <div className="form-group modaltable">
                               <table className="table">
                                   <thead className="thead-dark">
                                   <th>Brand new</th>
                                   <th>Still good</th>
                                   <th>One last job</th>
                                   <th>To be recycles</th>
                                   </thead>

                                   <tbody>
                                       <tr>
                                           <td>{brand_new}</td>
                                           <td>{still_good}</td>
                                           <td>{onelast}</td>
                                           <td>{recycle}</td>
                                       </tr>
                                   </tbody>
                                   
                               </table>
                            </div>
                    
                        <div className="form-group">
                            <label htmlFor="">Select condition</label>
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
                        
                        <div className="form-group Matsite">
                        {/* <Link to="/Dynamate/transfer_mat_view"> */}
                        <button type="button" className="custom_btn" onClick={submitHandler}>Transfer</button>
                        {/* </Link> */}
                        </div>
                    {/* </form> */}
                </Modal.Body>
            </Modal>
           }

           

    {/* ////// change mats condition modal */}
        <Modal show={Yard} className="jobmodal">
                <div className="closemodal"  onClick={(event)=>changeCondition(event)}>
                    <i className="fa fa-times"></i>
                </div>
                <Modal.Body>
                <form action="" method="POST">
                <span className="text-danger">{servermesg}</span>
                <div className="form-group">
                        <label htmlFor="">From</label>
                        <select name="" id="" className="form-control" onChange={(e)=>setfromcondition(e.target.value)}>
                         
                               <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                        </select>
                        <i className="fa fa-angle-down"></i>
                        <span className="text-danger">{efromcondition}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">To</label>
                        <select name="" id="" className="form-control" onChange={(e)=>settocondition(e.target.value)}>
                         
                         <option value="" selected disabled>--select--</option>
                          <option value="brand_new">Brand new</option>
                          <option value="still_good">Still good</option>
                          <option value="one_last_job">One last job</option>
                          <option value="to_be_recycled">To be recycled</option>
                        </select>
                        <i className="fa fa-angle-down"></i>
                        <span className="text-danger">{etocondition}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Quantity</label>
                        <input type="number" className="form-control" min="1" onChange={(e)=>setquantity(e.target.value)}/>
                        <span className="text-danger">{equantity}</span>
                    </div> 
                   
                    
                    <div className="form-group Matsite">
                    <button type="button" className="custom_btn" onClick={changeConditionSubmit}>Transfer</button>
                    </div>

                </form>
                </Modal.Body>
            </Modal>


         {/* ///////// delete mats from inventory //////////// */}
            <Modal show={deleteinvetory} className="jobmodal">
                <div className="closemodal"  onClick={(event)=>toggleInventory(event)}>
                    <i className="fa fa-times"></i>
                </div>
                <Modal.Body>
                <form action="" method="POST">
                    <div className="form-group">
                        <label htmlFor="">Quantity</label>
                        <input type="number" className="form-control" min="1" onChange={(e)=>setdeletequantity(e.target.value)}/>
                        <span className="text-danger">{deletequantityerr}</span>
                    </div> 

                    <div className="form-group">
                        <label htmlFor="">Select Condition</label>
                        <select name="" id="" className="form-control" onChange={(e)=>setdeletecondition(e.target.value)}>
                         
                               <option value="" selected disabled>--select--</option>
                                <option value="brand_new">Brand new</option>
                                <option value="still_good">Still good</option>
                                <option value="one_last_job">One last job</option>
                                <option value="to_be_recycled">To be recycled</option>
                        </select>
                        <i className="fa fa-angle-down"></i>
                        <span className="text-danger">{deleteconditionerr}</span>
                    </div>
                   
                    
                    <div className="form-group Matsite">
                    <button type="button" className="custom_btn" onClick={DeleteMate}>Delete Mats</button>
                    </div>

                </form>
                </Modal.Body>
            </Modal>


            {/* ///////////// Successfull popup for condition ////////// */}

            <Modal show={conditionModal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Mats condition changed</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn">
                    <span onClick={()=>dismiscondition()}>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>


             {/* ///////////// Successfull popup for transfer mat to other site ////////// */}
             <Modal show={mytransferModal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Mats has been tranferred</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
                </div>
                <Button className="custom_btn popup_btn">
                    <span onClick={()=>dismistransfer()}>OK</span>
                </Button>
               
                </Modal.Body>
                </div>
            </Modal>
            
        </>
    );
}

export default TransfermatDetail;