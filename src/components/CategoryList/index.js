import React, { useEffect, useRef, useState } from 'react';
import './categoryList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';

import Loading from '../Loading';
import CategoryItem from '../CategoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { useOutside } from '../../utils/help';
import { createCategory, fetchCategory } from '../../apis/category';
import { categoryLoadedSelector, categoryLoadingSelector, categorySelector } from '../../services/categoryService';

const CategoryList = ({ handleOpenCategory, brandId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const category = useSelector(categorySelector);
  const categoryLoaded = useSelector(categoryLoadedSelector);
  const categoryLoading = useSelector(categoryLoadingSelector);
  const [cate, setCate] = useState({ brand_id: brandId, category: '' });
  const handleCate = (e) => {
    setCate({ ...cate, [e.target.name]: e.target.value });
  };
  const handleIsAddNew = () => {
    setIsAddNew(!isAddNew);
    setIsError(false);
  };
  const addCate = () => {
    if (cate.category === '') {
      setIsError(true);
      return;
    }
    setCate({ ...cate, brand_id: brandId, category: '' });
    setIsError(false);
    setIsAddNew(false);
    dispatch(createCategory(cate));
  };
  useOutside(ref, handleOpenCategory);
  useEffect(() => {
    dispatch(fetchCategory(brandId));
  }, [dispatch, brandId]);
  return (
    <div className='categoryList'>
      <div className='categoryList__box' ref={ref}>
        <div className='categoryList__header'>Danh mục</div>
        <div className='categoryList__close' onClick={handleOpenCategory}>
          <img width='20' height='20' src={closeIcon} alt='' />
        </div>

        <div className='categoryList__body'>
          {categoryLoaded && categoryLoading ? (
            <div className='categoryList__loading'>
              <Loading borderColor={'#ccc'} borderTopColor={'#2aa9f3'} size={30} />
            </div>
          ) : category.length === 0 ? (
            <p>Không có dữ liệu</p>
          ) : (
            category.map((item) => <CategoryItem key={item.id} {...item} />)
          )}
        </div>
        {isAddNew ? (
          <div className='categoryList__item'>
            <div className='categoryList__input'>
              <input
                type='text'
                name='category'
                placeholder='Nhập danh mục ...'
                value={cate.category}
                onChange={handleCate}
                className={isError ? 'categoryList__error' : ''}
              />
            </div>

            <div className='categoryList__action'>
              <button className='categoryList__save' onClick={addCate}></button>
              <button className='categoryList__cancel' onClick={handleIsAddNew}></button>
            </div>
          </div>
        ) : (
          <div className='categoryList__addNew' onClick={handleIsAddNew}>
            + Thêm mới
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
