import React, { useState } from 'react';
import './priceItem.scss';
import ConfirmModal from '../ConfirmModal';
import { formatMoney } from '../../utils/help';
import { useDispatch } from 'react-redux';
import { deletePrice, updatePrice } from '../../apis/price';

const PriceItem = ({ priceId, name, price, percent, discount, promotion, description, isTitle, landingId }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editInfo, setEditInfo] = useState({
    landing_id: landingId,
    service: name,
    price: price,
    discount: percent,
    promotion: promotion,
    note: description,
  });
  const [isError, setIsError] = useState(false);
  const count = (editInfo.price * (100 - editInfo.discount)) / 100;
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
    setIsError(false);
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
  const handleEditPrice = () => {
    if (editInfo.service === '' || editInfo.price === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    dispatch(updatePrice({ token: localStorage.getItem('token').replace(/"/g, ''), body: editInfo, priceId }));
  };
  const handleDelete = () => {
    dispatch(deletePrice({ token: localStorage.getItem('token').replace(/"/g, ''), priceId }));
  };
  return (
    <>
      {!isEdit ? (
        <ul className='priceItem' style={isTitle ? { fontWeight: '600' } : {}}>
          <li className='priceItem__name'>{name}</li>
          <li className='priceItem__price'>
            {formatMoney(price)} {isTitle ? '' : 'Đ'}
          </li>
          <li className='priceItem__percent'>
            {percent}
            {isTitle ? '' : '%'}
          </li>
          <li className='priceItem__discount'>
            {formatMoney(discount)} {isTitle ? '' : 'Đ'}
          </li>
          <li className='priceItem__promotion'>{promotion}</li>
          <li className='priceItem__description'>
            <span>{description}</span>
          </li>
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
              name='service'
              style={isError ? { borderColor: 'red' } : { borderColor: '#ccc' }}
              placeholder='Nhập tên dịch vụ ...'
              value={editInfo.service}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__price'>
            <input
              type='number'
              name='price'
              style={isError ? { borderColor: 'red' } : { borderColor: '#ccc' }}
              placeholder='Nhập giá gốc ...'
              value={editInfo.price || 0}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__percent'>
            <input
              type='number'
              name='discount'
              placeholder='Nhập % giảm ...'
              value={editInfo.discount || 0}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__discount'>
            <input type='number' value={count} onChange={handleEditInfo} disabled />
          </li>
          <li className='priceItem__promotion'>
            <input
              type='text'
              name='promotion'
              placeholder='Nhập ưu đãi ...'
              value={editInfo.promotion || ''}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__description'>
            <input
              type='text'
              name='note'
              placeholder='Nhập ghi chú ...'
              value={editInfo.note || ''}
              onChange={handleEditInfo}
            />
          </li>
          <li className='priceItem__action'>
            <button className='priceItem__save' onClick={handleEditPrice}></button>
            <button className='priceItem__cancel' onClick={handleIsEdit}></button>
          </li>
        </ul>
      )}
      {isDelete && <ConfirmModal handleConfirmModal={handleIsDelete} action={handleDelete} />}
    </>
  );
};

export default PriceItem;
