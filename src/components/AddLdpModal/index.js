import React, { useEffect, useRef, useState } from 'react';
import { useOutside } from '../../utils/help';
import './addLdpModal.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../apis/category';
import { categoryLoadedSelector, categorySelector } from '../../services/categoryService';
import { createLanding } from '../../apis/landing';

const AddLdpModal = ({ handleAddLdp, brandId, token }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const [info, setInfo] = useState({ url: '', category_id: 0, brand_id: brandId, status: true });
  const [notify, setNotify] = useState('');
  const category = useSelector(categorySelector);
  const categoryLoaded = useSelector(categoryLoadedSelector);
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleCreateCate = () => {
    if (info.url === '' || info.category_id === 0) {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    setNotify('');
    dispatch(createLanding({ body: info, token }));

    handleAddLdp();
  };
  useOutside(wrapperRef, handleAddLdp);
  useEffect(() => {
    dispatch(fetchCategory(brandId));
  }, [dispatch, brandId]);
  return (
    <div className='addLdpModal'>
      <div className='addLdpModal__box' ref={wrapperRef}>
        <div className='addLdpModal__title'>Thêm mới</div>
        <div className='addLdpModal__body'>
          <input type='text' name='url' onChange={handleInfo} value={info.url} placeholder='Nhập đường dẫn...' />
          <select name='category_id' onChange={handleInfo} defaultValue={info.category_id}>
            <option disabled value={0}>
              - - - Chọn nhóm dịch vụ - - -
            </option>
            {categoryLoaded &&
              category.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category}
                </option>
              ))}
          </select>
        </div>
        {notify !== '' && <p>{notify}</p>}
        <div className='addLdpModal__footer'>
          <button className='addLdpModal__cancel' onClick={handleAddLdp}>
            Hủy
          </button>
          <button className='addLdpModal__addNew' onClick={handleCreateCate}>
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLdpModal;
