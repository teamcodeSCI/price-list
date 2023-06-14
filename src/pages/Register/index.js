import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './register.scss';
import mailIcon from '../../assets/icons/mail-icon.svg';
import lockIcon from '../../assets/icons/lock-icon.svg';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { pressEnter } from '../../utils/help';
import { fetchBrand } from '../../apis/brand';
import { brandSelector, brandLoadedSelector } from '../../services/brandService';
import { authErrorSelector, authLoadedSelector, authLoadingSelector } from '../../services/authService';
import { register } from '../../apis/auth';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ name: '', email: '', password: '', c_password: '', brand_id: '' });
  const [notify, setNotify] = useState('');
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const brand = useSelector(brandSelector);
  const brandLoaded = useSelector(brandLoadedSelector);
  const registerError = useSelector(authErrorSelector);
  const registerLoaded = useSelector(authLoadedSelector);
  const registerLoading = useSelector(authLoadingSelector);

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
    dispatch(register(info));
  };
  const handlePress = (e) => {
    pressEnter(e, handleRegister);
  };
  useEffect(() => {
    dispatch(fetchBrand());
    if (registerLoaded === true) {
      if (registerError !== null) {
        setNotify(registerError.errorInfo[2]);
      } else {
        setNotify('');
        navigate('/auth/login');
      }
    }
  }, [dispatch, navigate, registerError, registerLoaded]);
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
            {brandLoaded &&
              brand.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {notify !== '' && <p>{notify}</p>}
        {registerLoading ? (
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
