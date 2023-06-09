import React, { useEffect, useRef, useState } from 'react';
import './extensionList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import { useOutside } from '../../utils/help';
import ExtensionItem from '../ExtensionItem';
import { useDispatch, useSelector } from 'react-redux';
import { extensionLoadedSelector, extensionLoadingSelector, extensionSelector } from '../../services/extensionService';
import { createExtension, fetchExtension } from '../../apis/extension';
import Loading from '../Loading';

const ExtensionList = ({ handleOpenExtension, landingId, token }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const extensionList = useSelector(extensionSelector);
  const extensionLoaded = useSelector(extensionLoadedSelector);
  const extensionLoading = useSelector(extensionLoadingSelector);
  const [isError, setIsError] = useState(false);
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
  const addExtension = () => {
    if (
      startDate.startMM === '' ||
      startDate.startDD === '' ||
      startDate.startYYYY === '' ||
      endDate.endMM === '' ||
      endDate.endDD === '' ||
      endDate.endYYYY === ''
    ) {
      setIsError(true);
      return;
    }
    dispatch(
      createExtension({
        token,
        body: {
          landing_id: landingId,
          start_date: `${startDate.startMM}/${startDate.startDD}/${startDate.startYYYY}`,
          end_date: `${endDate.endMM}/${endDate.endDD}/${endDate.endYYYY}`,
        },
      })
    );
    setIsAddNew(false);
    setIsError(false);
  };
  useOutside(wrapperRef, handleOpenExtension);
  useEffect(() => {
    dispatch(fetchExtension({ token, landingId }));
  }, [dispatch, token, landingId]);
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
          {extensionLoaded && !extensionLoading ? (
            extensionList.length === 0 ? (
              <p>Không có dữ liệu</p>
            ) : (
              extensionList.map((item, idx) => <ExtensionItem key={idx} token={token} {...item} />)
            )
          ) : (
            <div className='extensionList__loading'>
              <Loading borderColor={'#ccc'} borderTopColor={'#2aa9f3'} size={30} />
            </div>
          )}
        </div>
        {isAddNew ? (
          <div className='extensionList__item'>
            <div className='extensionList__text'>
              <span>Ngày bắt đầu:</span>
              <div className='extensionList__input'>
                <input
                  type='number'
                  name='startDD'
                  placeholder='dd'
                  value={startDate.startDD}
                  onChange={handleSetStartDate}
                  className={isError ? 'extensionList__error' : ''}
                />
                /
                <input
                  type='number'
                  name='startMM'
                  placeholder='mm'
                  value={startDate.startMM}
                  onChange={handleSetStartDate}
                  className={isError ? 'extensionList__error' : ''}
                />
                /
                <input
                  type='number'
                  name='startYYYY'
                  placeholder='yyyy'
                  value={startDate.startYYYY}
                  onChange={handleSetStartDate}
                  className={isError ? 'extensionList__error' : ''}
                />
              </div>
            </div>
            <div className='extensionList__text'>
              <span>Ngày kết thúc:</span>
              <div className='extensionList__input'>
                <input
                  type='number'
                  name='endDD'
                  placeholder='dd'
                  value={endDate.endDD}
                  onChange={handleSetEndDate}
                  className={isError ? 'extensionList__error' : ''}
                />
                /
                <input
                  type='number'
                  name='endMM'
                  placeholder='mm'
                  value={endDate.endMM}
                  onChange={handleSetEndDate}
                  className={isError ? 'extensionList__error' : ''}
                />
                /
                <input
                  type='number'
                  name='endYYYY'
                  placeholder='yyyy'
                  value={endDate.endYYYY}
                  onChange={handleSetEndDate}
                  className={isError ? 'extensionList__error' : ''}
                />
              </div>
            </div>
            <div className='extensionList__action'>
              <button className='extensionList__save' onClick={addExtension}></button>
              <button className='extensionList__cancel' onClick={handleIsAddNew}></button>
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
