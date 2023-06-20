import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../ConfirmModal';
import './categoryItem.scss';
import { deleteCategory, updateCategory } from '../../apis/category';

const CategoryItem = (props) => {
  const dispatch = useDispatch();
  const [cate, setCate] = useState({ category: props.category, brand_id: props.brand_id });
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
    setIsError(false);
  };
  const handleCate = (e) => {
    setCate({ ...cate, [e.target.name]: e.target.value });
  };
  const saveCate = () => {
    if (cate.category === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    dispatch(updateCategory({ body: cate, categoryId: props.id }));
  };
  const handleDelete = () => {
    setIsDelete(!isDelete);
  };
  const deleteCate = () => {
    dispatch(deleteCategory({ categoryId: props.id }));
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
            className={isError ? 'categoryItem__error' : ''}
          />
        </div>
      ) : (
        props.category
      )}

      <div className='categoryItem__action'>
        {isEdit ? (
          <>
            <button className='categoryItem__save' onClick={saveCate}></button>
            <button className='categoryItem__close' onClick={handleIsEdit}></button>
          </>
        ) : (
          <>
            <button className='categoryItem__edit' onClick={handleIsEdit}></button>
            <button className='categoryItem__delete' onClick={handleDelete}></button>
          </>
        )}
      </div>
      {isDelete && <ConfirmModal action={deleteCate} handleConfirmModal={handleDelete} />}
    </div>
  );
};

export default CategoryItem;
