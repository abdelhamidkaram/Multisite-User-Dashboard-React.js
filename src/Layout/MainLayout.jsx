import { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useSideBarToggle from "../store/ToggleSidebar.js";
import { createPortal } from "react-dom";

const Header = lazy(() => import("../components/Header/index.jsx"));
const SideBar = lazy(() => import("../components/SideBar/SideBar.jsx"));
const Modal = lazy(() => import("../components/UIElements/Modals/Modal.jsx"));

const MainLayout = () => {
  const [sideOpen, setsideOpen] = useState(true);
  const toggleSidebar = useSideBarToggle((state) => state.toggle);
  useEffect(() => {
    if (!localStorage.getItem("starterSteps")) {
      localStorage.setItem("starterSteps", 1);
    }
  }, []);

  return (
    <Fragment>
      <div className="flex  ">
        <SideBar
          isOpen={sideOpen}
          onClick={() => {
            setsideOpen(!sideOpen);
            toggleSidebar(!sideOpen);
          }}
        />

        
          <main
className={` grid w-full py-2 px-5 ${
              sideOpen ? "ms-60" : "ms-20"
            } duration-700`}          >
            <Suspense>
              <Header />
            </Suspense>
            <div className=" grid-cols-12 justify-self-center  container py-10 px-4 ">
              <Outlet />
            </div>
          </main>
        

        {createPortal(<Modal />, document.getElementById("portal"))}

        <Toaster
          position="top-left"
          toastOptions={{
            success: {
              style: {
                background:
                  "linear-gradient(-118deg,rgba(92,150,252,1),rgba(92,150,252,1))",
                minWidth: "280px",
                minHeight: "70px",
              },
            },
            error: {
              style: {
                background:
                  "linear-gradient(-118deg,rgba(92,150,252,1),rgba(92,150,252,1))",
                minWidth: "280px",
                minHeight: "70px",
                color: "white",
                border: "1px solid red",
              },
            },

            loading: {
              style: {
                background:
                  "linear-gradient(-118deg,rgba(92,150,252,1),rgba(92,150,252,1))",
                minWidth: "280px",
                minHeight: "70px",
                color:'white'
              },
            },
          }}
        />
      </div>
    </Fragment>
  );
};

export default MainLayout;
