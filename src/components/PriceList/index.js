import React, { useRef } from 'react';
import './priceList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';

const PriceList = ({ handlePriceList }) => {
  const modalRef = useRef(null);
  useOutside(modalRef, handlePriceList);
  return (
    <div className='priceList'>
      <div className='priceList__box' ref={modalRef}>
        <div className='priceList__header'>
          <span></span>
          Kết quả: câu
        </div>
        <div className='priceList__close'>
          <img width={20} height={20} src={closeIcon} alt='' onClick={handlePriceList} />
        </div>
        <div className='priceList__body'></div>
      </div>
    </div>
  );
};

export default PriceList;
