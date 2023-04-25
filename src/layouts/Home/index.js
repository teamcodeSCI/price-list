import React, { useEffect } from 'react';
import './home.scss';
import Header from '../../components/Header';
import LdpList from '../../pages/LdpList';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector, getUser } from '../../features/auth/authSlice';
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className='home'>
      <div className='home__header'>
        <Header user={user} />
      </div>
      <div className='home__main'>
        <div className='container'>
          <LdpList user={user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
