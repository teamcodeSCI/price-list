import React, { useState } from 'react';
import './login.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';

const Login = () => {
  const [info, setInfo] = useState({ email: '', password: '' });
  const [notify, setNotify] = useState('');
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    if (info.email === '' || info.password === '') {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
  };
  return (
    <div className='login'>
      <div class='login__title'>Đăng nhập</div>
      <div class='login__form'>
        <div class='login__input'>
          <div class='login__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input type='text' name='email' placeholder='Email' value={info.email} onChange={handleInfo} />
        </div>
        <div class='login__input'>
          <div class='login__icon'>
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
