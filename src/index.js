import React, { Suspense } from 'react';
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import axios from 'axios';
import './polyfill'
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { Provider } from 'react-redux'
// import store from './store'


const token = localStorage.getItem('user-token');
// axios.defaults.baseURL = 'https://dynamate.cloudwapp.in/';
axios.defaults.baseURL = 'https://cloudwapp.in/dynamatep/';
axios.defaults.baseImageURL = 'https://cloudwapp.in/Dynamate/admin/backend';
axios.defaults.baseStaticImageURL= 'https://cloudwapp.in';


ReactDOM.hydrate(
  <Suspense fallback={(<div>Loading</div>)}>
     <App useSuspense={true} />
      </Suspense>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
