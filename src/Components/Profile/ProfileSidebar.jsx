import React, { useState } from "react";
import { Modal} from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import profileuser from "../../assets/FrontImage/ProfileIcon/user.svg"
import order from "../../assets/FrontImage/ProfileIcon/truck.svg"
import mappin from "../../assets/FrontImage/ProfileIcon/map-pin.svg"
import logout from "../../assets/FrontImage/ProfileIcon/log-out.svg"
import historyicon from "../../assets/FrontImage/ProfileIcon/history.svg"
import uservector from "../../assets/FrontImage/uservector.jpg"
import axios from "axios";
import { useEffect } from "react";


const ProfileSidebar = () =>{

    let history= useHistory();
    const [modal, setModal] = useState(false)

   const Gettoggle = (event) => {
        setModal(!modal)
        event.preventDefault();
    }

    const [profile, setProfile] = useState([])

    useEffect(async()=>{
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token,"Content-Type": "application/json", "Accept": "application/json" }
        };

        await axios.get('users/profile',config)
            .then(result => {
                if(result.data.status==true){
                    setProfile(result.data.data.userdetails)
                }
            });
    },[])

 const Logout = () => {
       
    localStorage.removeItem("user-token")
    localStorage.clear();
        
        history.push('/login')
    }

    return(

        <>
                         <section className="custom-design-area websidebar">
                             <div className="user-area">
                                 <div className="row">
                                     <div className="col-lg-12">
                                         <div className="usertitle">
                                             <div className="uservector">
                                                 <img src={uservector} alt="user"/>
                                             </div>

                                             <div className="userhello">
                                                <p>Hello,</p>
                                                <h4>{profile.fullname}</h4>
                                             </div>

                                         </div>
                                     </div>
                                 </div>
                             </div>
        
                             <div className="sidebarmenu">
        
                                <ul>
                                    <li>
                                        <Link to="/myprofile">
                                            <img src={axios.defaults.baseStaticImageURL+profileuser} alt="" /> My Profile
                                        </Link>
                                    </li>
        
                                    <li>
                                        <Link to="/order_list">
                                            <img src={axios.defaults.baseStaticImageURL+order} alt="" /> Orders
                                        </Link>
                                    </li>
        
                                    <li>
                                        <Link to="/jobsite_view">
                                            <img src={axios.defaults.baseStaticImageURL+mappin} alt="" />
                                            Job sites
                                        </Link>
                                    </li>
        
                                    {/* <li>
                                        <Link to="/myprofile/project_manager">
                                            <img src={projectuser} alt="" />
                                            Project manager
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link to="/myprofile/history">
                                            <img src={axios.defaults.baseStaticImageURL+historyicon} alt="" />
                                            History
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/myprofile/help">
                                            <img src={myhelp} alt="" />
                                         Help
                                        </Link>
                                    </li> */}
                                    <li>
                                        <div className="log_out" onClick={(event) =>Gettoggle(event)}>
                                            <img src={axios.defaults.baseStaticImageURL+logout} alt="" />
                                            Logout
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
        
                        <Modal show={modal} className="logoutPopup">
                            <Modal.Body>
                                <div className="messagelogout">
                                    <h5>Are you sure you want to Signout ?</h5>
                                </div>
                                <div className="logout_confirm">
                                    <span onClick={(event) => Gettoggle(event)}>Cancel</span>
                                    <span onClick={()=>Logout()}>
                                  yes
                                  </span>
                                </div>
        
                           </Modal.Body>
                        </Modal>
        
                     </>


    );
}

export default ProfileSidebar;


// class ProfileSidebar extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             show: false,
//             redirect: false,
//             reload: false
//         }
//     }

//     Gettoggle = (event) => {
//         this.setState({ show: !this.state.show })
//         event.preventDefault();
//     }

//     refreshPage () {
//         this.setState(
//           {reload: true},
//           () => this.setState({reload: false})
//         )
//       }

//     async componentDidMount(){
        
//         const config = {
//             headers: { "Content-Type": "application/json", "Accept": "application/json" }
//         };

//         await axios.get('users/profile',config)
//             .then(result => {
//                 if(result.data.status==true){
//                 this.setState(result.data.data.userdetails)
//                 }
//             });
// }


//     Logout () {
//         this.refreshPage();
//         sessionStorage.removeItem("user-token")
//         sessionStorage.clear();
//         // alert('ok')
       
//         this.setState({redirect:true})
//     }

//     render() {

//         const { redirect } = this.state;
//         // const { profile } = this.state;

//         if (redirect) {
           
//           return <Redirect to='/login'/>;
//         }

//         return (
//             <>
//                 <section className="custom-design-area websidebar">
//                     <div className="user-area">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="usertitle">
//                                     <h4> <span>Hello,</span> &nbsp; {this.state.fullname}</h4>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="sidebarmenu">

//                         <ul>
//                             <li>
//                                 <Link to="/myprofile">
//                                     <img src={profileuser} alt="" /> My Profile
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link to="/order_list">
//                                     <img src={order} alt="" /> Orders
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link to="/jobsite_view">
//                                     <img src={mappin} alt="" />
//                                     Job sites
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link to="/myprofile/project_manager">
//                                     <img src={projectuser} alt="" />
//                                     Project manager
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/myprofile/help">
//                                     <img src={myhelp} alt="" />
//                                  Help
//                                 </Link>
//                             </li>
//                             <li>
//                                 <div className="log_out" onClick={(event) => this.Gettoggle(event)}>
//                                     <img src={logout} alt="" />
//                                     Logout
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </section>

//                 <Modal show={this.state.show} className="logoutPopup">
//                     <Modal.Body>
//                         <div className="messagelogout">
//                             <h5>Are you sure you want to Signout ?</h5>
//                         </div>
//                         <div className="logout_confirm">
//                             <span onClick={(event) => this.Gettoggle(event)}>Cancel</span>
//                             <span onClick={()=>this.Logout()}>
//                             yes
//                             </span>
//                         </div>

//                     </Modal.Body>
//                 </Modal>

//             </>
//         );
//     }
// }

// export default ProfileSidebar;