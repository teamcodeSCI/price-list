import React, { useEffect, useState } from 'react';
import './login.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin, loggedSelector, loggingSelector, messageSelector } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../utils/const';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: '', password: '' });
  const [notify, setNotify] = useState('');
  const message = useSelector(messageSelector);
  const logged = useSelector(loggedSelector);
  const logging = useSelector(loggingSelector);
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (info.email === '' || info.password === '') {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    dispatch(getLogin({ email: info.email, password: info.password }));
  };
  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate(`${APP_URL}/`);
    if (logged) navigate(`${APP_URL}/`);
    setNotify(message);
  }, [navigate, logged, message]);
  return (
    <div className='login'>
      <div className='login__title'>Đăng nhập</div>
      <div className='login__form'>
        <div className='login__input'>
          <div className='login__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input type='text' name='email' placeholder='Email' value={info.email} onChange={handleInfo} />
        </div>
        <div className='login__input'>
          <div className='login__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input type='password' name='password' placeholder='Mật khẩu' value={info.password} onChange={handleInfo} />
        </div>
        {notify !== '' && <p>{notify}</p>}
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
