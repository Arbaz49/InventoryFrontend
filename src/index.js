import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './Redux/store.js'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { routes } from './routes';
import App from './App';
import Alert from './components/Alert';
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter(routes)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <RouterProvider router={router} >
    
       
     </RouterProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals