import { useNavigate, useSearchParams } from 'react-router-dom';
import { $api } from '../../client';
import { Fragment, useEffect, useState, useCallback } from 'react';
import usePath from '../../store/auth';
import { HashLoader } from 'react-spinners';
import ErrorPage from '../../Router/ErrorPage';

const Login = () => {
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('t');
  const stepValue = searchParams.get('step');
  const old_domain = searchParams.get('old_domain');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const { setPath, setToken , setSiteId } = usePath();
  const navigate = useNavigate();
  const localToken = localStorage.getItem('token');
  // Redirect user based on token availability
  const redirectUser = useCallback(() => {
    if (!paramValue && !localToken) {
      window.location.href = 'https://www.motkaml.online/home/register';
      return;
    }

    if (!paramValue && localToken) {
      navigate("/app");
      return;
    }
  }, [paramValue, localToken, navigate]);

  // Handle API call and token processing
  const handleToken = useCallback(async () => {
    try {
      const res = await $api.post('https://www.motkaml.online/wp-json/api/v1/to-dash', {
        token: paramValue,
      });

      if (res.data && res.data['status'] == 'success') {
        localStorage.clear();
        setPath(res.data['site_url']);
        setToken(paramValue);
        setSiteId(res.data['site_id']);
        if(stepValue){
          localStorage.setItem("domainStep",stepValue)
         if(old_domain)localStorage.setItem("old_domain", old_domain);
         navigate("/app/settings/?p=2");
         return;
        }
        navigate("/app");
      } else {
        setError(true );
        setErrorMsg(res.data.message);
        

        console.error('Unexpected API response: Missing site_url.');
        setLoading(false);
      }
    } catch (error) {
      setError(true );
      setErrorMsg(error); 
      console.error('Failed to validate token with API:', error);
      setLoading(false);
    }
  }, [paramValue, setPath, setToken, navigate]);

  useEffect(() => {
    redirectUser();

    if (paramValue) {
      handleToken();
    }
  }, [redirectUser, handleToken, paramValue]);

  // Display loading spinner while processing
  if (loading) {
    return (
      <div className='flex justify-center items-center h-lvh bg-white'>
        <HashLoader color="#14428e" />
      </div>
    );
  }
  if (error) {
    return (
      <ErrorPage msg={errorMsg}/>
    );
  }
  // Render empty fragment if loading is complete but not redirected
  return <Fragment></Fragment>;
};

export default Login;
