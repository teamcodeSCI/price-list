import React, { useState } from 'react';
import './ldpItem.scss';
import PriceList from '../PriceList';
import ConfirmModal from '../ConfirmModal';
import { strToBool } from '../../utils/help';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../apis/category';
import { categoryLoadedSelector, categorySelector } from '../../services/categoryService';
import { deleteLanding, updateLanding } from '../../apis/landing';
import { Tooltip } from 'react-tooltip';
import ExtensionList from '../ExtensionList';

const LdpItem = (props) => {
  const dispatch = useDispatch();

  const [item, setItem] = useState({
    url: props.url,
    category_id: props.category_id,
    status: props.status,
    brand_id: props.brand_id,
  });
  const [openPriceList, setOpenPriceList] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openExtension, setOpenExtension] = useState(false);
  const [isEditLanding, setIsEditLanding] = useState(false);
  const loadedCate = useSelector(categoryLoadedSelector);
  const cate = useSelector(categorySelector);

  const handleOpenEditLanding = () => {
    dispatch(fetchCategory(props.brand_id));
    setIsEditLanding(true);
  };
  const handleCloseEditLanding = () => {
    setIsEditLanding(false);
  };
  const handleEditLanding = (e) => {
    setItem({ ...item, [e.target.name]: strToBool(e.target.value) });
  };
  const handleSaveLanding = () => {
    dispatch(updateLanding({ id: props.id, body: item, token: props.token }));
    handleCloseEditLanding();
  };
  const handleDeleteLanding = () => {
    dispatch(deleteLanding({ id: props.id, token: props.token }));
    handleConfirmModal();
  };
  const handlePriceList = () => {
    setOpenPriceList(!openPriceList);
  };
  const handleOpenExtension = () => {
    setOpenExtension(!openExtension);
  };
  const handleConfirmModal = () => {
    setOpenConfirmModal(!openConfirmModal);
  };
  return (
    <div className='ldpItem'>
      <div className='ldpItem__title'>
        {isEditLanding ? (
          <input name='url' type='text' placeholder='Nhập đường dẫn' onChange={handleEditLanding} value={item.url} />
        ) : (
          `[${props.id}] ${props.url}`
        )}
      </div>
      <div className='ldpItem__cate'>
        {isEditLanding ? (
          <select name='category_id' onChange={handleEditLanding} value={item.category}>
            <option value={''} disabled>
              Chọn nhóm dịch vụ
            </option>
            {loadedCate &&
              cate.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category}
                </option>
              ))}
          </select>
        ) : (
          props.category.category
        )}
      </div>
      <div className='ldpItem__status'>
        <select
          name='status'
          style={{ background: Boolean(item.status) ? '#b6e5cf' : '#ffd0d0' }}
          onChange={handleEditLanding}
          value={item.status}
          disabled={!isEditLanding}
        >
          <option value={true}>Đang hoạt động</option>
          <option value={false}>Vô hiệu hóa</option>
        </select>
      </div>
      {isEditLanding ? (
        <div className='ldpItem__action'>
          <button className='ldpItem__save' onClick={handleSaveLanding}></button>
          <button className='ldpItem__cancel' onClick={handleCloseEditLanding}></button>
        </div>
      ) : (
        <div className='ldpItem__action'>
          <button
            className='ldpItem__edit'
            data-tooltip-id='edit-tooltip'
            data-tooltip-content='Chỉnh sửa'
            data-tooltip-delay-show={1000}
            onClick={handleOpenEditLanding}
          ></button>
          <Tooltip id='edit-tooltip' />

          <button
            className='ldpItem__delete'
            data-tooltip-id='delete-tooltip'
            data-tooltip-content='Xóa'
            data-tooltip-delay-show={1000}
            onClick={handleConfirmModal}
          ></button>
          <Tooltip id='delete-tooltip' />

          <button
            className='ldpItem__setting'
            data-tooltip-id='setting-tooltip'
            data-tooltip-content='Gia hạn'
            data-tooltip-delay-show={1000}
            onClick={handleOpenExtension}
          ></button>
          <Tooltip id='setting-tooltip' />

          <button
            className='ldpItem__detail'
            data-tooltip-id='detail-tooltip'
            data-tooltip-content='Chi tiết'
            data-tooltip-delay-show={1000}
            onClick={handlePriceList}
          ></button>
          <Tooltip id='detail-tooltip' />
        </div>
      )}
      {openExtension && (
        <ExtensionList handleOpenExtension={handleOpenExtension} landingId={props.id} token={props.token} />
      )}
      {openPriceList && <PriceList token={props.token} landingId={props.id} handlePriceList={handlePriceList} />}
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} action={handleDeleteLanding} />}
    </div>
  );
};

export default LdpItem;
