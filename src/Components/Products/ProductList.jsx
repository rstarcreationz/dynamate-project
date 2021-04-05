import React,{useState,useEffect} from "react";
import { Link} from "react-router-dom";
import Header from "../Header";
import axios from 'axios';
// import ProductDetail from './ProductDetail';
import {Spinner} from "react-bootstrap";

const ProductList = () => {
const [product, setproduct] = useState([]);
const [loading, setloading] = useState(false);

useEffect(()=>{
    getProductDetails();
},[]);

const [Noproduct, setNoproduct] = useState("");
const getProductDetails=()=>{

    var token = localStorage.getItem('user-token');
    const config = {
        headers: { "Authorization":"Bearer "+token, "Accept": "application/json", "Content-type":"application/json"}
    };

  axios.post('https://cloudwapp.in/dynamatep/users/products',{offset:0}, config)
  .then(result=>{
      if(result.data.status==true){
        console.log(result.data.data.product)
        setproduct(result.data.data.product)
        setloading(true);
      }else{
        setNoproduct(result.data.message);
        setloading(true);
      }
  })
 
}


    return (
        <>
        <Header/>
        {
                loading ?
            <section className="Products Product_list">
           
                <div className="container">
                    <div className="section-title">
                        <h3>Products & Services</h3>
                    </div>

                    {
                       ! Noproduct ? 
                        <div className="row">

                        {
                            
                            product.map((item,index)=>{
                             return <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-5">
                            
                            <Link to={"/product_detail/"+item.id} key={index}>
                            <div className="product_Card">
                                 <div className="card-img">
                                 <img src={axios.defaults.baseImageURL+item.image} alt="" />
                                 </div>

                                 <div className="card-info">
                                     <h5>{item.product_name}</h5>
                                     {/* <div className="row">
                                         <div className="col-md-12">
                                             <h6 className="product_Desc" dangerouslySetInnerHTML={{ __html:item.category_description}}></h6>
                                         </div>
                                     </div> */}
                                     
                                 </div>
                             </div>
                            
                            </Link>
                         
                           </div>

                            })
                           
                        
                        }

                    </div>
                        :
                        <div className="noproductserror">
                            <h5>No Products Available !</h5>
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

export default ProductList;