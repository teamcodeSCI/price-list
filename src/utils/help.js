import { useEffect } from 'react';
import logoSCI from '../assets/images/logo.png';
import logoKN from '../assets/images/logoKN.svg';
import logoPR from '../assets/images/logoPR.svg';
import logoDA from '../assets/images/logoDA.png';
import logoHH from '../assets/images/logoHH.svg';

export const splitLoginStr = (str) => {
  const arr = str.split('/');
  return { username: arr[0], role: arr[1] };
};

export const useOutside = (ref, func) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};

export const removeAccents = (str) => {
  const string = str || '';
  return string
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
export const formatDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }
  return '';
};
export const brandStyle = (brand) => {
  let style = {};
  let logo = logoSCI;
  let className = '';
  let borderLoading = '';
  switch (brand) {
    case 'Paris':
      style = { background: 'linear-gradient(to right, #2A7CD6, #0ea5ed)', color: '#fff' };
      logo = logoPR;
      className = 'prPagi';
      borderLoading = '#0ea5ed';
      break;
    case 'Kangnam':
      style = { background: 'linear-gradient(to right, #fb4b14, #ff6618)', color: '#fff' };
      logo = logoKN;
      className = 'knPagi';
      borderLoading = '#ff6618';
      break;
    case 'Đông Á':
      style = { background: '#37a59f', color: '#fff' };
      logo = logoDA;
      className = 'daPagi';
      borderLoading = '#37a59f';
      break;
    case 'Hồng Hà':
      style = { background: '#cb6da8', color: '#fff' };
      logo = logoHH;
      className = 'hhPagi';
      borderLoading = '#cb6da8';
      break;
    default:
      break;
  }
  return { style, logo, className, borderLoading };
};
export const pressEnter = (e, func) => {
  if (e.key === 'Enter') {
    func();
  }
};
export const strToBool = (value) => {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
};
