import React, { useState } from 'react';
import './ldpItem.scss';
import PriceList from '../PriceList';
import ConfirmModal from '../ConfirmModal';

const LdpItem = () => {
  const [status, setStatus] = useState(false);
  const [openPriceList, setOpenPriceList] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handlePriceList = () => {
    setOpenPriceList(!openPriceList);
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <div className='ldpItem'>
      <div className='ldpItem__title'>https://nhakhoaparis.vn/tham-my-rang-tieu-chuan-phap.html</div>
      <div className='ldpItem__cate'>Thương hiệu</div>
      <div className='ldpItem__status'>
        <select style={{ background: status ? '#b6e5cf' : '#ffd0d0' }} onChange={handleStatus} value={status}>
          <option value='true'>Đang hoạt động</option>
          <option value='false'>Vô hiệu hóa</option>
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
