import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductsEditPage = () => {
  const[productInfo,setProductinfo]=useState({
    name:"",
    category:"",
    quantity:0,
    price:0,
    description:""
  });
  let {id}=useParams();
  useEffect(()=>{
const getdata=async()=>{
  try{
    let  token=localStorage.getItem('token');
    const config = {
      headers: {token: `Bearer ${token}`} 
    };
    const data=await axios.post(`https://inventorybackend-otug.onrender.com/product/singleproduct/${id}`,{},config)
    setProductinfo(data.data.data);
    console.log(data.data)
  }catch(e){
    console.log(e)
  }
}
getdata();
  },[])
    const handleChange=(e)=>{
      setProductinfo({...productInfo,[e.target.name]:e.target.value})
      }
      
      const handleAddProduct=async()=>{
        // console.log(userInfo);
        try{
          let token=localStorage.getItem("token");
          const config = {
            headers: {token: `Bearer ${token}`} 
          };
          let update=await axios.patch(`http://localhost:8000/product/update/${id}`,productInfo,config)
          toast.success(update.data.message)
          // console.log(update.data)
          setProductinfo({})

        }catch(e){
          toast.error(e.message)
          console.log(e.message)
        }
      }
  return (
    <div>
        <h1>Edit Product</h1>
       <Box style={{width:"50%",margin:"auto",marginTop:"100px"}}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                label="Name"
                value={productInfo.name}
                name="name"
                variant="outlined"
                onChange={(e)=>handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="category"
                required={true}
                onChange={(e)=>handleChange(e)}
                value={productInfo.category}
                name="category"
                type="text"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="quantity"
                onChange={(e)=>handleChange(e)}
                value={productInfo.quantity}
                name="quantity"
                type={"number"}
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
           
                <TextField
                id="standard-basic"
                label="price"
                onChange={(e)=>handleChange(e)}
                value={productInfo.price}
                name="price"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="description"
                onChange={(e)=>handleChange(e)}
                value={productInfo.description}
                name="description"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <Button style={{backgroundColor:"black",color:"white"}} onClick={handleAddProduct}>Update Product</Button>
            </div>
          </Box>
    </div>
  )
}

export default ProductsEditPage
