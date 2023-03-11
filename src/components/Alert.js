import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import {useSelector } from "react-redux";

export default function Alert() {
const alertState=useSelector((state)=>state.AlertSlice);
console.log(alertState);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

 
  };
  return (
    <Snackbar
    open={alertState.open}
    autoHideDuration={3000}
    onClose={handleClose}
  >
    <Alert
      onClose={handleClose}
      elevation={10}
      variant="filled"
      severity={alertState.type}
    >
      {alertState.message}
    </Alert>
  </Snackbar>
  );
}
