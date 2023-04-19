import React, { useRef, useState } from 'react';

import { useOutside } from '../../utils/help';
import './addLdpModal.scss';

const AddLdpModal = ({ handleAddLdp }) => {
  const wrapperRef = useRef(null);
  const [info, setInfo] = useState({ link: '', cateService: '' });

  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useOutside(wrapperRef, handleAddLdp);

  return (
    <div className='addLdpModal'>
      <div className='addLdpModal__box' ref={wrapperRef}>
        <div className='addLdpModal__title'>Thêm mới</div>
        <div className='addLdpModal__body'>
          <input type='text' name='link' onChange={handleInfo} value={info.link} placeholder='Nhập đường dẫn...' />
          <select name='cateService' onChange={handleInfo} value={info.cateService}>
            <option disabled value=''>
              - - - Chọn nhóm dịch vụ - - -
            </option>
            <option>Thương hiệu</option>
            <option>Trồng răng</option>
            <option>Niềng răng</option>
            <option>Răng sứ</option>
          </select>
        </div>
        <div className='addLdpModal__footer'>
          <button className='addLdpModal__cancel' onClick={handleAddLdp}>
            Hủy
          </button>
          <button className='addLdpModal__addNew'>Tạo</button>
        </div>
      </div>
    </div>
  );
};

export default AddLdpModal;
