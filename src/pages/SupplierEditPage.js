import { Button,TextField} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SupplierEditPage = () => {
  const[supplierInfo,setSupplierInfo]=useState({
    companyName:"",
    phone:0,
    email:"",
    address:"",
    country:"",
    state:"",
    zip:""
  });
  let {id}=useParams();
  useEffect(()=>{
    const getdata=async()=>{
      try{
        let  token=localStorage.getItem('token');
        const config = {
          headers: {token: `Bearer ${token}`} 
        };
        const data=await axios.post(`http://localhost:8000/supplier/supplier/${id}`,{},config)
        setSupplierInfo(data.data.data);
        console.log(data.data)
      }catch(e){
        console.log(e)
      }
    }
    getdata();
  },[])
    const handleChange=(e)=>{
      setSupplierInfo({...supplierInfo,[e.target.name]:e.target.value})
    }
    
    const handleAddProduct=async()=>{
      try{
        let token=localStorage.getItem("token");
        const config = {
          headers: {token: `Bearer ${token}`} 
        };
        let update=await axios.patch(`http://localhost:8000/supplier/update/${id}`,supplierInfo,config)
        toast.success(update.data.message)
        // console.log(update.data)
        setSupplierInfo({})

      }catch(e){
        toast.error(e.message)
        console.log(e.message)
      }
    }
      return (
        <div>
            <h1>Edit Supplier</h1>
            {/* 
       <Box style={{width:"50%",margin:"auto",marginTop:"100px"}}></Box> */}
        
        
            <Box style={{width:"50%",margin:"auto",marginTop:"100px"}}>
             
              <Box style={{display:"flex"}}>
                <div style={{width:"49%"}} >
                {/* style={{ display: "flex", flexDirection: "column" }} */}
                  <TextField
                    id="standard-basic"
                    label="company Name"
                    name="companyName"
                    value={supplierInfo.companyName}
                    variant="outlined"
                    onChange={(e)=>handleChange(e)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Phone Number"
                    onChange={(e)=>handleChange(e)}
                    value={supplierInfo.phone}
                    name="phone"
                    type="number"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                    <TextField
                    id="standard-basic"
                    label="Email address"
                    onChange={(e)=>handleChange(e)}
                    value={supplierInfo.email}
                    type="email"
                    name="email"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
               
                    <TextField
                    id="standard-basic"
                    label="Address"
                    onChange={(e)=>handleChange(e)}
                    value={supplierInfo.address}
                    name="address"
                    type="text"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  
                  <Button style={{backgroundColor:"black",color:"white"}} onClick={handleAddProduct}>Update Supplier</Button>
                </div>
                <div style={{width:"49%",marginLeft:"10px"}}> 
                <TextField
                    id="standard-basic"
                    label="Country"
                    onChange={(e)=>handleChange(e)}
                    value={supplierInfo.country}
                    name="country"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
    
                  <TextField
                    id="standard-basic"
                    label="Zip Code"
                    onChange={(e)=>handleChange(e)}
                    value={supplierInfo.zip}
                    name="zip"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                   <TextField
                    id="standard-basic"
                    label="State"
                    onChange={(e)=>handleChange(e)}
                    value={""}
                    name="state"
                    variant="outlined"
                    style={{ width: "100%", marginBottom: "10px" }}
                  /></div>
              </Box>
            </Box>
        
        </div>
      );
}

export default SupplierEditPage
