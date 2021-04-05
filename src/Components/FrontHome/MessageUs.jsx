import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Header from "../Header"
import chat from "../../assets/FrontImage/chat.png"
import {Spinner} from "react-bootstrap";


const MessageUs = () => {

 
    ////// this is for send message
    const [message, setmessage] = useState('')

    const SendMsg = async (event) => {
        event.preventDefault();
        // alert(message)
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };
        var capsule = { message: message };
        await axios.post('users/chat', capsule, config)
            .then(result => {
                if (result.data.status == true) {
                    Loadmsg();
                    // setMessage(result.data.data.message)
                }
            })
            event.target.reset();
        // console.log("chat",mymessage.message)
    }

   

    // this is for get message
    const [loading, setloading] = useState(false);
    const [getmessage, setgetmessage] = useState([]);
    const [chaterror ,setchaterror] = useState('');

    const Loadmsg = async () => {
        var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
        };
        await axios.get('users/get-chat', config)
            .then(result => {
                if (result.data.status==true) {
                    setgetmessage(result.data.data)
                    setmessage("")
                }else{
                    setchaterror(result.data.message);
                }
            })
            setloading(true);
    }


    const MINUTE_MS = 5000;

    useEffect(() => {
        Loadmsg();
        const interval = setInterval(() => {
            Loadmsg();  
           
          }, MINUTE_MS );
          
          return () => clearInterval(interval);
        
    }, [])

    ///////// scroll to bottom //////////
    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    return (
        <>
            <Header />
            <section className="Messageus">
                <div className="container">
                    <div className="section-title">
                        <h3>Message us</h3>
                    </div>
                    <div className="row">
                   
                        <div className="col-md-8 offset-md-2">

                            <section className="msger">
                                <div className="msger-header">
                                    <div className="msger-header-title">
                                        Start a conversation !
                                </div>
                                </div>

                              
                                        <main className="msger-chat" ref={messageEl}>
                                        {
                                         loading ? 
                                    <>
                                        {
                                           ! chaterror ?
    
                                                getmessage.map(item => {
                                                    // let admin = (item.user_id=='admin')
                                                    // console.log('chatid',item)
                                                    if (item.user_id=="admin"){
                                                        return (
    
                                                            <div className="msg left-msg">
                                                                <div className="msg-img">
                                                                    <img src={axios.defaults.baseImageURL + item.image} alt="" />
                                                                </div>
    
                                                                <div className="msg-bubble">
                                                                    <div className="msg-info">
                                                                        <div className="msg-info-name">{item.fullname}</div>
                                                                        <div className="msg-info-time">{item.time}</div>
                                                                    </div>
    
                                                                    <div className="msg-text">
                                                                    {item.message}
                                                                </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className="msg right-msg">
                                                                <div className="msg-img">
                                                                    <img src={axios.defaults.baseImageURL + item.image} alt="" />
                                                                </div>
                                                                <div className="msg-bubble">
                                                                    <div className="msg-info">
                                                                        <div className="msg-info-name">{item.fullname}</div>
                                                                        <div className="msg-info-time">{item.time}</div>
                                                                    </div>
        
                                                                    <div className="msg-text">
                                                                        {item.message}
        
                                                                    </div>
                                                                </div>
                                                            </div>
        
                                                        )
                                                    } 
                                                   
                                                })
                                                
                                                :
                                        
                                                <div className="nochatimg">
                                                    <img src={chat} alt=""/>
                                                    <p>No chats available !</p>
                                                </div>
                                             
                                            }
                                            </>

                                            : 
                                            <div className="chatspinner">
                                                <Spinner animation="border"></Spinner>
                                            </div>
                                        }
                                </main>
                                   
                               
                           

                            <form className="msger-inputarea" onSubmit={(event) => SendMsg(event)}>
                                    <input type="text" className="msger-input form-control" placeholder="Enter your message..." onChange={(event) => setmessage(event.target.value)} />
                                    <button type="submit" className="msger-send-btn">Send</button>
                                </form>
                            </section>

                        </div>
                        

                    </div>
                </div>
            </section>
        </>
    );

}

export default MessageUs;


// class MessageUs extends React.Component{

//     constructor(){
//         super()
//         this.state={
//             message:"",
//         }
//     }

//      SendMsg = async (event) => {
//         event.preventDefault();
//         // alert(message)
//         var token = localStorage.getItem('user-token');
//         const config = {
//             headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
//         };
       
//         await axios.post('users/chat', config)
//             .then(result => {
//                 if (result.data.status == true) {
//                     // componentDidMount();
//                     // setMessage(result.data.data.message)
//                 }
//             })
//             event.target.reset();
//         // console.log("chat",mymessage.message)
//     }

     

//     async componentDidMount (){
      
//             var token = localStorage.getItem('user-token');
//             const config = {
//                 headers: { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-type": "application/json" }
//             };
//             await axios.get('users/get-chat', config)
//                 .then(result => {
//                     if (result.data.status = true) {
//                         this.setState(result.data)
//                     }
//                 })
//             console.log("getchat", this.state)
       
//     }

//     render(){
//         return(
//             <>
//             <Header />
//             <section className="Messageus">
//                 <div className="container">
//                     <div className="section-title">
//                         <h3>Message us</h3>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-8 offset-md-2">

//                             <section className="msger">
//                                 <div className="msger-header">
//                                     <div className="msger-header-title">
//                                         Send a message !
//                                 </div>
//                                 </div>

//                                 <main className="msger-chat">

//                                     {
//                                         this.state.message ?

//                                             this.state.message.map(item => {
//                                                 // let admin = (item.user_id=='admin')
//                                                 // console.log('chatid',item)
//                                                 if (item.user_id=="admin"){
//                                                     return (

//                                                         <div className="msg left-msg" id="messagescroll">
//                                                             <div className="msg-img">
//                                                                 <img src={axios.defaults.baseImageURL + item.image} alt="" />
//                                                             </div>

//                                                             <div className="msg-bubble">
//                                                                 <div className="msg-info">
//                                                                     <div className="msg-info-name">{item.fullname}</div>
//                                                                     <div className="msg-info-time">{item.time}</div>
//                                                                 </div>

//                                                                 <div className="msg-text">
//                                                                 {item.message}
//                                                             </div>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 }else{
//                                                     return (
//                                                         <div className="msg right-msg" id="messagescroll">
//                                                             <div className="msg-img">
//                                                                 <img src={axios.defaults.baseImageURL + item.image} alt="" />
//                                                             </div>
//                                                             <div className="msg-bubble">
//                                                                 <div className="msg-info">
//                                                                     <div className="msg-info-name">{item.fullname}</div>
//                                                                     <div className="msg-info-time">{item.time}</div>
//                                                                 </div>
    
//                                                                 <div className="msg-text">
//                                                                     {item.message}
    
//                                                                 </div>
//                                                             </div>
//                                                         </div>
    
//                                                     )
//                                                 } 
                                               
//                                             })
                                            
//                                             :
//                                             <p>Send a quick message to start your conversion</p>
//                                         }
//                             </main>
                           

//                                 <form className="msger-inputarea" onSubmit={(event) => this.SendMsg(event)}>
//                                     <input type="text" className="msger-input form-control" placeholder="Enter your message..." onChange={(event) => this.setState(event.target.value)} />
//                                     <button type="submit" className="msger-send-btn">Send</button>
//                                 </form>

//                             </section>

//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//         );
//     }
// }

// export default MessageUs;