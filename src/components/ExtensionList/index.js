import React, { useRef } from 'react';
import './extensionList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';
import ExtensionItem from '../ExtensionItem';
const data = [
  { startDate: '06/16/2023', endDate: '06/20/2023' },
  { startDate: '06/21/2023', endDate: '06/24/2023' },
  { startDate: '06/25/2023', endDate: '06/27/2023' },
  { startDate: '06/28/2023', endDate: '06/30/2023' },
];
const ExtensionList = ({ handleOpenExtension }) => {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, handleOpenExtension);
  return (
    <div className='extensionList'>
      <div className='extensionList__box' ref={wrapperRef}>
        <div className='extensionList__header'>
          <span>Gia hạn</span>
        </div>
        <div className='extensionList__close' onClick={handleOpenExtension}>
          <img width='20' height='20' src={closeIcon} alt='' />
        </div>
        <div className='extensionList__head'>
          <div className='extensionList__title'>Ngày bắt đầu</div>
          <div className='extensionList__title'>Ngày kết thúc</div>
        </div>
        <div className='extensionList__body'>
          {data.map((item, idx) => (
            <ExtensionItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtensionList;
