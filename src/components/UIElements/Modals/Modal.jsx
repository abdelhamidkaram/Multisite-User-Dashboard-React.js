import CloseIcon from "../../../assets/icons/close.svg";
import useModal from "../../../store/useModal";
import CouponsModal from "./Markting/CouponsModal";
import FacebookModal from "./Markting/FacebookModal";
import GoogleModal from "./Markting/GoogleMosal";
import LinkedinModal from "./Markting/LinkedinModal";
import ReviewsModal from "./Markting/ReviewsModal";
import SnapModal from "./Markting/SnapModal";
import UserModal from "../Modals/orders/UserModal";
import OrderModal from "./orders/OrderModal";
import ProductModal from "./Products/ProductModal";
import AddProductModal from "./Products/AddProductModal";
import CategoryModal from "./Products/CategoryModal";
import AddCategoryModal from "./Products/AddCategories";
import ThemeModal from "./Store/ThemeModal";
import AddMenuModal from "./Store/AddMenuModal";
import EditMenuModal from "./Store/EditMenuModal";
import AddPageModal from "./Store/AddPageModal";
import EditPageModal from "./Store/EditPageModal";
import MediaModal from "./Store/MediaModal";
import OrderDetailsModal from "./orders/orderDetails";
import ProductDetailsModal from "./Products/productDetails";
const Modal = ({ onClose }) => {
  const { isOpen, toggle, name } = useModal();
  const modals = {
  
    //START MARKETING PAGE MODAL====================
    facebook: <FacebookModal />,
    snapchat: <SnapModal />,
    google: <GoogleModal />,
    linkedin: <LinkedinModal />,
    coupons: <CouponsModal />,
    reviews: <ReviewsModal />,
    // Order PAGE MODAL=================================
    order: <OrderModal/>,
    user: <UserModal />,
    showOrder:<OrderDetailsModal/>,
    // Product PAGE MODAL===============================
    product:<ProductModal/> ,
    addProduct:<AddProductModal /> ,
    showProduct:<ProductDetailsModal /> ,
    // Categories
    category:<CategoryModal />,
    addCategory:<AddCategoryModal/>,
    // Store PAGE MODAL================================
    theme:<ThemeModal />,
    //menus
    menus: <EditMenuModal />,
    addMenu:<AddMenuModal/>,
    //pages 
    pages: <EditPageModal/>,
    addPage:<AddPageModal /> ,
   
    mediaView: <MediaModal />,
   
    apps: <p>Apps</p>,
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
          <div className="max-h-[80vh] overflow-y-scroll mt-5 min-w[350px]">
          {modals[name]}
          </div>

          <button onClick={handleClose}>
            <img src={CloseIcon} className="w-6 absolute end-1 top-1  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
