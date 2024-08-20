import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import App from "../App/App";
import MainLayout from "../Layout/MainLayout";
import Orders from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";
import Marketing from "../pages/Marketing/Marketing";
import Store from "../pages/Store/Store";
import Apps from "../pages/Apps/Apps";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Index";
import Login from "../pages/Login/login";


const RouterTree = () => {
  return createBrowserRouter([
     {
      path: '/app',
      element:<MainLayout/>,
      errorElement:<ErrorPage />,
      children:[
        {
          index:true,
          element:<App />
        },
        {
          path:'/app/orders',
          element:<Orders/>
        } , 
        {
          path:'/app/products',
          element:<Products/>
        }, 
        {
          path:'/app/analytics',
          element:<Analytics />
        },
        {
          path:'/app/marketing',
          element:<Marketing/>
        },
        {
          path:'/app/store',
          element:<Store/>
        },
        {
          path:'/app/apps',
          element:<Apps/>
        },
        {
          path:'/app/settings',
          element:<Settings />
        }
      ]
     },
     {
      path:'/',
      element:<Login/>,
      errorElement:<ErrorPage/>,
     }
  ]);
}

export default RouterTree
