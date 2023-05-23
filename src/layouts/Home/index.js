import React from 'react';
import './home.scss';
import Header from '../../components/Header';
import LdpList from '../../pages/LdpList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useGetUser } from '../../services/userService';

const Home = () => {
  const [token, setToken] = useLocalStorage('token', null);
  const { dataUser, isSuccessUser } = useGetUser(token);
  return (
    <div className='home'>
      <div className='home__header'>
        <Header brand={isSuccessUser ? dataUser.data.data.brand.name : ''} />
      </div>
      <div className='home__main'>
        <div className='container'>
          <LdpList brand={isSuccessUser ? dataUser.data.data.brand.name : ''} />
        </div>
      </div>
    </div>
  );
};

export default Home;
