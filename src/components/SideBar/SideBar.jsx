import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";
import HomeIcon from "../../assets/icons/home.svg";
import BagIcon from "../../assets/icons/bag.svg";
import Analytics from "../../assets/icons/analytics.svg";
import OrdersIcon from "../../assets/icons/broduct.svg";
import Marketing from "../../assets/icons/marketing.svg";
import Store from "../../assets/icons/store.svg";
import Apps from "../../assets/icons/apps.svg";
import Setting from "../../assets/icons/setting.svg";
import SelectedIcon from "../../assets/icons/select.svg";
import usePageTitle from "../../store/PageTitle";
import useSideBarToggle from "../../store/ToggleSidebar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import ClickAwayListener from "react-click-away-listener";

const SideBar = ({ onClick }) => {
  const isOpen = useSideBarToggle((state) => state.isOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SideNavLi = ({ icon, name, to }) => {
    return (
      <li className="mb-2">
        <NavLink to={to}>
          {({ isActive }) => (
            <SideItem isActive={isActive} name={name} icon={icon} />
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <div>
      <nav
        className={`p-3 fixed z-50 bottom-0 md:start-0 end-0 ${
          isOpen ? "w-60" : "w-20"
        } h-screen bg-blue-dark duration-700 hidden md:block`}
      >
        <img />
        <h1
          className={`text-lg py-4 font-base font-bold text-blue-light text-center ${
            isOpen ? "text-4xl duration-700 " : "text-sm duration-700 "
          }`}
        >
          متكامــل
        </h1>
        <img
          className={`absolute md:end-0 cursor-pointer z-40 md:-me-3 -mt-9 rounded-full border-2 size-7 border-blue-dark bg-blue-dark ${
            isOpen ? "rotate-180" : ""
          } duration-700`}
          src={Arrow}
          onClick={onClick}
        />

        <div className="bg-slate-500 h-px align-middle items-center mb-3 "></div>

        <ul className={"h-full "}>
          <SideNavLi name={"لوحة التحكم "} icon={HomeIcon} to={"/app"} />
          <SideNavLi name={"المنتجات"} icon={BagIcon} to={"products"} />
          <SideNavLi name={"الطلبات"} icon={OrdersIcon} to={"orders"} />
          <SideNavLi name={"التسويق"} icon={Marketing} to={"marketing"} />
          <SideNavLi name={"المتجر"} icon={Store} to={"store"} />
          <SideNavLi name={"التطبيقات"} icon={Apps} to={"apps"} />
          <SideNavLi name={"الإحصائيات"} icon={Analytics} to={"analytics"} />
          <SideNavLi
            name={"الإعدادات"}
            icon={Setting}
            to={"settings"}
            className={"fixed bottom-10"}
          />
        </ul>
      </nav>

      <button
        className="fixed bottom-5 right-5 z-50 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <AiOutlineMenu size={24} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <ClickAwayListener onClickAway={() => setMobileOpen(false)}>
            <nav className="fixed top-0 right-0 w-60 h-screen bg-blue-dark p-3 transition-transform transform translate-x-0 duration-500 ease-in-out">
              <h1 className="text-lg py-4 font-base font-bold text-blue-light text-center">
                متكامــل
              </h1>
              <ul className="h-full">
                <SideNavLi name={"لوحة التحكم "} icon={HomeIcon} to={"/app"} />
                <SideNavLi name={"المنتجات"} icon={BagIcon} to={"products"} />
                <SideNavLi name={"الطلبات"} icon={OrdersIcon} to={"orders"} />
                <SideNavLi name={"التسويق"} icon={Marketing} to={"marketing"} />
                <SideNavLi name={"المتجر"} icon={Store} to={"store"} />
                <SideNavLi name={"التطبيقات"} icon={Apps} to={"apps"} />
                <SideNavLi name={"الإحصائيات"} icon={Analytics} to={"analytics"} />
                <SideNavLi name={"الإعدادات"} icon={Setting} to={"settings"} />
              </ul>
            </nav>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

export default SideBar;

const SideItem = ({ name, icon, isActive }) => {
  const open = useSideBarToggle((state) => state.isOpen);
  const setTitle = usePageTitle((state) => state.setTitle);
  if (isActive) {
    setTitle(name);
  }

  return (
    <div
      className={`${
        isActive
          ? "side-item-active flex justify-between gap-3 text-white font-bold duration-75"
          : "flex gap-2 mb-2 side-item text-white"
      }`}
    >
      <div className="flex gap-4">
        <img
          src={icon}
          className={`${
            open ? "w-5" : "w-8"
          } ${isActive ? "w-[2rem] items-center duration-1000" : ""}`}
        />
        <span>{open ? name : ""} </span>
      </div>
      {isActive ? (
        <img src={SelectedIcon} width={`${open ? "20px" : "5px"}`} />
      ) : (
        ""
      )}
    </div>
  );
};
