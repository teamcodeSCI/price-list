import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div className='header__box'>
          <div className='header__logo'>
            <img width={280} height={150} src={logo} alt='' />
          </div>
          <div className='header__control'>
            <button className='header__logout'>Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
