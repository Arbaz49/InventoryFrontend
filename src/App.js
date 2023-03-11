import { Outlet } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";


function App() {
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if(token){

      toast.success("Welcome Back!");
    }
  },[])
 

  return (
    <div className="layout">
    
      <Sidebar />
      <div className="right">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            borderBottom: "1px solid black",
            backgroundColor: "rgb(21, 21, 21)",
            width: "100%",
            padding: "10px 0px",
          }}
        >
          INVENTORY MANAGEMENT SYSTEM
        </h1>
        <div style={{ width: "90%", margin: "auto" }}>
          <Outlet />
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
    </div>
  );
}

export default App;
