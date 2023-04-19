import React, { useState } from 'react';
import './register.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';

const Register = () => {
  const [info, setInfo] = useState({ email: '', password: '', retypePassword: '' });
  const [notify, setNotify] = useState('');
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleRegister = () => {
    if (info.email === '' || info.password === '' || info.retypePassword === '') {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    if (info.password !== info.retypePassword) {
      setNotify('Nhập lại mật khẩu không đúng !');
      return;
    }
  };
  return (
    <div className='register'>
      <div class='register__title'>Đăng ký</div>
      <div class='register__form'>
        <div class='register__input'>
          <div class='register__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input type='text' name='email' placeholder='Email' value={info.email} onChange={handleInfo} />
        </div>
        <div class='register__input'>
          <div class='register__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input type='password' name='password' placeholder='Mật khẩu' value={info.password} onChange={handleInfo} />
        </div>
        <div class='register__input'>
          <div class='register__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input
            type='password'
            name='retypePassword'
            placeholder='Nhập lại mật khẩu'
            value={info.retypePassword}
            onChange={handleInfo}
          />
        </div>
        {notify !== '' && <p>{notify}</p>}
        <button onClick={handleRegister}>Đăng ký</button>
      </div>
    </div>
  );
};

export default Register;
