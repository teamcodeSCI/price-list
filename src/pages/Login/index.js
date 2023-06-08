import React, { useEffect, useState } from 'react';
import './login.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';

import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../utils/const';
import {
  authErrorSelector,
  authLoadedSelector,
  authLoadingSelector,
  authTokenSelector,
} from '../../services/authService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Loading from '../../components/Loading';
import { pressEnter } from '../../utils/help';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ email: '', password: '' });
  const [notify, setNotify] = useState('');
  const loginError = useSelector(authErrorSelector);
  const loginLoaded = useSelector(authLoadedSelector);
  const loginLoading = useSelector(authLoadingSelector);
  const accessToken = useSelector(authTokenSelector);

  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const [token, setToken] = useLocalStorage('token', null);
  const handleLogin = () => {
    if (info.email === '' || info.password === '') {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    dispatch(login(info));
  };
  const handleKeyDown = (e) => {
    pressEnter(e, handleLogin);
  };
  useEffect(() => {
    if (loginLoaded === true) {
      if (loginError !== null) {
        setNotify(loginError.toString());
      } else {
        setNotify('');
        setToken(accessToken);
        navigate(`${APP_URL}/`);
      }
    }
    if (token) navigate(`${APP_URL}/`);
  }, [token, loginLoaded, loginError, navigate, setToken, accessToken, dispatch]);
  return (
    <div className='login'>
      <div className='login__title'>Đăng nhập</div>
      <div className='login__form'>
        <div className='login__input'>
          <div className='login__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={info.email}
            onChange={handleInfo}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='login__input'>
          <div className='login__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input
            type='password'
            name='password'
            placeholder='Mật khẩu'
            value={info.password}
            onChange={handleInfo}
            onKeyDown={handleKeyDown}
          />
        </div>
        {notify !== '' && <p>{notify}</p>}
        {loginLoading ? (
          <button className='login__loading'>
            <Loading size={30} borderTopColor={'#2aa9f3'} />
          </button>
        ) : (
          <button onClick={handleLogin}>Đăng nhập</button>
        )}
      </div>
    </div>
  );
};

export default Login;
