import React, { useRef, useState } from 'react';
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

  const [isAddNew, setIsAddNew] = useState(false);
  const [startDate, setStartDate] = useState({
    startMM: '',
    startDD: '',
    startYYYY: '',
  });
  const [endDate, setEndDate] = useState({
    endMM: '',
    endDD: '',
    endYYYY: '',
  });
  const handleIsAddNew = () => {
    setIsAddNew(!isAddNew);
    setStartDate({ ...startDate, startMM: '', startDD: '', startYYYY: '' });
    setEndDate({ ...endDate, endMM: '', endDD: '', endYYYY: '' });
  };
  const handleSetStartDate = (e) => {
    setStartDate({ ...startDate, [e.target.name]: e.target.value });
  };
  const handleSetEndDate = (e) => {
    setEndDate({ ...endDate, [e.target.name]: e.target.value });
  };
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
        {isAddNew ? (
          <div class='extensionList__item'>
            <div class='extensionList__text'>
              <span>Ngày bắt đầu:</span>
              <div class='extensionList__input'>
                <input
                  type='number'
                  name='startMM'
                  placeholder='mm'
                  value={startDate.startMM}
                  onChange={handleSetStartDate}
                />
                /
                <input
                  type='number'
                  name='startDD'
                  placeholder='dd'
                  value={startDate.startDD}
                  onChange={handleSetStartDate}
                />
                /
                <input
                  type='number'
                  name='startYYYY'
                  placeholder='yyyy'
                  value={startDate.startYYYY}
                  onChange={handleSetStartDate}
                />
              </div>
            </div>
            <div class='extensionList__text'>
              <span>Ngày kết thúc:</span>
              <div class='extensionList__input'>
                <input type='number' name='endMM' placeholder='mm' value={endDate.endMM} onChange={handleSetEndDate} />
                /
                <input type='number' name='endDD' placeholder='dd' value={endDate.endDD} onChange={handleSetEndDate} />
                /
                <input
                  type='number'
                  name='endYYYY'
                  placeholder='yyyy'
                  value={endDate.endYYYY}
                  onChange={handleSetEndDate}
                />
              </div>
            </div>
            <div class='extensionList__action'>
              <button class='extensionList__save'></button>
              <button class='extensionList__cancel' onClick={handleIsAddNew}></button>
            </div>
          </div>
        ) : (
          <div className='extensionList__addNew' onClick={handleIsAddNew}>
            + Thêm mới
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionList;
