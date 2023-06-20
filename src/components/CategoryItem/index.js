import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import './categoryItem.scss';

const CategoryItem = (props) => {
  const [cate, setCate] = useState({ category: props.category, brand_id: props.brand_id });
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleCate = (e) => {
    setCate({ ...cate, [e.target.name]: e.target.value });
  };
  return (
    <div className='categoryItem'>
      {isEdit ? (
        <div className='categoryItem__input'>
          <input
            type='text'
            name='category'
            placeholder='Nhập danh mục ...'
            value={cate.category}
            onChange={handleCate}
          />
        </div>
      ) : (
        props.category
      )}

      <div className='categoryItem__action'>
        {isEdit ? (
          <>
            <button className='categoryItem__save'></button>
            <button className='categoryItem__close' onClick={handleIsEdit}></button>
          </>
        ) : (
          <>
            <button className='categoryItem__edit' onClick={handleIsEdit}></button>
            <button className='categoryItem__delete'></button>
          </>
        )}
      </div>
      {/* {isDelCategory && <ConfirmModal action={delCategory} handleConfirmModal={handleDelCategory} />} */}
    </div>
  );
};

export default CategoryItem;
