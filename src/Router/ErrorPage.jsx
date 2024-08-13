import { useRouteError } from "react-router-dom";
import logo from '../assets/icons/logo.svg'
const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route Error : " + error);

  return (
    <div className="fixed top-0 start-0 w-full h-full bg-white flex items-center justify-center text-center p-4">
    <div>
      <img src={logo} 
                    className="fill-brown-500 w-24 h-24 md:w-32 md:h-32 mx-auto"
/>
    
      <h2 className="text-brown-500 text-4xl lg:text-6xl font-bold">
        {error?.status}
      </h2>
      <>
        {error?.status === 404 && (
          <p className="mt-4 text-lg font-medium">
            هذه الصفحة غير متوفره !!
          </p>
        )}
      </>
    </div>
  </div>
  );
};
export default ErrorPage;
