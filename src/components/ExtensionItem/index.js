import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import './extensionItem.scss';

const ExtensionItem = (props) => {
  const start = props.startDate.split('/');
  const end = props.endDate.split('/');
  const [isEditExtension, setIsEditExtension] = useState(false);
  const [isDelExtension, setIsDelExtension] = useState(false);
  const [startDate, setStartDate] = useState({
    startMM: start[0],
    startDD: start[1],
    startYYYY: start[2],
  });
  const [endDate, setEndDate] = useState({
    endMM: end[0],
    endDD: end[1],
    endYYYY: end[2],
  });
  const handleEditExtension = () => {
    setIsEditExtension(!isEditExtension);
  };
  const handleDelExtension = () => {
    setIsDelExtension(!isDelExtension);
  };
  const handleSetStartDate = (e) => {
    setStartDate({ ...startDate, [e.target.name]: e.target.value });
  };
  const handleSetEndDate = (e) => {
    setEndDate({ ...endDate, [e.target.name]: e.target.value });
  };
  return (
    <div className='extensionItem'>
      <div className='extensionItem__text'>
        {isEditExtension ? (
          <div className='extensionItem__input'>
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
        ) : (
          props.startDate
        )}
      </div>
      <div className='extensionItem__text'>
        {isEditExtension ? (
          <div className='extensionItem__input'>
            <input type='number' name='endMM' placeholder='mm' value={endDate.endMM} onChange={handleSetEndDate} /> /
            <input type='number' name='endDD' placeholder='dd' value={endDate.endDD} onChange={handleSetEndDate} /> /
            <input
              type='number'
              name='endYYYY'
              placeholder='yyyy'
              value={endDate.endYYYY}
              onChange={handleSetEndDate}
            />
          </div>
        ) : (
          props.endDate
        )}
      </div>
      <div className='extensionItem__action'>
        {isEditExtension ? (
          <>
            <button className='extensionItem__save'></button>
            <button className='extensionItem__close' onClick={handleEditExtension}></button>
          </>
        ) : (
          <>
            <button className='extensionItem__edit' onClick={handleEditExtension}></button>
            <button className='extensionItem__delete' onClick={handleDelExtension}></button>
          </>
        )}
      </div>
      {isDelExtension && <ConfirmModal handleConfirmModal={handleDelExtension} />}
    </div>
  );
};

export default ExtensionItem;
