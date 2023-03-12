import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProfileEditPage = () => {
  const [userinfo,setuserinfo]=useState({});
  let {id}=useParams()
// console.log(id)
  useEffect(()=>{
const getuser=async()=>{
  try{
    let  token=localStorage.getItem('token');
    const config = {
      headers: {token: `Bearer ${token}`} 
    };
    const data=await axios.post(`https://inventorybackend-otug.onrender.com/api/v1/auth/user/${id}`,{},config)
    setuserinfo(data.data.data);
    console.log(data.data)
  }catch(e){
    console.log(e)
  }
  
}
getuser();
  },[])
    const handleChange=(e)=>{
        setuserinfo({...userinfo,[e.target.name]:e.target.value})
      }
      
      const handleEdit=async()=>{
        try{
          let token=localStorage.getItem("token");
          const config = {
            headers: {token: `Bearer ${token}`} 
          };
          let update=await axios.patch(`http://localhost:8000/api/v1/auth/update/${id}`,userinfo,config)
          toast.success(update.data.message)
          // console.log(update.data)
          setuserinfo({})

        }catch(e){
          toast.error(e.message)
          console.log(e.message)
        }
      }
  return (
    <div>
        <h1>Edit User</h1>
       <Box style={{width:"50%",margin:"auto",marginTop:"100px"}}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                label="Name"
                value={userinfo?.name}
                name="name"
                variant="outlined"
                onChange={(e)=>handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="email"
                required={true}
                disabled={true}
                onChange={(e)=>handleChange(e)}
                value={userinfo?.email}
                name="email"
                type="email"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="password"
                onChange={(e)=>handleChange(e)}
                value={""}
                name="password"
                type={"password"}
                disabled={true}
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
           
                <TextField
                id="standard-basic"
                label="phoneNo"
                onChange={(e)=>handleChange(e)}
                value={userinfo?.phoneNo}
                name="phoneNo"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="bio"
                onChange={(e)=>handleChange(e)}
                value={userinfo?.bio}
                name="bio"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <Button style={{backgroundColor:"black",color:"white"}} onClick={handleEdit}>Update</Button>
            </div>
          </Box>
    </div>
  )
}

export default ProfileEditPage
