import React from 'react';
import './auth.scss';
import logo from '../../assets/images/logo.svg';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth__box'>
        <div className='auth__img'>
          <img width='316' height='289' src={logo} alt='' />
        </div>
        <div className='auth__wrapper'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
