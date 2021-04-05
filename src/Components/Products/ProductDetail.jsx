import React,{useState,useEffect} from "react";
import Header from "../Header";
import { useParams } from "react-router";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Spinner} from "react-bootstrap";


const ProductDetail = () => {

    const [loading, setloading] = useState(false);

    const {id} = useParams();
    useEffect(()=>{
        PostProductDetails();
    },[]); 

    // api for post id show details
    const [productdetails, setproductdetails] = useState("");
    const PostProductDetails=()=>{

        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type":"application/json"}
        };
      
    axios.post('users/products-details',{product_id:id}, config)
    .then(result=>{
        if(result.data.status==true){
            setproductdetails(result.data.data.product)
            setloading(true);
        }
    })
    }
   
    return (
        <>
            <Header />
            {
                        productdetails ?
           
            <section className="jobsite_Detail Product_Details">
                <div className="container">
                    <div className="section-title">
                        <h3>Product Details</h3>
                    </div>
                  
                    <div className="row">
                        <div className="col-md-12">
                            
                            <div className="Product_Detail_Card" style={{background:"#fff"}}>
                            <div className="map_View Product_img">
                                <img src={axios.defaults.baseImageURL+productdetails.image} alt=""/>
                            </div>

                            <div className="job-info" style={{paddingLeft:"0"}}>
                               
                                <div className="row">
                                    <div className="col-md-6">
                                    <h4>{productdetails.product_name}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        {
                                          ! 
                                          productdetails.category_attachment=="" ?
                                            <a className="custom_btn btn_attachment" href={axios.defaults.baseImageURL+productdetails.category_attachment} target="_blank">Download Attachment</a>
                                            :
                                            null
                                        }
                                       
                                    </div>
                                </div>
                                
                                <div className="row border-top mt-3">
                                    <div className="col-md-12 detail_Desc">
                                        <h6>Description</h6>
                                        <p dangerouslySetInnerHTML={{ __html:productdetails.category_description}} ></p>
                                    </div>
                                    
                                </div>
                            </div>
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

        </>
    );
}

export default ProductDetail;