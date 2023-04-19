import React, { useRef } from 'react';
import './priceList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';
import PriceItem from '../PriceItem';

const PriceList = ({ handlePriceList }) => {
  const modalRef = useRef(null);
  useOutside(modalRef, handlePriceList);
  return (
    <div className='priceList'>
      <div className='priceList__box' ref={modalRef}>
        <div className='priceList__header'>
          <span>Chi tiết</span>
        </div>
        <div className='priceList__close'>
          <img width={20} height={20} src={closeIcon} alt='' onClick={handlePriceList} />
        </div>
        <div className='priceList__body'>
          <PriceItem
            name={'Dịch vụ'}
            price={'Giá gốc'}
            percent={'Giảm giá'}
            discount={'Giá sau giảm'}
            promotion={'Ưu đãi'}
            description={'Ghi chú'}
            isTitle={true}
          />
          <PriceItem
            name={'Dio Hàn Quốc - Tiêu chuẩn'}
            price={8000000}
            percent={45}
            discount={(8000000 * (100 - 45)) / 100}
            promotion={'Tặng răng sứ Titan'}
            description={'7 năm'}
          />
          <PriceItem
            name={'Dio Hàn Quốc - Tiêu chuẩn'}
            price={8000000}
            percent={45}
            discount={(8000000 * (100 - 45)) / 100}
            promotion={'Tặng răng sứ Titan'}
            description={'7 năm'}
          />{' '}
          <PriceItem
            name={'Dio Hàn Quốc - Tiêu chuẩn'}
            price={8000000}
            percent={45}
            discount={(8000000 * (100 - 45)) / 100}
            promotion={'Tặng răng sứ Titan'}
            description={'7 năm'}
          />{' '}
          <PriceItem
            name={'Dio Hàn Quốc - Tiêu chuẩn'}
            price={8000000}
            percent={45}
            discount={(8000000 * (100 - 45)) / 100}
            promotion={'Tặng răng sứ Titan'}
            description={'7 năm'}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceList;
