import CloseIcon from "../../../assets/icons/close.svg";
import useModal from "../../../store/useModal";
import CouponsModal from "./Markting/CouponsModal";
import FacebookModal from "./Markting/FacebookModal";
import GoogleModal from "./Markting/GoogleMosal";
import LinkedinModal from "./Markting/LinkedinModal";
import ReviewsModal from "./Markting/ReviewsModal";
import SnapModal from "./Markting/SnapModal";
import UserModal from "./UserModal";
const Modal = ({ onClose }) => {
  const { isOpen, toggle, name } = useModal();
  const modals = {
    //TODO:
    //START MARKETING PAGE MODAL====================
    facebook: <FacebookModal />,
    snapchat: <SnapModal />,
    google: <GoogleModal />,
    linkedin: <LinkedinModal />,
    coupons: <CouponsModal />,
    reviews: <ReviewsModal />,
    //END MARKETING PAGE MODAL======================
    menus: <p>menus</p>,
    mediaView: <p>mediaView</p>,
    pages: <p>pages</p>,
    apps: <p>Apps</p>,
    user: <UserModal />,
    shippingZone: <p>ShippingZone</p>,
    method: <p>method</p>,
  };
  const handleClose = () => {
    toggle(false);
    onClose ? onClose() : null;
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} `}>
      <div
        onClick={handleClose}
        className={` fixed  flex flex-col justify-center z-10 items-center  text-white top-0 bottom-0 left-0 right-0  bg-blue-dark bg-opacity-50`}
        style={{ zIndex: 99 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" fixed flex  justify-between items-center bg-white  min-h-96 min-w-72 p-5 m-5 rounded-md shadow-2xl  text-slate-900 "
        >
          {modals[name]}

          <button onClick={handleClose}>
            <img src={CloseIcon} className="w-6 absolute end-1 top-1  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
