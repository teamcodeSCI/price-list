import React, { useState } from 'react';
import './register.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../utils/const';
import { useRegister } from '../../services/authService';
import { useBrand } from '../../services/brandService';
import { pressEnter } from '../../utils/help';

const Register = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({ name: '', email: '', password: '', c_password: '', brand_id: '' });
  const [notify, setNotify] = useState('');
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const { isLoadingRegister, mutateRegister } = useRegister();

  const { dataBrand, isSuccessBrand } = useBrand();

  const handleRegister = () => {
    if (
      info.name === '' ||
      info.email === '' ||
      info.brand_id === '' ||
      info.password === '' ||
      info.c_password === ''
    ) {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    if (info.password !== info.c_password) {
      setNotify('Nhập lại mật khẩu không đúng !');
      return;
    }
    setNotify('');
    mutateRegister(info, {
      onSuccess: () => {
        setTimeout(() => {
          navigate(`${APP_URL}/auth/login`);
        }, 1000);
      },
      onError: (error) => {
        setNotify('Email đã tồn tại !');
      },
    });
  };
  const handlePress = (e) => {
    pressEnter(e, handleRegister);
  };
  return (
    <div className='register'>
      <div className='register__title'>Đăng ký</div>
      <div className='register__form'>
        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input
            type='text'
            name='name'
            placeholder='Họ tên'
            value={info.name}
            onChange={handleInfo}
            onKeyDown={handlePress}
          />
        </div>
        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={mailIcon} alt='' />
          </div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={info.email}
            onChange={handleInfo}
            onKeyDown={handlePress}
          />
        </div>

        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input
            type='password'
            name='password'
            placeholder='Mật khẩu'
            value={info.password}
            onChange={handleInfo}
            onKeyDown={handlePress}
          />
        </div>
        <div className='register__input'>
          <div className='register__icon'>
            <img width='15' height='15' src={lockIcon} alt='' />
          </div>
          <input
            type='password'
            name='c_password'
            placeholder='Nhập lại mật khẩu'
            value={info.c_password}
            onChange={handleInfo}
            onKeyDown={handlePress}
          />
        </div>
        <div className='register__select'>
          <select name='brand_id' value={info.brand_id} onChange={handleInfo}>
            <option value={''} disabled>
              - - - Chọn thương hiệu - - -
            </option>
            {isSuccessBrand &&
              dataBrand.data.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {notify !== '' && <p>{notify}</p>}
        {isLoadingRegister ? (
          <button className='register__loading'>
            <Loading size={30} borderTopColor={'#2aa9f3'} />
          </button>
        ) : (
          <button onClick={handleRegister}>Đăng ký ngay</button>
        )}
      </div>
    </div>
  );
};

export default Register;
