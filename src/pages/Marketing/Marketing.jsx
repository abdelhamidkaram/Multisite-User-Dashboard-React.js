import Facebook from "../../assets/icons/facebook.svg";
import Linkedin from "../../assets/icons/linkedin.svg";
import google from "../../assets/icons/google-178-svgrepo-com.svg";
import Snapchat from "../../assets/icons/snapchat.svg";
import Coupon from "../../assets/icons/coupon.svg";
import Comment from "../../assets/icons/comment.svg";
import useModal from "../../store/useModal";

const Marketing = () => {
  return (
    <div className=" md:flex md:justify-center md:py-24 py-3 ">   
      <div className="md:container xl:w-[1000px] md:flex md:flex-wrap md:justify-start md:gap-6 text-white ">
        <MarketingItem title={"فيسبوك بيكسل"} icon={Facebook} modalName={'facebook'} />
        <MarketingItem title={"لينكدان بيكسل"} icon={Linkedin} modalName={'linkedin'}/>
        <MarketingItem title={"سناب شات بيكسل"} icon={Snapchat} modalName={'snapchat'} />
        <MarketingItem title={"جوجل أدز بيكسل"} icon={google} modalName={'google'}/>
        <MarketingItem title={" الخصومات "} icon={Coupon} modalName={'coupons'} />
        <MarketingItem title={" المراجعات "} icon={Comment} modalName={'reviews'}/>
      </div>
    </div>
  );
};

export default Marketing;

const MarketingItem = ({ icon, title , modalName }) => {
  const { isOpen ,toggle , name , changeName } = useModal();
  return (
    <div
      onClick={() => {
        if (!isOpen && name != modalName) {
          changeName(modalName)
        }
        toggle(!isOpen);
        
      }}
      className="m-5 lg:w-1/4 md700:w-1/2 mb-1 rounded-md cursor-pointer bg-white shadow-md flex  justify-start p-8 text-blue-dark gap-2 hover:border hover:border-blue-light  "
    >
      <img src={icon} className="bg-blue-light w-10 p-2 rounded-md" />
      <h2>{title}</h2>
    </div>
  );
};
