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


const RouterTree = () => {
  return createBrowserRouter([
     {
      path: '/',
      element:<MainLayout/>,
      errorElement:<ErrorPage />,
      children:[
        {
          index:true,
          element:<App />
        },
        {
          path:'/orders',
          element:<Orders/>
        } , 
        {
          path:'/products',
          element:<Products/>
        }, 
        {
          path:'/analytics',
          element:<Analytics />
        },
        {
          path:'/marketing',
          element:<Marketing/>
        },
        {
          path:'/store',
          element:<Store/>
        },
        {
          path:'/apps',
          element:<Apps/>
        },
        {
          path:'/settings',
          element:<Settings />
        }
      ]
     }
  ]);
}

export default RouterTree
