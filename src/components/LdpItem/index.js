import React, { useState } from 'react';
import './ldpItem.scss';
import PriceList from '../PriceList';
import ConfirmModal from '../ConfirmModal';
import { strToBool } from '../../utils/help';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../apis/category';
import { categoryLoadedSelector, categorySelector } from '../../services/categoryService';
import { updateLanding } from '../../apis/landing';

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

  const handlePriceList = () => {
    setOpenPriceList(!openPriceList);
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
          props.url
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
          <button className='ldpItem__edit' onClick={handleOpenEditLanding}></button>
          <button className='ldpItem__delete' onClick={handleConfirmModal}></button>
          <button className='ldpItem__detail' onClick={handlePriceList}></button>
        </div>
      )}

      {openPriceList && <PriceList handlePriceList={handlePriceList} />}
      {openConfirmModal && <ConfirmModal handleConfirmModal={handleConfirmModal} />}
    </div>
  );
};

export default LdpItem;
