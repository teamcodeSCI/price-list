import React, { useState } from 'react';
import './ldpItem.scss';
import PriceList from '../PriceList';
import ConfirmModal from '../ConfirmModal';
import { strToBool } from '../../utils/help';

const LdpItem = (props) => {
  const [status, setStatus] = useState(props.status);
  const [openPriceList, setOpenPriceList] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleStatus = (e) => {
    setStatus(strToBool(e.target.value));
  };
  const handlePriceList = () => {
    setOpenPriceList(!openPriceList);
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <div className='ldpItem'>
      <div className='ldpItem__title'>{props.url}</div>
      <div className='ldpItem__cate'>{props.category.category}</div>
      <div className='ldpItem__status'>
        <select style={{ background: Boolean(status) ? '#b6e5cf' : '#ffd0d0' }} onChange={handleStatus} value={status}>
          <option value={true}>Đang hoạt động</option>
          <option value={false}>Vô hiệu hóa</option>
        </select>
      </div>
      <div className='ldpItem__action'>
        <button className='ldpItem__delete' onClick={handleConfirmModal}></button>
        <button className='ldpItem__detail' onClick={handlePriceList}></button>
      </div>
      {openPriceList && <PriceList handlePriceList={handlePriceList} />}
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} />}
    </div>
  );
};

export default LdpItem;
