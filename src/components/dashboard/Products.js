import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
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
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateChange } from "../../Redux/AlertSlice";

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

const handledelete = async (id) => {
  console.log(id);
  try {
    let authToken = localStorage.getItem("token");
    let update = await axios.delete(
      `https://inventorybackend-otug.onrender.com/product/delete/${id}`,
      { headers: { token: `Bearer ${authToken}` } }
    );
    toast.success(update.data.message);
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

function BasicTable(props) {
  const { data } = props;
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "black", color: "white" }}>
          <TableRow>
            {["name", "category", "price", "quantity", "total"].map(
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
                {row?.name}
              </TableCell>
              <TableCell align="right">{row?.category}</TableCell>
              <TableCell align="right">{row?.price}</TableCell>
              <TableCell align="right">{row?.quantity}</TableCell>
              <TableCell align="right">
                {Number(row?.quantity) * Number(row.price)}
              </TableCell>

              <TableCell
                align="right"
                style={{ display: "flex", height: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "green" }}
                  to={`/editproduct/${row._id}`}
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
  const dispatch = useDispatch();
  // const update=useSelector((state)=>state.AlertSlice.update)
  const [productInfo, setproductInfo] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  const handleChange = (e) => {
    setproductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      let authToken = localStorage.getItem("token");
      const data = await axios.post(
        "https://inventorybackend-otug.onrender.com/product/addproduct",
        productInfo,
        {
          headers: { token: `Bearer ${authToken}` },
        }
      );
      setOpen(false);
      dispatch(updateChange());
      toast(data.data.message);

      console.log(data);
    } catch (e) {
      console.log(e);
      toast.error(e.message)

    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ color: "white" }}
      >
        Add Product
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
            Add Product
          </Typography>
          <Box>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="standard-basic"
                label="Product Name"
                value={productInfo.name}
                name="name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Price"
                onChange={(e) => handleChange(e)}
                value={productInfo.price}
                name="price"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="Category"
                onChange={(e) => handleChange(e)}
                value={productInfo.category}
                name="category"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <TextField
                id="standard-basic"
                label="quantity"
                onChange={(e) => handleChange(e)}
                value={productInfo.quantity}
                name="quantity"
                type="number"
                variant="outlined"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <TextField
                id="standard-basic"
                label="description"
                onChange={(e) => handleChange(e)}
                value={productInfo.description}
                name="description"
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
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const Products = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const update = useSelector((state) => state.AlertSlice.update);

  useEffect(() => {
    const getdata = async () => {
      // setLoading(true)
      setLoading(true);
      const data = await axios("https://inventorybackend-otug.onrender.com/product/getallproducts");
   
      setProducts(data.data.data);
      console.log(data.data.data);
      setLoading(false);
    };

    getdata();
  }, [update]);
  // const price=products.
 

  return (
    <div className="productsDiv">
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Products</h1>
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
          label="Search Product..."
          variant="outlined"
          value={search}
          style={{ width: "100%", marginBottom: "30px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <BasicTable data={products} />
      </div>
      <h3>total {products.length} products</h3>
    </div>
  );
};

export default Products;
