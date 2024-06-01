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
      path: 'store-controll/',
      element:<MainLayout/>,
      errorElement:<ErrorPage />,
      children:[
        {
          index:true,
          element:<App />
        },
        {
          path:'store-controll/orders',
          element:<Orders/>
        } , 
        {
          path:'store-controll/products',
          element:<Products/>
        }, 
        {
          path:'store-controll/analytics',
          element:<Analytics />
        },
        {
          path:'store-controll/marketing',
          element:<Marketing/>
        },
        {
          path:'store-controll/store',
          element:<Store/>
        },
        {
          path:'store-controll/apps',
          element:<Apps/>
        },
        {
          path:'store-controll/settings',
          element:<Settings />
        }
      ]
     }
  ]);
}

export default RouterTree
