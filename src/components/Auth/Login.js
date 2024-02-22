import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { updateChange } from '../../Redux/AlertSlice'

const Login = () => {
  // const user=useSelector((state)=>state.userSlice);
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      const { data } = await axios.post("https://inventorybackend-otug.onrender.com/api/v1/auth/login", { email: email, password: password })
      console.log(data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data))
      // dispatch(updateUser(data.data))
      setemail("");
      setpassword("");
      navigate("/")
      dispatch(updateChange())

    } catch (e) {
      toast.error("check your credentials")
    }
  }
  return (
    <div style={{ padding: "20px"}}>
      <Grid style={{ width: "30%", margin: "auto", marginTop: "200px" }}>
        <Paper elevation={10} >
          <Grid align="center" style={{ padding: "10px" }}>

            <Avatar >
              {/* <LockOpenIcon /> */}
            </Avatar>
            <Typography variant="h5" style={{ marginTop: "10px", fontWeight: "bold" }}>
              Login Form
            </Typography>
          </Grid>
          <Grid item style={{ padding: "10px" }}>

            <TextField
              style={{ margin: "10px 0px" }}
              id="standard-basic"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              style={{ margin: "10px 0px" }}
              id="standard-password-input"
              label="Password"

              type="text"
              autoComplete="current-password"
              value={password}
              variant="outlined"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
              fullWidth
            />
            <Grid align="Center">
              <br />
              <Button style={{ width: "40%", margin: "auto", fontWeight: "bold", fontSize: "16px" }} variant="contained" fullWidth onClick={handleSignin}>
                Login
              </Button>
            </Grid>
            <br />

          </Grid>
        </Paper>
      </Grid>
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

export default Login
