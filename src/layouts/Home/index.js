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
  console.log('userData: ', loadedUser);
  useEffect(() => {
    dispatch(user(token));
  }, [dispatch, token]);
  return (
    <div className='home'>
      <div className='home__header'>
        <Header brand={userData !== null ? userData.data.brand.name : ''} />
      </div>
      <div className='home__main'>
        <div className='container'>
          <LdpList
            brand={userData !== null && userData.data.brand.name}
            token={token}
            brandId={userData !== null && userData.data.brand_id}
            isSuccessUser={userData !== null}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
