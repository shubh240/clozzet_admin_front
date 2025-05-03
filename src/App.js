
import './App.css';
import Home from './home/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './login/login';
import Admin from './pages/admin/admin';
import Register from './register/register';
import AuthLayout from "./hooks/Authlayout.jsx";
import useVerifyAuth from "./hooks/useVerifyAuth.jsx";

import SellerList from './pages/sellerlist/sellerlist';
import AddNewSeller from './pages/addnewseller/addnewseller';

import DashboardPage from './pages/dashboard/dashboard';
import Overview from './pages/overview/overview.jsx';



 const routes = createBrowserRouter([
   {
     path: "/",
     element: (
       <AuthLayout>
         <Home />
       </AuthLayout>
     ),

     children: [
       {
         path: "/dashboard",
         element: <DashboardPage />,
       },
       {
         path: "/admin",
         element: <Admin />,
       },
       {
         path: "/sellerlist",
         element: <SellerList />,
       },
       {
         path: "/addnewseller",
         element: <AddNewSeller />,
       },
       {
         path: "/view",
         element: <Overview />,
       },
{
      
}
     ],
   },
   {
     path: "/login",
     element: (
       <AuthLayout authentication={false}>
         <Login />
       </AuthLayout>
     ),
   },
   {
     path: "/register",
     element: (
       <AuthLayout authentication={false}>
         <Register />
       </AuthLayout>
     ),
   },
 ]);

function App() {
 
  useVerifyAuth();
  return (
  
      <RouterProvider router={routes} />
     
    
  );
}

export default App;
