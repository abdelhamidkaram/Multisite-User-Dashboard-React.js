import usePageTitle from "../../store/PageTitle.js";
import Video from "../../assets/icons/video.svg";
import Survey from "../../assets/icons/survay.svg";
import Show from "../../assets/icons/show.svg";
import Profile from "../../assets/icons/profile.svg";
import Support from "../../assets/icons/support.svg";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const pageTitle = usePageTitle((state) => state.pageTitle);
  const [popup, setPopup] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div>
      <nav className="top-nav flex justify-between items-center px-5 py-3 top-10 h-16 rounded-md shadow-lg sticky bg-slate-50">
        <div className="start-nav">
          <h1 className="font-bold text-lg text-blue-dark">{pageTitle}</h1>
        </div>

        <div className="block lg:hidden">
          <button onClick={() => setHamburgerOpen(!hamburgerOpen)}>
            {hamburgerOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        <div
          className={`end-nav flex-row gap-8 justify-center items-center
           lg:flex hidden `}
        >
          <div className="video-box flex  flex-row gap-2">
            <div>
              <img src={Support} className="w-6" />
            </div>
            <span>الدعم الفني</span>
          </div>
          <div className="video-box flex flex-row gap-2">
            <div className="video-icon">
              <img src={Video} className="w-8" />
            </div>
            <span>شرح المنصة</span>
          </div>
          <div className="video-box flex  flex-row gap-2">
            <div>
              <img src={Survey} className="w-6" />
            </div>
            <span>استطلاع رأي</span>
          </div>
          <a href={localStorage.getItem("path")} target="_blank" >
            <div className="video-box flex  flex-row gap-2 cursor-pointer">
              <div>
                <img src={Show} className="w-6" />
              </div>
              <span>عرض المتجر</span>
            </div>
          </a>

          <div
            className="rounded-full bg-blue-light size-10 cursor-pointer"
            onClick={() => setPopup(true)}
          >
            <img src={Profile} />
            {popup && (
              <div className="fixed w-32 left-1 bg-white shadow-md shadow-gray-400 pt-3 pb-3 pr-3">
                <ClickAwayListener onClickAway={() => setPopup(false)}>
                  <div className="popup">
                    <p
                      className="text-sm font-bold cursor-pointer"
                      onClick={() => {
                        // Clear local storage
                        localStorage.clear();

                        // Clear session storage (if needed)
                        sessionStorage.clear();

                        // Force the browser to fetch the latest version of the page by appending a cache-busting query parameter
                        window.location.href =
                          "https://www.motkaml.online/home/?nocache=true";
                      }}
                    >
                      تسجيل الخروج
                    </p>
                  </div>
                </ClickAwayListener>
              </div>
            )}
          </div>
        </div>
      </nav>

      {hamburgerOpen && (
        <div
          className="fixed inset-0 bg-blue-dark bg-opacity-50 z-50 flex justify-center items-center "
          onClick={() => setHamburgerOpen(false)}
        >
          <div className="bg-white p-5 rounded-lg w-11/12 max-w-sm mx-auto">
            <div className="flex flex-col gap-4">
              <div className="video-box flex  flex-row gap-2">
                <div>
                  <img src={Support} className="w-6" />
                </div>
                <span>الدعم الفني</span>
              </div>
              <div className="video-box flex  flex-row gap-2">
                <div className="video-icon">
                  <img src={Video} className="w-8" />
                </div>
                <span>شرح المنصة</span>
              </div>
              <div className="video-box flex  flex-row gap-2">
                <div>
                  <img src={Survey} className="w-6" />
                </div>
                <span>استطلاع رأي</span>
              </div>
              <div
                className="video-box flex  flex-row gap-2 cursor-pointer"
                onClick={() => {
                  window.location.href = localStorage.getItem("path");
                }}
              >
                <div>
                  <img src={Show} className="w-6" />
                </div>
                <span>عرض المتجر</span>
              </div>
              <div className="popup">
                <p
                  className="text-sm font-bold cursor-pointer"
                  onClick={() => {
                    // Clear local storage
                    localStorage.clear();

                    // Clear session storage (if needed)
                    sessionStorage.clear();

                    // Force the browser to fetch the latest version of the page by appending a cache-busting query parameter
                    window.location.href =
                      "https://www.motkaml.online/home/?nocache=true";
                  }}
                >
                  تسجيل الخروخ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
