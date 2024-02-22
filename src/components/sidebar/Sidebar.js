import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShopIcon from '@mui/icons-material/Shop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Button, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { updateChange } from '../../Redux/AlertSlice'


const Sidebar = () => {
  const dispatch=useDispatch()
const navigate=useNavigate();
const [user,setUser]=useState("")
const update=JSON.parse(useSelector((state)=>state.AlertSlice.update));
useEffect(()=>{
  const token=localStorage.getItem('token');
  if(!token){
    navigate("/login");
  }
},[update])
useEffect(()=>{
  setUser(JSON.parse(localStorage.getItem("user")))
},[])

  const handlelogout=()=>{
    localStorage.clear("token");
    navigate("/login")
    toast.success("logout successfully")
  }
 
  return (
    
    <div className='sidebar'>
      <div style={{height:"100px",marginTop:"20px"}}><AccountCircleIcon style={{width:"100%",height:"90%",color:"white"}} /></div>
      <h3 style={{color:"white",textAlign:"center"}}>{user?.isAdmin?"Admin":"User"}</h3>
      <Typography style={{color:"white",textAlign:"center"}}>Name : {user?.name||null}</Typography>

      <Button style={{color:"white"}} onClick={handlelogout}>Log Out</Button>

      <div className="options">
        <Link to="/"><HomeIcon/> home</Link>
        <Link to="/products"> <ShoppingCartIcon/> Products</Link>
        {/* <Link to="/products">products</Link> */}
        <Link to="/users"><PeopleIcon/> users</Link>
        <Link to="/suppliers"><LocalShippingIcon/> suppliers</Link>
        <Link to="/purchase"><ShopIcon/> Purchase</Link>


      </div>
      <div className="image" style={{width:"100%"}}>
        <img src="https://tse3.mm.bing.net/th?id=OIP.yvCmQSIjrAIsuwAT5xMAxgHaFk&pid=Api&P=0" alt="" width={"100%"} />
      </div>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
  )
}

export default Sidebar
