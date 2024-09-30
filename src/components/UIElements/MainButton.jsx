import { NavLink } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const MainButton = ({ isActive, text, ClickHandler, danger, loading , to}) => {
  const newLocal = <button
    onClick={() => {
      ClickHandler ? ClickHandler() : null;
    } }
    className={`${isActive ? "bg-green-500" : "bg-blue-light"} ${danger ? "bg-red-600" : null} py-2 px-4 rounded-md text-white font-bold `}
    disabled={isActive}
  >
    {loading ? <PropagateLoader color="white" size={10} /> : text}
  </button>;
  return (
    to? 
    <NavLink to={to ? to : null}>
      {newLocal}
    </NavLink> : newLocal

  ) ;
};

export default MainButton;
