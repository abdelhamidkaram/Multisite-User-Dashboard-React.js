import {useNavigate, useSearchParams } from 'react-router-dom';
import { $api } from '../../client';
import { Fragment, useEffect, useState } from 'react';
import usePath from '../../store/auth';
import loadingAnimation2 from '../../assets/json/loading2.json'
import Lottie from 'lottie-react';
const Login = () => {
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('t');
  const [loading, setLoading] = useState(true);
  const { setPath, setToken } = usePath();
  const navigate = useNavigate();
  const localToken = localStorage.getItem('token');

  useEffect(() => {
    if (!paramValue && !localToken) {
      window.location.href = 'https://www.motkaml.online/home/register';
      return;
    }

    if (!paramValue && localToken) {
      navigate("/app");
      return;
    }

    const callApi = async () => {
      try {
        const res = await $api.post('https://www.motkaml.online/wp-json/api/v1/to-dash', {
          token: paramValue
        });
        if (res.data && res.data['site_url']) {
          setPath(res.data['site_url']);
          setToken(paramValue);
          navigate("/app");
        } else {
          console.error('API response does not contain expected data.');
          setLoading(false);
        }
      } catch (error) {
        console.error('API call failed:', error);
        setLoading(false);
      }
    };

    callApi();
  }, [paramValue, localToken, navigate, setPath, setToken]);

  if (loading) {
    return <div className='flex justify-center items-center h-lvh bg-white'>
    <Lottie animationData={loadingAnimation2} loop={true}/>
    </div>;
  }

  return <Fragment></Fragment>;
};

export default Login;
