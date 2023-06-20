import React, { useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import './categoryItem.scss';

const CategoryItem = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className='categoryItem'>
      {isEdit ? (
        <div className='categoryItem__input'>
          <input type='text' name='category' placeholder='Nhập danh mục ...' />
        </div>
      ) : (
        'Danh mục'
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
