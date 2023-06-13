import React, { useRef } from 'react';
import { useOutside } from '../../utils/help';
import './confirmModal.scss';

const ConfirmModal = ({ handleConfirmModal, action }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, handleConfirmModal);
  return (
    <div className='confirmModal'>
      <div className='confirmModal__box' ref={wrapperRef}>
        <div className='confirmModal__header'>Thông báo</div>
        <p>Bạn có chắc muốn xóa ?</p>
        <div className='confirmModal__btn'>
          <button onClick={handleConfirmModal}>Hủy bỏ</button>
          <button onClick={action}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
