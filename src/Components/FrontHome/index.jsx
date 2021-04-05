import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../Header"
import Jobsite from "./Jobsite";
import axios from 'axios';
import {useHistory } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const FrontHome = () => {

    
   
    const [banner, setbanner] = useState("");
    const [loading, setloading] = useState(false)
    const history = useHistory();

    useEffect(()=>{
       Loadhome();
    },[]);

    const Loadhome = () =>{
        var token = localStorage.getItem('user-token');
        const config = {
            headers: {"Authorization":"Bearer "+token, "Accept": "application/json" }
        };

         axios.get('users/home', config)
            .then(result => {         
                if(result.data.status==true){
                    setbanner(result.data.data)
                    setloading(true);
                }else{
                    localStorage.removeItem("user-token")
                    history.push('/login')
                } 
            });
    }

        return (
            <>
                <Header />|
                {
                 loading ?
                    <>
                    <section className="Homepage">
                    <Carousel autoPlay infiniteLoop='true'>
                        { 
                            banner.banner.map(item => {
                                return <div>
                                    {
                                        banner ? 
                                        <img src={axios.defaults.baseImageURL +item.image} />
                                        :
                                        <img src="https://ittybox.com/image/cache/catalog/purpletree_banner-900x300.jpg" />
                                    }
                                    
                                   <div className="carousel-caption">
                                   <h1 className="fullnamebanner"> <span style={{paddingRight:"5px"}}>Welcome,</span> {item.fullname}</h1>
                                   <h5 dangerouslySetInnerHTML={{ __html:item.description}}></h5>
                                   {/* <span dangerouslySetInnerHTML={{_html:item.description}}>  </span> */}
                                   </div>
                                   <span className="banner_overlay"></span>
                                </div>
                               
                            })
                        }
                    </Carousel>
                </section>
                <Jobsite data={banner}/>
               
                   </>
                    :
                    <div className="chatspinner">
                        <Spinner animation="border"></Spinner>
                    </div>
                    }
               
            </>
        );
    
}

export default FrontHome;


////////////// class component below /////////////////

// class FrontHome extends React.Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             banner: null,
//             redirect: false,
//             loading: false
//         }
//     }

//      componentDidMount () {
//         var token = localStorage.getItem('user-token');
//         const config = {
//             headers: {"Authorization":"Bearer "+token, "Accept": "application/json" }
//         };

//          axios.get('users/home', config)
//             .then(result => {
            
//                 if(result.data.status==true){
//                     this.setState(result.data.data)
//                     this.setState({loading:true})
//                 }else{
//                     localStorage.removeItem("user-token")
//                     this.setState({redirect:true})
//                 } 
//             });
           
//     }


//     render() {
//         const { redirect } = this.state;
     

//         if (redirect) {
//           return <Redirect to='/login'/>;
//         }
        
//         const { banner } = this.state
         
        
//       if (!banner) return <div className="text-center mt-5 mb-5"></div>

//         return (
//             <>
//                 <Header />|
//                 {
//                  ! this.loading ?
                  
//                     <>
//                     <section className="Homepage">
//                     <Carousel autoPlay infiniteLoop='true'>
//                         { 
//                             banner.map(item => {
//                                 return <div>
//                                     {
//                                         banner ? 
//                                         <img src={axios.defaults.baseImageURL +item.image} />
//                                         :
//                                         <img src="https://ittybox.com/image/cache/catalog/purpletree_banner-900x300.jpg" />
//                                     }
                                    
//                                    <div className="carousel-caption">
//                                    <h1 className="fullnamebanner"> <span style={{paddingRight:"5px"}}>Welcome,</span> {item.fullname}</h1>
//                                    <h5 dangerouslySetInnerHTML={{ __html:item.description}}></h5>
                                 
//                                    </div>
//                                    <span className="banner_overlay"></span>
//                                 </div>
                               
//                             })
//                         }
//                     </Carousel>
//                 </section>
//                 <Jobsite data={this.state}/>
               
//                    </>
//                     :
//                     <div className="chatspinner">
//                             <Spinner animation="border"></Spinner>
//                         </div>
//                     }
               
//             </>
//         );
//     }
// }

// export default FrontHome;