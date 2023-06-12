import React, { useRef, useState } from 'react';
import './priceList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';
import PriceItem from '../PriceItem';
import { useSelector } from 'react-redux';

import { priceLoadedSelector, priceSelector } from '../../services/priceService';

const PriceList = ({ handlePriceList }) => {
  const modalRef = useRef(null);
  const [isAddPrice, setIsAddPrice] = useState(false);
  const [addInfo, setAddInfo] = useState({
    name: '',
    price: '',
    percent: '',
    discount: '',
    promotion: '',
    description: '',
  });
  const price = useSelector(priceSelector);
  const priceLoaded = useSelector(priceLoadedSelector);
  const count = (addInfo.price * (100 - addInfo.percent)) / 100;
  const handleEditInfo = (e) => {
    setAddInfo({
      ...addInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleIsAddPrice = () => {
    setIsAddPrice(!isAddPrice);
  };
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
          {priceLoaded &&
            (price.length === 0 ? (
              <p>Không có dữ liệu</p>
            ) : (
              <>
                <PriceItem
                  name={'Dịch vụ'}
                  price={'Giá gốc'}
                  percent={'Giảm giá'}
                  discount={'Giá sau giảm'}
                  promotion={'Ưu đãi'}
                  description={'Ghi chú'}
                  isTitle={true}
                />
                {price.map((item) => (
                  <PriceItem
                    key={item.id}
                    name={item.service}
                    price={Number(item.price)}
                    percent={item.discount}
                    discount={(Number(item.price) * (100 - Number(item.discount))) / 100}
                    promotion={item.promotion}
                    description={item.note}
                  />
                ))}
              </>
            ))}

          <div className='priceList__addItem' style={isAddPrice ? { padding: '10px 20px' } : {}}>
            {isAddPrice ? (
              <ul>
                <li className='priceList__name'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Nhập tên dịch vụ ...'
                    value={addInfo.name}
                    onChange={handleEditInfo}
                  />
                </li>
                <li className='priceList__price'>
                  <input
                    type='number'
                    name='price'
                    placeholder='Nhập giá gốc ...'
                    value={addInfo.price}
                    onChange={handleEditInfo}
                  />
                </li>
                <li className='priceList__percent'>
                  <input
                    type='number'
                    name='percent'
                    placeholder='Nhập % giảm ...'
                    value={addInfo.percent}
                    onChange={handleEditInfo}
                  />
                </li>
                <li className='priceList__discount'>
                  <input type='number' name='discount' value={count} onChange={handleEditInfo} disabled />
                </li>
                <li className='priceList__promotion'>
                  <input
                    type='text'
                    name='promotion'
                    placeholder='Nhập ưu đãi ...'
                    value={addInfo.promotion}
                    onChange={handleEditInfo}
                  />
                </li>
                <li className='priceList__description'>
                  <input
                    type='text'
                    name='description'
                    placeholder='Nhập ghi chú ...'
                    value={addInfo.description}
                    onChange={handleEditInfo}
                  />
                </li>
                <li className='priceList__action'>
                  <button className='priceList__save'></button>
                  <button className='priceList__cancel' onClick={handleIsAddPrice}></button>
                </li>
              </ul>
            ) : (
              <div className='priceList__addBtn'>
                <button onClick={handleIsAddPrice}>+ Thêm mới</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
