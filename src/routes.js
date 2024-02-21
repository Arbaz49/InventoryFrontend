import App from "./App";
import Alert from "./components/Alert";
import Login from "./components/Auth/Login";
import Products from "./components/dashboard/Products";
import Purchase from "./components/dashboard/Purchase";
import Suppliers from "./components/dashboard/Suppliers";
import Users from "./components/dashboard/Users";
import ProductsEditPage from "./pages/ProductsEditPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import SupplierEditPage from "./pages/SupplierEditPage";
import PaymentSuccess from "./PaymentSuccess";

const routes =[
    {
      path: "/",
      element: <App />,
      // element: <Login />,

      children: [
        {
          path: "",
          element: <Products />,
        },{
          path: "users",
          element: <Users />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "suppliers",
          element: <Suppliers />,
        },
        
        {
          path: "purchase",
          element: <Purchase />,
        },
        {
          path:"/edituser/:id",
          element:<ProfileEditPage/>
        }
        ,
        {
          path:"/editproduct/:id",
          element:<ProductsEditPage/>
        }
        ,
        {
          path:"/editsupplier/:id",
          element:<SupplierEditPage/>
        }
]},{
  path:"/login",
  element:<Login/>
},{
  path:`/paymentSuccess`,
  element:<PaymentSuccess/>
}
  ]


  export {routes}