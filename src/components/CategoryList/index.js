import React, { useEffect, useRef, useState } from 'react';
import './categoryList.scss';
import closeIcon from '../../assets/icons/close-icon.svg';

import Loading from '../Loading';
import CategoryItem from '../CategoryItem';

const CategoryList = ({ handleOpenCategory }) => {
  return (
    <div className='categoryList'>
      <div className='categoryList__box'>
        <div className='categoryList__header'>
          <span>Danh mục</span>
        </div>
        <div className='categoryList__close' onClick={handleOpenCategory}>
          <img width='20' height='20' src={closeIcon} alt='' />
        </div>

        <div className='categoryList__head'>
          <div className='categoryList__title'>Danh mục</div>
        </div>

        <div className='categoryList__body'>
          <CategoryItem />
          {/* <div className='categoryList__loading'>
            <Loading borderColor={'#ccc'} borderTopColor={'#2aa9f3'} size={30} />
          </div> */}
        </div>
        {true ? (
          <div className='categoryList__item'>
            <div className='categoryList__input'>
              <input type='text' name='category' placeholder='Nhập danh mục ...' />
            </div>

            <div className='categoryList__action'>
              <button className='categoryList__save'></button>
              <button className='categoryList__cancel'></button>
            </div>
          </div>
        ) : (
          <div className='categoryList__addNew'>+ Thêm mới</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
