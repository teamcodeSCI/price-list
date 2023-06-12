import React, { useEffect } from 'react';
import './home.scss';
import Header from '../../components/Header';
import LdpList from '../../pages/LdpList';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../apis/auth';
import { authLoadedSelector, authUserSelector } from '../../services/authService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Home = () => {
  const [token, setToken] = useLocalStorage('token', null);
  const dispatch = useDispatch();
  const userData = useSelector(authUserSelector);
  const loadedUser = useSelector(authLoadedSelector);
  
  useEffect(() => {
    dispatch(user(token));
  }, [dispatch, token]);
  return (
    <div className='home'>
      <div className='home__header'>
        <Header brand={loadedUser ? userData.brand.name : ''} />
      </div>
      <div className='home__main'>
        <div className='container'>
          <LdpList
            brand={loadedUser && userData.brand.name}
            token={token}
            brandId={loadedUser && userData.brand_id}
            isSuccessUser={loadedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
