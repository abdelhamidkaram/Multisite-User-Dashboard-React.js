import {  useNavigate,  useSearchParams } from 'react-router-dom';
import { $api } from '../../client';
import { Fragment, useEffect, useState } from 'react';
import usePath from '../../store/auth';

const Login = () => {
    //console.log('Login Page .. ');
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('t'); 
  const [loading, setLoading] = useState(true);
  const { setPath } = usePath();
  const navigate = useNavigate();

  useEffect(() => {


    
    if (localStorage.getItem('path') !== null) {
        navigate("/app");
      return;
    }
    if(paramValue == null ){
        window.location.href = 'https://www.motkaml.online/home/';
      }

    const callApi = async () => {
      try {
        const res = await $api.post('https://www.motkaml.online/wp-json/api/v1/to-dash', {
          "token": paramValue
        });
        
        console.log(res);
        if (res.data['site_url'] != null) {
          setPath(res.data['site_url']);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    callApi();
  }, []);

  if (loading) {
    return <p>Loading </p>;
  }

  return <Fragment></Fragment>;
}

export default Login;
