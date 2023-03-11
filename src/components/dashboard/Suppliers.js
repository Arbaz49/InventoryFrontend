import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateChange } from "../../Redux/AlertSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  p: 4,
};
//table

function BasicTable({ data }) {
  const user=useSelector(state=>state.AlertSlice.update);
  const dispatch=useDispatch();
  const handledelete = async (id) => {
    console.log(id);
    try {
      let authToken = localStorage.getItem("token");
      let update = await axios.delete(
        `https://inventorybackend-otug.onrender.com/supplier/delete/${id}`,
        { headers: { token: `Bearer ${authToken}` } }
      );
      toast.success(update.data.message);
      dispatch(updateChange())
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "black", color: "white" }}>
          <TableRow>
            {["companyName", "phone", "email", "address", "state", "zip"].map(
              (head, index) => {
                return (
                  <TableCell
                    style={{ color: "white" }}
                    key={index}
                    align={index === 0 ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                );
              }
            )}
            <TableCell
              style={{ color: "white", width: "150px" }}
              align={"center"}
            >
              edit/delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.companyName}
              </TableCell>
              <TableCell align="right">{row?.phone}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.address}</TableCell>
              <TableCell align="right">{row?.state}</TableCell>
              <TableCell align="right">{row?.zip}</TableCell>

           
              <TableCell
                align="right"
                style={{ display: "flex", height: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "green" }}
                  to={`/editsupplier/${row._id}`}
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
  const [supplierInfo, setsupplierInfo] = useState({
    companyName: "",
    phone: 0,
    email: "",
    address: "",
    country: "",
    state: "",
    zip: 0,
  });
  const handleChange = (e) => {
    setsupplierInfo({ ...supplierInfo, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleAddProduct = async () => {
    try {
      let authToken = localStorage.getItem("token");
      const data = await axios.post(
        "https://inventorybackend-otug.onrender.com/supplier/newsupplier",
        supplierInfo,
        {
          headers: { token: `Bearer ${authToken}` },
        }
      );
      dispatch(updateChange());

      setOpen(false);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ color: "white" }}
      >
        Add Supplier
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ opacity: "0.9", borderRadius: "12px", marginBottom: "10px" }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Supplier
          </Typography>
          <Box style={{ display: "flex" }}>
            <div style={{ width: "49%" }}>
              {/* style={{ display: "flex", flexDirection: "column" }} */}
              <TextField
                id="standard-basic"
                label="company Name"
                value={supplierInfo.companyName}
                name="companyName"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Phone Number"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.phone}
                name="phone"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Email address"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.email}
                type="email"
                name="email"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <TextField
                id="standard-basic"
                label="Address"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.address}
                name="address"
                type="text"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handleAddProduct}
              >
                add
              </Button>
            </div>
            <div style={{ width: "49%", marginLeft: "10px" }}>
              <TextField
                id="standard-basic"
                label="Country"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.country}
                name="country"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <TextField
                id="standard-basic"
                label="Zip Code"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.zip}
                name="zip"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="State"
                onChange={(e) => handleChange(e)}
                value={supplierInfo.state}
                name="state"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const [suppliers, setsuppliers] = useState([]);
  const update = useSelector((state) => state.AlertSlice.update);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      setLoading(true);
      const data = await axios(
        "https://inventorybackend-otug.onrender.com/supplier/getallsuppliers"
      );
      setsuppliers(data.data.data);
      console.log(data.data.data);
      setLoading(false);
    };
    getdata();
  }, [update]);

  return (
    <div className="productsDiv">
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Suppliers</h1>
      <span
        variant="filled"
        style={{
          backgroundColor: "black",
          color: "white",
          float: "right",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <BasicModal />
      </span>
      {loading ? <CircularProgress thickness={5} /> : <></>}

      <div className="table">
        <TextField
          id="standard-basic"
          label="Search Suppplier..."
          variant="outlined"
          value={search}
          style={{ width: "100%", marginBottom: "30px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <BasicTable data={suppliers} />
      </div>
      <h3>total {suppliers.length} suppliers</h3>
    </div>
  );
};

export default Suppliers;
