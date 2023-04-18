import React, { useState } from 'react';
import './ldpItem.scss';

const LdpItem = () => {
  const [status, setStatus] = useState(false);
  const handleStatus = (e) => {
    setStatus(e.target.value);
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
        <button className='ldpItem__delete'></button>
        <button className='ldpItem__detail'></button>
      </div>
    </div>
  );
};

export default LdpItem;
