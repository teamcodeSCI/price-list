import React, { useRef, useState } from 'react';

import { useOutside } from '../../utils/help';
import './addLdpModal.scss';
import { useCategory } from '../../services/categoryService';
import { useCreateLanding } from '../../services/landingService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AddLdpModal = ({ handleAddLdp, brandId }) => {
  const wrapperRef = useRef(null);
  const [token, setToken] = useLocalStorage('token', null);
  const [info, setInfo] = useState({ url: '', category_id: 0, brand_id: brandId, status: true });
  const [notify, setNotify] = useState('');
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const { dataCategory, isSuccessCategory } = useCategory({ brandId });
  const { mutateCreateLanding } = useCreateLanding(token);

  const handleCreateCate = () => {
    if (info.url === '' || info.category_id === 0) {
      setNotify('Vui lòng nhập đủ thông tin !');
      return;
    }
    setNotify('');
    mutateCreateLanding(
      { url: info.url, category_id: Number(info.category_id), brand_id: brandId, status: true },
      {
        onSuccess: () => {
          setNotify('');
          handleAddLdp();
        },
        onError: (error) => {
          setNotify(error.data.message);
        },
      }
    );
  };
  useOutside(wrapperRef, handleAddLdp);

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
            {isSuccessCategory &&
              dataCategory.data.data.map((item) => (
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
