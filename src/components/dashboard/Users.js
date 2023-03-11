import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { updateChange } from "../../Redux/AlertSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  p: 4,
};
//table

 function BasicTable({data}) {
  const dispatch=useDispatch();

  const handledelete=async(id)=>{
    console.log(id)
    try{
      let authToken=localStorage.getItem("token");
      let update=await axios.delete(`http://localhost:8000/api/v1/auth/delete/${id}`,{headers:{token:`Bearer ${authToken}`} })
      toast.success(update.data.message)
      dispatch(updateChange())
    }catch(e){
      toast.error(e.message)
      console.log(e)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"black",color:"white"}}>
          <TableRow >
            {
              ["name","PhoneNo","email","admin"].map((head,index)=>{
                return(

                  <TableCell style={{color:"white"}} key={index} align={index=== 0 ?"left":"right"}>{head}</TableCell>
                )
              })
            }
                  <TableCell style={{color:"white",width:"150px"}} align={"center"}>edit/delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="right">{row?.phoneNo}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.isAdmin?"yes":"no"}</TableCell>
              {/* <TableCell align="center"><Link to ={`/edituser/${row._id}`}>edit</Link> <Button onClick={()=>handledelete(row._id)}>delete</Button></TableCell> */}
              <TableCell
                align="right"
                style={{ display: "flex", height: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "green" }}
                  to={`/edituser/${row._id}`}
                >
                  <EditIcon />
                </Link>{" "}
                <Button onClick={() => handledelete(row._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


//=---------------------------------------------------------------------------------
//modal
function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userInfo,setuserInfo]=useState({
    name:"",
    email:"",
    password:0,
    phoneNo:0,
    bio:""
  })
const handleChange=(e)=>{
  setuserInfo({...userInfo,[e.target.name]:e.target.value})
}
const dispatch=useDispatch();
const handleAddUser=async()=>{
  try{
    let  authToken=localStorage.getItem('token');
    console.log(authToken)
    const data=await axios.post("http://localhost:8000/api/v1/auth/register",userInfo,{
      token:`Bearer ${authToken}`,
      // const dispatch=useDispatch();
    })
    dispatch(updateChange());
    setOpen(false)
      console.log(data);
  }catch(e){
    console.log(e.message)
  }

}
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ color: "white" }}
      >
        Add User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
  
      >
        <Box sx={style} style={{ opacity: "0.9", borderRadius: "12px",marginBottom:"10px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <Box>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                label="Name"
                value={userInfo.name}
                name="name"
                variant="outlined"
                onChange={(e)=>handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="email"
                required="true"
                onChange={(e)=>handleChange(e)}
                value={userInfo.email}
                name="email"
                type="email"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="password"
                onChange={(e)=>handleChange(e)}
                value={userInfo.password}
                name="password"
                type={"password"}
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
           
                <TextField
                id="standard-basic"
                label="phoneNo"
                onChange={(e)=>handleChange(e)}
                value={userInfo.phoneNo}
                name="phoneNo"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
                <TextField
                id="standard-basic"
                label="bio"
                onChange={(e)=>handleChange(e)}
                value={userInfo.bio}
                name="bio"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <Button style={{backgroundColor:"black",color:"white"}} onClick={handleAddUser}>add</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const Users = () => {
  const [search,setSearch]=useState("");
  const  [users,setUsers] = useState([]);
  const dispatch=useDispatch();
  const update=useSelector((state)=>state.AlertSlice.update)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const getdata=async()=>{
      setLoading(true)
      const {data}=await axios("http://localhost:8000/api/v1/auth/allusers");
      console.log(data.data)
      setUsers(data.data);
      setLoading(false)
}
getdata();
  },[update])

  return (
    <div className="productsDiv">
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Users</h1>
      <span
        variant="filled"
        style={{
          backgroundColor: "black",
          color: "white",
          float: "right",
          borderRadius:"12px",
          marginBottom: "20px",
        }}
      >
        <BasicModal />
      </span>
      {loading ? <CircularProgress thickness={5} /> : <></>}

      <div className="table">
        <TextField
          id="standard-basic"
          label="Search User..."
          variant="outlined"
          value={search}
          style={{ width: "100%", marginBottom: "30px" }}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <BasicTable data={users}/>
      </div>
      <h3>total {users?.length} Users</h3>
    </div>
  );
};

export default Users;
