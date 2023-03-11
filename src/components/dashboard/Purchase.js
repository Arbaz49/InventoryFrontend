import React, { useState } from "react";
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
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateChange } from "../../Redux/AlertSlice";
import image from "../../updated.jpg";
import { toast } from "react-toastify";

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

function BasicTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "black", color: "white" }}>
          <TableRow>
            {[
              "Name",
              "Category",
              "Purchased From",
              "Purchase Date",
              "Price",
              "Quantity",
              "Total",
            ].map((head, index) => {
              return (
                <TableCell
                  style={{ color: "white" }}
                  key={index}
                  align={index === 0 ? "left" : "right"}
                >
                  {head}
                </TableCell>
              );
            })}
            {/* <TableCell style={{color:"white",width:"150px"}} align={"center"}>edit/delete</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.productName}
              </TableCell>
              <TableCell align="right">{row?.category}</TableCell>
              <TableCell align="right">{row?.supplier}</TableCell>
              <TableCell align="right">
                {new Date(row?.createdAt).toDateString()}
              </TableCell>

              <TableCell align="right">{row?.price}</TableCell>
              <TableCell align="right">{row?.quantity}</TableCell>
              <TableCell align="right">
                {Number(row?.quantity) * Number(row?.price)}
              </TableCell>

              {/* <TableCell align="center"><Button>edit</Button> <Button>delete</Button></TableCell> */}
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
  const [purchaseInfo, setpurchaseInfo] = useState({
    productName: "",
    price: "",
    quantity: 0,
    supplier: "",
    category: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setpurchaseInfo({ ...purchaseInfo, [e.target.name]: e.target.value });
  };

  const handlePurchase = async () => {
    console.log(purchaseInfo);
    try {
      let authToken = localStorage.getItem("token");
      const order = await axios.post(
        "https://inventorybackend-otug.onrender.com/payment/checkout",
        { amount: Number(purchaseInfo.price) * Number(purchaseInfo.quantity) },
        {
          headers: { token: `Bearer ${authToken}` },
        }
      );
      console.log(order.data.order.amount);
      const options = {
        key: "rzp_test_qJEvwm7xnj6UXg",
        amount: order.data.order.amount,
        currency: "INR",
        name: "Inventory Management By Arbaz Solkar",
        description: "Test Transaction",
        image: image,
        // redirect:true,
        order_id: order.data.order.id,
        // callback_url:"http://localhost:8000/payment/verification",
        handler: function (response) {
          axios
            .post("https://inventorybackend-otug.onrender.com/payment/verification", response)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000000",
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.open();

      const data = await axios.post(
        "https://inventorybackend-otug.onrender.com/purchase/newpurchase",
        purchaseInfo,
        {
          headers: { token: `Bearer ${authToken}` },
        }
      );
      setOpen(false);
      setpurchaseInfo({
        productName: "",
        price: "",
        quantity: 0,
        supplier: "",
        category: "",
      });
      dispatch(updateChange());

      console.log(data);
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ color: "white" }}
      >
        Purchase
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
            Purchase New
          </Typography>
          <Box>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                label="Product Name"
                value={purchaseInfo?.productName}
                name="productName"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Product Category"
                value={purchaseInfo?.category}
                name="category"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Price"
                onChange={(e) => handleChange(e)}
                value={purchaseInfo?.price}
                name="price"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="quantity"
                onChange={(e) => handleChange(e)}
                value={purchaseInfo?.quantity}
                name="quantity"
                type={"number"}
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <TextField
                id="standard-basic"
                label="supplier"
                onChange={(e) => handleChange(e)}
                value={purchaseInfo?.supplier}
                name="supplier"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handlePurchase}
              >
                Purchase
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const Purchase = () => {
  const [search, setSearch] = useState("");
  const [purchase, setpurchase] = useState([]);
  // const dispatch=useDispatch();
  const update = useSelector((state) => state.AlertSlice.update);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      setLoading(true);

      const data = await axios("https://inventorybackend-otug.onrender.com/purchase/getallpurchase");
      setpurchase(data.data.data);
      console.log(data.data.data);
      setLoading(false);
    };
    getdata();
  }, [update]);

  return (
    <div className="productsDiv">
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Purchase</h1>
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
        <BasicTable data={purchase} />
      </div>
      {/* <h3>total 5 products</h3> */}
    </div>
  );
};

export default Purchase;
