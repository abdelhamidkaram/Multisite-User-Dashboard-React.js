import usePageTitle from "../../store/PageTitle.js";
import Video from "../../assets/icons/video.svg";
import Survey from "../../assets/icons/survay.svg";
import Profile from "../../assets/icons/profile.svg";
import Support from "../../assets/icons/support.svg";

const Header = () => {
  const pageTitle = usePageTitle((state) => state.pageTitle);
  return (
    <div className="">
      <nav className="
       top-nav 
       flex justify-between items-center
       px-5 py-3
       top-10  h-16
       rounded-md  shadow-lg sticky  
        bg-slate-50  ">
        <div className="start-nav">
          <h1 className={"font-bold text-lg text-blue-dark"}>{pageTitle}</h1>
        </div>
        <div className="end-nav flex flex-row gap-8 justify-center items-center ">
                  <div className="video-box flex bg-green-50 flex-row gap-2">
          <div className="">
              <img src={Support} className="w-6" />
            </div>
             <span >
             الدعم الفني
             </span>
             </div>
          <div className="video-box flex bg-green-50 flex-row gap-2 ">
          <div className="video-icon">
              <img src={Video} className="w-8" />
            </div>
             <span >
               شرح المنصة
             </span>
         
             </div>
             
             <div className="video-box flex bg-green-50 flex-row gap-2 ">
          <div className="">
              <img src={Survey} className="w-6" />
            </div>
             <span >
               استطلاع رأي 
             </span>
             </div>

             <div className="rounded-full bg-blue-light size-10" >
                  <img  src={Profile} />          
             </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
