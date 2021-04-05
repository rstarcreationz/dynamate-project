import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import {Spinner} from "react-bootstrap";


const Profileview = () => {

    const [profile, setProfile] = useState([])
    const [loading, setloading] = useState(false);

    useEffect(() => {
        LoadData();
    }, [])

    const LoadData = async () => {
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };
        //  alert(token)

        await axios.get('users/profile',config)
            .then(result => {
                if(result.data.status==true){
                setProfile(result.data.data.userdetails)
                setloading(true);
                }
            });
           
    }

    return (
        <>
            {
                loading ?
                <section className="Profileview">
                
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile_Card profile_details">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="Profile_pic">
                                            {
                                                profile ?
                                                <img src={axios.defaults.baseImageURL+profile.image} alt="" />
                                                :
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT7YG7eR09uIIv8Ep_D6UQbDkoYVU3cL6PiaSBUkrKUc88OIfhNpvvT0v6TArf2ygzFM2Gw&usqp=CAU&ec=45771803" alt="" />
                                            }
                                            
                                            
                                            <h5>{profile.username}</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="profile_Detail">
                                            <h4>Profile Info</h4>
                                            <div className="row mt-3">

                                                <div className="col-sm-4 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Name</label>
                                                        <p>{profile.fullname}</p>
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Contact</label>
                                                        <p>{profile.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Email</label>
                                                        <p>{profile.email}</p>
                                                    </div>
                                                </div>

                                                <div className="col-sm-4 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Address</label>
                                                        {
                                                            profile.address ? 
                                                            <p>{profile.address}</p>
                                                            :
                                                            <p>No address found</p>
                                                        }
                                                        
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="profileEdit_btn">
                                                <Link to={'/myprofile/profile_edit/'+ profile.id}>
                                                    <button type="button" class="custom_btn">Edit</button>
                                                </Link>
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

export default Profileview;

//          let url = "https://dynamate.cloudwapp.in/users/profile";
//         await axios.get(url,config).then((result) => {
//             setProfile(result.data.userdetails.username);
//             console.log("view", profile)
//         }).catch(err=>{
//             err
//         })


// const [image, setimage] = useState ("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT7YG7eR09uIIv8Ep_D6UQbDkoYVU3cL6PiaSBUkrKUc88OIfhNpvvT0v6TArf2ygzFM2Gw&usqp=CAU&ec=45771803")

// const inputHandler = (event) => {
//     const reader = new FileReader();
//     reader.onload = () =>{
//         if (reader.readyState ==2){
//             setimage(reader.result)
//         }
//     }
//     reader.readAsDataURL(event.target.files[0])

// };


///////////////