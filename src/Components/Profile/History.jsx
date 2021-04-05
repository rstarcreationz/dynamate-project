import React, { useState } from "react";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import axios from "axios";
import { useEffect } from "react";
import {useParams } from "react-router-dom";
import {Spinner} from "react-bootstrap";

const History = () => {

    const { id } = useParams();

    const [Gethistory, setgetHistory] = useState([])
    const [msd, setmsd] = useState("")
    const [loading, setloading] = useState(false)
    const [ errdropdowndata,seterrdropdowndata] = useState("")

    useEffect(()=>{
        LoadHistory();
        // LoadDropdown();
    },[])

        const LoadHistory = async(selectedCat,sort_by) =>{

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };

        var capsule ={
            category_id:selectedCat,
            sort_by:sort_by
        }
        await axios.post('users/get-history',capsule,config)
        .then((result)=>{
            console.log(result.data.status)
            if (result.data.status==true) {
                
                setmsd("")
                if(selectedCat==3){
                    setdropdowndata([])
                }
                setgetHistory(result.data.data.recent_history)
                setloading(true)
            }else  
            {
                setmsd(result.data.message)
                setloading(true)
            }
        })
    }

    //////// for filter dropdown 
    const [dropdowndata, setdropdowndata] = useState([])
  
    const [selcate, setselcate] = useState('')

        const LoadDropdown = async(selectedCat) =>{
        if(selectedCat){
            setselcate(selectedCat)
        }
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };
       
        var capsule = {
            "getdata":selectedCat
        }
        
        if(selectedCat !=3){

            await axios.post('users/get-filter-data',capsule, config)
            .then(result=>{
                if(result.data.status==true) {
                    // result.data.data.requireddata.push({id:"",name:"select"});
                    // result.data.data.requireddata.splice(0, 0, {id:"",name:"select"});

                    // console.log(result.data.data.requireddata)
                    setdropdowndata([])
                    setdropdowndata(result.data.data.requireddata)
                }else{
                    // if(result.data.status==false){
                    setdropdowndata([])
                    seterrdropdowndata(result.data.message)
                    // }
                }
            })

        }else{
            LoadHistory(3,1)
        }
       
    }


    return (
        <>
         {
             loading ?
            <section className="Profileview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                              
                                <div className="profile_Card text-center help_card">
                                <div className="section-title historytitle">
                                    <h3>History</h3> 
                                </div>   
                                
                               
                                <div className="row mt-3">

                                    <div className="col-sm-6 col-md-6">
                                        <div className="historyfilter form-group">
                                        <label htmlFor="">Select Category</label>
                                            <select name="" id="" className="form-control" onChange={(event)=>LoadDropdown(event.target.value)}>
                                            <option value="" selected >--select--</option>
                                                <option value="1">Jobsite</option>
                                                <option value="2">Mats</option>
                                                <option value="3">Yard</option>
                                                <option value="4">Project Manager</option>
                                            </select>
                                            <i className="fa fa-angle-down"></i>
                                        </div> 
                                    </div>
                                    
                                    <div className="col-sm-6 col-md-6">
                                        <div className="historyfilter form-group historytypefilter">
                                            <label htmlFor="">Select type</label>
                                          
                                                <select name="" id="" className="form-control" onChange={(e)=>LoadHistory(selcate,e.target.value)}>
                                             
                                                <option value="" selected>--select--</option>
                                                
                                                    {
                                                       
                                                         dropdowndata.map((item, key)=>{
                                                            return <option key={key} value={item.id}>{item.name}</option>
                                                        })
                                                    }
                                                    
                                                </select>
                                           
                                            <i className="fa fa-angle-down"></i>
                                        </div> 
                                    </div>
                                </div>


                                {
                                    msd ? 
                                    <div className="mt-3">
                                    <p>Oops ! No history available</p>
                                    </div>
                                    :
                                  <div className="history_overflow">
                                        
                                  {
                                       Gethistory.map((item, index)=>{
                                          return(
                                              <div className="history_area">
                                              <div className="content">
                                                  <div className="icon">
                                                      <DoneAllIcon/>
                                                  </div>
                                                  <div className="historymsg" index={item.id}>
                                                  <h5>{item.activity}</h5>
                                                  <p> {item.date}</p>
                                                  </div>
                                              </div>
                                             
                                          </div>
                                          )
                                      })
                                  }
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
        </>
    );
}

export default History;