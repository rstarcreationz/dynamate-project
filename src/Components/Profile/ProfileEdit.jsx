import React,{useState} from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";
import {Modal, Button} from "react-bootstrap";
import Ordermats from "../../assets/FrontImage/righticon.png";
import { useEffect } from "react";
import { MDBAlert } from 'mdbreact';
import {Spinner} from "react-bootstrap";
//////// properly update field but not image ////////

const ProfileEdit = () =>{
    
    const [loading, setloading] = useState(false);

    let history = useHistory();
   
    const [modal, setModal] = useState(false);

    const [fullname, setfullname] = useState()
    const [email, setEmail] = useState()

    const [image, setimage] = useState();

    const [phone, setPhone] = useState()
    const [address, setaddress] = useState()

    const [ErrName, SetErrName] = useState();
    const [ErrPhone, SetErrPhone] = useState();
    const [ErrEmail, SetErrEmail] = useState();
    const [Erraddress, SetErraddress] = useState();
    const [EditErr, SetEditErr] = useState();

    const Gettoggle = () =>{
        setModal(!modal)
    }

    const Pushthis = () =>{
        history.push('/myprofile')
    }

    useEffect(()=>{
        LoadUser();
    },[])

    const inputHandler = (event) => {
        setimage(event.target.files[0])

    };

    const LoadUser = async() =>{
        
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Content-Type": "multipart/form-data", "Accept": "application/json" }
        };
       await  axios.get('users/profile',config)
        .then(result => {
            if(result.data.status==true){
            setfullname(result.data.data.userdetails.fullname)
            setEmail(result.data.data.userdetails.email)
            setimage(result.data.data.userdetails.image)
            setPhone(result.data.data.userdetails.phone)
            setaddress(result.data.data.userdetails.address)
            setloading(true);
            }
        });
    }

    const UpdateThis = async (event) => {
        event.preventDefault();

        var errorcount = 0;
        if (fullname == "" || fullname == "") {
            SetErrName("*FullName is required.");
            errorcount++;
        }  else {
            SetErrName("");
        }

        if (phone == "" || phone == "") {
            SetErrPhone("*Phone Number is required.");
            errorcount++;
        } else if (phone.length < 6) {
            SetErrPhone("*Phone Number should be greater than 6.");
            errorcount++;
        } else {
            SetErrPhone("");
        }

        if (email == "" || email == "") {
            SetErrEmail("*Email is required.");
            errorcount++;
        }  else {
            SetErrEmail("");
        }

        if (address == "" || address == "") {
            SetErraddress("*Address is required.");
            errorcount++;
        }  else {
            SetErraddress("");
        }

        // alert('okkk')
        // alert(event.target.files[0])
        const formData = new FormData();
        formData.append("image", image);
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);

        if(errorcount==0){
            var token = localStorage.getItem('user-token');
            const config = {
                headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
            };
            
            await axios.post('users/profile-update',formData, config)
                       .then(result=>{
                           if(result.data.status==true){
                            Gettoggle();
                           }else if(result.data.status==false){
                            SetEditErr(result.data.message)
                           }
                       })
        }
       
        // console.log('set',image.raw)
    };

 

    return(
        <>
          {
                loading ?
        <section className="Profileview"> 
            <div className="container">
           
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile_Card">
                        <form action="" onSubmit={(event)=>UpdateThis(event)} enctype='multipart/form-data'>
                        <div className="row">
                            <div className="col-md-4 border-right">

                            <div className="form-group text-center addManager">
                            <label htmlFor="photo-upload" className="custom-file-upload fas">
                                <div className="img-wrap img-upload" >
                                <img for="photo-upload"  src={axios.defaults.baseImageURL+image}/>

                                {/* <img for="photo-upload" src={image} /> */}
                                </div>

                                <div class="p-image"> <i class="fa fa-camera upload-button"></i>
                                <input class="file-upload" id="photo-upload" type="file" name="image" accept="image/*" onChange={(event)=>inputHandler(event)}/>
                                </div>
                            </label>
                            </div>

                        

                            </div>
                            <div className="col-md-8">
                                <div className="profile_Detail">
                                    <h4>Profile Info</h4>

                                    {
                                        EditErr ?
                                            <MDBAlert className="alert alert-danger" color="warning" dismiss>
                                                <strong>{EditErr}</strong>
                                            </MDBAlert >
                                            :
                                            null
                                    }

                                   
                                    <div className="row mt-3">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Name</label>
                                                <input type="text" className="form-control" name="fullname"
                                                onChange={(event)=>setfullname(event.target.value)} value={fullname}
                                                />
                                                <p className="text-danger">{ErrName}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Contact</label>
                                                <input type="number" className="form-control"
                                                 name="phone" onChange={(event)=>setPhone(event.target.value)} value={phone}
                                                />
                                                <p className="text-danger">{ErrPhone}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Email</label>
                                                <input type="email" className="form-control"
                                                onChange={(event)=>setEmail(event.target.value)} value={email}
                                                name="email" pattern="[^\s]+"
                                                />
                                                <p className="text-danger">{ErrEmail}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Address</label>
                                                <input type="text" className="form-control"
                                                onChange={(event)=>setaddress(event.target.value)} value={address}
                                                name="address"
                                                />
                                                <p className="text-danger">{Erraddress}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group TransferMatbtn profileupdate_btn">
                                                <button type="submit" className="custom_btn">Update</button>
                                            </div>
                                        </div>

                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        </form>
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

            <Modal show={modal} className="setpasswordpopup">
                <div className="form_model">
                <Modal.Body>
                <div>
                    <img src={Ordermats} alt=""/>
                </div>
                <div className="inner_popup">
                    <h4>Profile Updated</h4>
                    <h5 style={{color:"#F5B729"}}>Successfully</h5>
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

export default ProfileEdit;