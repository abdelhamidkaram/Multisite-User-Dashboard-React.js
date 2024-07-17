import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route Error : " + error);

  return (
    <div
      id="error-page"
      className="text-center p-6 flex flex-col items-center justify-center h-lvh"
    >

      <h1 className="text-3xl text-blue-dark">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>


   
    </div>
  );
};
export default ErrorPage;
