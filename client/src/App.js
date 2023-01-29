import './App.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ForgetPass from './pages/forgot_pass/ForetPass'


// import react router-dom
import {
  RouterProvider,
  createBrowserRouter,
  Outlet
} from "react-router-dom";
import ResetPass from './pages/reset_pass/ResetPass';
import LoginCode from './pages/login_code/LoginCode';
import Profile from './pages/profile/Profile';
import Verify from './pages/auth/Verify';
import ChangePass from './pages/change_pass/ChangePass';
import Loader from './components/loader/Loader';
import Products from './pages/products/Products';
import AddProduct from './pages/add_product/AddProduct';
import UpdateProduct from './pages/single_product/UpdateProduct';
import UpdateProfile from './pages/update_profile/UpdateProfile';


// layout for the header and footer
const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}


// page routers
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile/>
      },
      {
        path: "/verify/:verificationToken",
        element: <Verify/>
      },
      {
        path: "/changepassword",
        element: <ChangePass/>
      },
      {
        path: "/products",
        element: <Products/>
      },
      {
        path: "/addproduct",
        element: <AddProduct/>
      },
      {
        path: "/updateproduct/:_id",
        element: <UpdateProduct/>
      },
    ] 
  },
  
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }, 
  {
    path: "/forgotpassword",
    element: <ForgetPass/>
  },
  {
    path: "/resetpassword/:resetToken",
    element: <ResetPass/>
  },
  {
    path: "/login-with-code",
    element: <LoginCode/>
  },
  {
    path: "/loader",
    element: <Loader/>
  },
   
  
])


function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
