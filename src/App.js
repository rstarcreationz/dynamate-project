import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import './scss/style.scss';
import './scss/admin.css';
import './scss/_custom.scss';
import Mylogin from './Components/FrontForm/Mylogin';
import Signup from './Components/FrontForm/Signup';
import ForgetPassword from './Components/FrontForm/ForgetPassword';
import UpdatePassword from './Components/FrontForm/UpdatePassword';
import FrontHome from "./Components/FrontHome/index"
import JobsiteView from './Components/Jobsite/JobsiteView';
import JobsiteDetail from './Components/Jobsite/JobsiteDetail';
import TransfermatDetail from "./Components/Jobsite/TransfermatDetail";
import OrderMats from "./Components/Jobsite/OrderMats";
import Order from "./Components/Products/Order";
import ProductList from "./Components/Products/ProductList";
import YardView from './Components/Products/YardView';
import Totalmates from './Components/Products/Totalmates';
import Matesuse from './Components/Products/Matesuse';
import ProfileLayout from './Components/Profile/ProfileLayout';
import AddManager from "./Components/Products/AddManager"
import YardAdd from "./Components/Jobsite/YardAdd"
import EditProjectManager from "./Components/Products/EditProjectManager"
import Output from "./Components/Jobsite/Output"
import axios from "axios";
import ProtectedRoutes from "./ProtectedRoutes"
import EditJobsite from './Components/Jobsite/EditJobsite';
import ManagerJobsiteDetail from './Components/Jobsite/ManagerJobsiteDetail';
import PageNotFound from './Components/PageNotFound';
import Contact from "./Components/FrontHome/Contact"
import MessageUs from './Components/FrontHome/MessageUs';
import ProjectManager from './Components/Products/ProjectManager';
import ProductDetail from './Components/Products/ProductDetail';


// import Header from "./Components/Header"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

  export const mainAxios = axios.create({
    baseURL: 'https://dynamte.mobidudes.com/'
  });

const App = () => {


    return (
      <>
      
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>

            <Route exact path="/">
              <ProtectedRoutes Cmp={FrontHome} />
            </Route> 

            <Route exact path="/Dynamate">
              <ProtectedRoutes Cmp={FrontHome} />
            </Route>

            <Route exact path="/jobsite_view">
              <ProtectedRoutes Cmp={JobsiteView} />
            </Route>

            <Route exact path="/edit_jobsite/:id">
              <ProtectedRoutes Cmp={EditJobsite} />
            </Route>

            <Route exact path="/jobsite_detail/:id">
              <ProtectedRoutes Cmp={JobsiteDetail} />
            </Route>

            <Route exact path="/jobsite_detail_manager">
              <ProtectedRoutes Cmp={ManagerJobsiteDetail} />
            </Route>

            <Route exact path="/transfer_mat_view/:tab_id/:id">
              <ProtectedRoutes Cmp={TransfermatDetail} />
            </Route>

            <Route exact path="/yard_view/order_mat">
              <ProtectedRoutes Cmp={OrderMats} />
            </Route>

            <Route exact path="/order_list">
             <ProtectedRoutes Cmp={Order} />
            </Route>

            <Route exact path="/product_list">
              <ProtectedRoutes Cmp={ProductList} />
            </Route>

            <Route exact path="/product_detail/:id">
              <ProtectedRoutes Cmp={ProductDetail} />
            </Route>

            <Route exact path="/yard_view">
            <ProtectedRoutes Cmp={YardView} />
            </Route>

            <Route exact path="/total_mates">
              <ProtectedRoutes Cmp={Totalmates} />
            </Route>

            <Route exact path="/mates_uses">
              <ProtectedRoutes Cmp={Matesuse} />
            </Route>

            <Route exact path="/yard_view/yard_add">
              <ProtectedRoutes Cmp={YardAdd} />
            </Route>

            <Route exact path="/add_project_manager">
              <ProtectedRoutes Cmp={AddManager} />
            </Route>

            <Route exact path="/edit_project_manager/:id">
              <ProtectedRoutes Cmp={EditProjectManager} />
            </Route>

            <Route exact path="/output">
              <ProtectedRoutes Cmp={Output} />
            </Route>

            <Route exact path="/contact">
              <ProtectedRoutes Cmp={Contact} />
            </Route>

            <Route exact path="/message_us">
              <ProtectedRoutes Cmp={MessageUs} />
            </Route>

            <Route exact path="/project_manager">
              <ProtectedRoutes Cmp={ProjectManager} />
            </Route>
            
              <Route exact path="/login" component={Mylogin}></Route>
              <Route exact path="/signup" component={Signup}></Route>
              <Route exact path="/forgetpassword" component={ForgetPassword}></Route>
              <Route exact path="/setpassword/:token" component={UpdatePassword}></Route>

              <Route path="/myprofile" name="My Profile" >
                <ProtectedRoutes Cmp={props => <ProfileLayout {...props}/>} />
              </Route>

              <Route path="*">
                <ProtectedRoutes Cmp={PageNotFound} />
              </Route>
          
              <Route path="*" component={PageNotFound}></Route>
            </Switch>
          </React.Suspense>
      </HashRouter>
      
      </>
    );
}

export default App ;

