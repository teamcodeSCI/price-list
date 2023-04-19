import React, { useState } from 'react';
import './priceItem.scss';
import ConfirmModal from '../ConfirmModal';
const PriceItem = ({ name, price, percent, discount, promotion, description, isTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editInfo, setEditInfo] = useState({
    name: name,
    price: price,
    percent: percent,
    discount: discount,
    promotion: promotion,
    description: description,
  });
  const count = (editInfo.price * (100 - editInfo.percent)) / 100;
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleIsDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleEditInfo = (e) => {
    setEditInfo({
      ...editInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {!isEdit ? (
        <ul className='priceItem' style={isTitle ? { fontWeight: '600' } : {}}>
          <li className='priceItem__name'>{name}</li>
          <li className='priceItem__price'>
            {price} {isTitle ? '' : 'Đ'}
          </li>
          <li className='priceItem__percent'>
            {percent}
            {isTitle ? '' : '%'}
          </li>
          <li className='priceItem__discount'>
            {discount} {isTitle ? '' : 'Đ'}
          </li>
          <li className='priceItem__promotion'>{promotion}</li>
          <li className='priceItem__description'>{description}</li>
          {!isTitle && (
            <li className='priceItem__action'>
              <button className='priceItem__edit' onClick={handleIsEdit}></button>
              <button className='priceItem__delete' onClick={handleIsDelete}></button>
            </li>
          )}
        </ul>
      ) : (
        <ul className='priceItem' style={isTitle ? { fontWeight: '600' } : {}}>
          <li className='priceItem__name'>
            <input
              type='text'
              name='name'
              placeholder='Nhập tên dịch vụ ...'
              value={editInfo.name}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__price'>
            <input
              type='number'
              name='price'
              placeholder='Nhập giá gốc ...'
              value={editInfo.price}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__percent'>
            <input
              type='number'
              name='percent'
              placeholder='Nhập % giảm ...'
              value={editInfo.percent}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__discount'>
            <input type='number' name='discount' value={count} onChange={handleEditInfo} disabled />
          </li>
          <li className='priceItem__promotion'>
            <input
              type='text'
              name='promotion'
              placeholder='Nhập ưu đãi ...'
              value={editInfo.promotion}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__description'>
            <input
              type='text'
              name='description'
              placeholder='Nhập ghi chú ...'
              value={editInfo.description}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__action'>
            <button className='priceItem__save'></button>
            <button className='priceItem__cancel' onClick={handleIsEdit}></button>
          </li>
        </ul>
      )}
      {isDelete && <ConfirmModal handleConfirmModal={handleIsDelete} />}
    </>
  );
};

export default PriceItem;
