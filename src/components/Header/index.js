import React from 'react';
import './header.scss';
import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { getLogout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../utils/const';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(getLogout());
    navigate(`${APP_URL}/auth/login`);
  };
  return (
    <div className='header'>
      <div className='container'>
        <div className='header__box'>
          <div className='header__logo'>
            <img width={280} height={150} src={logo} alt='' />
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
