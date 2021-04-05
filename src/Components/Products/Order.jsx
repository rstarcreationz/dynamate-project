import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from "react-router-dom";
import Header from "../Header";
import axios from 'axios';
import {Spinner} from "react-bootstrap";

const Order = () => {

    const [orderlist, setorderlist] = useState([]);
    const [errororderlist ,seterrororderlist] = useState('')
    const [loading, setloading] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };

      await axios.get('https://cloudwapp.in/dynamatep/users/get-orders', config)
            .then(result => {
                
                if (result.data.status==true) {
                    seterrororderlist("")
                    setorderlist(result.data.data.orders_list)
                    setloading(true);
                }else{
                    setloading(true);
                    seterrororderlist(result.data.message);
                    // 
                   
                }

            });
    }

    return (
        <>
            <Header />
            {
              loading ?
            <section className="Products OrderList">
           
                <div className="container">
               
                    <div className="section-title order-title">
                        <h3>Orders</h3>
                        <Link to="/yard_view/order_mat" className="float-right" style={{color:"#000"}}>
                                    <span className="create_jobsite">Create <AddCircleOutlineIcon/></span>
                                </Link>
                    </div>
                    {
                           ! errororderlist  ?
            
                    <div className="row">
                               {
                                orderlist.map(item => {
                                    return (
                                        <div className="col-md-12 col-lg-6 mb-5">

                                            <div className="order_Card">
                                                <div className="card-img order-myimg">
                                                    <img src={axios.defaults.baseImageURL + item.category_image} alt="" />
                                                 
                                                </div>

                                                <div className="card-info">
                                                    <h5>{item.category_name}</h5>
                                                    {item.status == 'Pending' ?
                                                        <span className="order_Status color-grey">{item.status}</span>
                                                        : ''}

                                                    {item.status == 'Processing' ?
                                                        <span className="order_Status color-grey">{item.status}</span> : ''}



                                                    {item.status == 'Out for delivery' ?
                                                        <span className="order_Status color-grey">{item.status}</span>
                                                        : ''}

                                                    {item.status == 'Delivered' ?
                                                        <span className="order_Status color-green">{item.status}</span>
                                                        : ''}



                                                    <div className="row mt-3">
                                                    <div className="col-sm-5 col-md-5">
                                                            <h6>size</h6>
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                            <h6>{item.size}</h6>
                                                        </div>

                                                        <div className="col-sm-5 col-md-5">
                                                            <h6>Order ID</h6>
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                            <h6>{item.order_id}</h6>
                                                        </div>


                                                        <div className="col-sm-5 col-md-5">
                                                            <h6>Order Date</h6>
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                            <h6>{item.order_date}</h6>
                                                        </div>

                                                        <div className="col-sm-5 col-md-5">
                                                            <h6>Delivery Date</h6>
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                            <h6>{item.expected_receiving_date}</h6>
                                                        </div>

                                                        <div className="col-sm-5 col-md-5">
                                                            <h6>Quantity</h6>
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                            <h6>{item.quantity}</h6>
                                                        </div>

                                                        <div className="col-sm-5 col-md-5">
                                                            {
                                                                item.order_type==1 ? 
                                                                <h6>Yard</h6>
                                                                : 
                                                                <h6>Jobsite</h6>
                                                            }
                                                        </div>
                                                        <div className="col-sm-7 col-md-7">
                                                        {
                                                                item.order_type==1 ? 
                                                                <h6>{item.site_location}</h6>
                                                                : 
                                                                <h6>{item.jobsite_name}</h6>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )

                                })
                        }

                    </div>
                    :
                    <div className="noproductserror">
                    <h5>You have no orders !</h5>
                </div>
                }
               
                </div>
            </section>
           :
           <div className="normalspinner">
           <Spinner animation="border"></Spinner>
       </div>
        }
              
        </>
    );
}

export default Order;