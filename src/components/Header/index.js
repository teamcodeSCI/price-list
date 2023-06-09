import React from 'react';
import './header.scss';

import { brandStyle } from '../../utils/help';
import { useDispatch } from 'react-redux';
import { logout } from '../../apis/auth';

const Header = ({ brand }) => {
  const dispatch = useDispatch();
  const logo = brandStyle(brand);
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(false);
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__box'>
          <div className='header__logo'>
            <img width={280} height={150} src={logo.logo} alt='' />
          </div>
          <div className='header__control'>
            <button className='header__logout' onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
