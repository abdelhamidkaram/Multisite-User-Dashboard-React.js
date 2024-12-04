import { useRouteError } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import MainButton from "../components/UIElements/MainButton";
const ErrorPage = ({ msg }) => {
  const error = useRouteError();
  console.error("Route Error : " + error);

  return (
    <div className="fixed top-0 start-0 w-full h-full bg-slate-200 flex items-center justify-center text-center p-4 ">
      <div className="max-w-[450px] shadow-slate-400  shadow-md p-10 rounded-md border-t-4 border-red-600 ">
        <img
          src={logo}
          className="fill-brown-500 w-24 h-24 md:w-32 md:h-32 mx-auto"
        />

        <h2 className="text-red-600 text-4xl lg:text-6xl font-bold">
          {error?.status ?? '404'}
        </h2>

        <p className="mt-4 text-lg font-medium">هذه الصفحة غير متوفره !!</p>

        <p className="mt-4 mb-11 text-lg font-medium">{msg}</p>

        <MainButton  danger={false} text={'الذهاب الى الرئيسية'} ClickHandler={()=>{
          window.location.href = 'https://www.motkaml.com/home/?nocache=true' ; 
        }} />
      
      </div>
    </div>
  );
};
export default ErrorPage;
