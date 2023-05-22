import React, { useEffect, useState } from 'react';
import './register.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';

import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../utils/const';

const Register = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({ name: '', email: '', password: '', retypePassword: '', brand: '' });
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
  useEffect(() => {
    setNotify('Đăng ký thành công');
    setTimeout(() => {
      navigate(`${APP_URL}/auth/login`);
    }, 1000);
  }, [navigate]);
  return (
    <div className='register'>
      <div className='register__title'>Đăng ký</div>
      <div className='register__form'>
        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input type='text' name='name' placeholder='Họ tên' value={info.name} onChange={handleInfo} />
        </div>
        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input type='text' name='email' placeholder='Email' value={info.email} onChange={handleInfo} />
        </div>

        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input type='password' name='password' placeholder='Mật khẩu' value={info.password} onChange={handleInfo} />
        </div>
        <div className='register__input'>
          <div className='register__icon'>
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
        <div className='register__select'>
          <select name='brand' value={info.brand} onChange={handleInfo}>
            <option value={''} disabled>
              - - - Chọn thương hiệu - - -
            </option>
            {[].map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {notify !== '' && <p>{notify}</p>}
        <button onClick={handleRegister}>Đăng ký</button>
      </div>
    </div>
  );
};

export default Register;
