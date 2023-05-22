import React from 'react';
import './home.scss';
import Header from '../../components/Header';
import LdpList from '../../pages/LdpList';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__header'>
        <Header user={''} />
      </div>
      <div className='home__main'>
        <div className='container'>
          <LdpList user={''} />
        </div>
      </div>
    </div>
  );
};

export default Home;
