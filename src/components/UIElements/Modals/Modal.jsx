import CloseIcon from "../../../assets/icons/close.svg";
import useModal from "../../../store/useModal";
import UserModal from "./UserModal";
const Modal = ({ onClose }) => {
  const { isOpen, toggle, name  } = useModal();
  const modals = {
    //TODO:
    facebook: <p>facebook</p>,
    snapchat: <p>snapchat</p>,
    google: <p>google</p>,
    linkedin: <p>linkedin</p>,
    coupons: <p>coupons</p>,
    reviews: <p>reviews</p>,
    menus: <p>menus</p>,
    mediaView: <p>mediaView</p>,
    pages: <p>pages</p>,
    apps: <p>Apps</p>,
    user: <UserModal />,
    shippingZone:<p>ShippingZone</p>,
    method:<p>method</p>,
  };
  const handleClose = () => {
    toggle(false);
    onClose ? onClose() : null ;
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} `}>
      <div
        onClick={handleClose}
        className={` fixed  flex justify-center z-10 items-center  text-white top-0 bottom-0 left-0 right-0  bg-blue-dark bg-opacity-50`}
        style={{ zIndex: 99 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" fixed flex flex-col  justify-between items-center bg-white  min-h-96 min-w-72 p-5 m-5 rounded-md shadow-2xl  text-slate-900 "
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
