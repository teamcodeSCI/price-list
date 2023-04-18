import React, { useState } from 'react';
import './ldpList.scss';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import LdpItem from '../../components/LdpItem';

const LdpList = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className='ldpList'>
      <div className='ldpList__header'>
        <span>Thương hiệu Paris</span>8 Landing Page
      </div>
      <div className='ldpList__control'>
        <div className='ldpList__search'>
          <Search handleSearch={handleSearch} search={search} placeholder='Tìm kiếm ...' />
        </div>
        <div className='ldpList__addNew'>
          <button>
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <div className='ldpList__main'>
        <LdpItem />
        <LdpItem />
        <LdpItem />
        <LdpItem />
        <LdpItem />
      </div>
    </div>
  );
};

export default LdpList;
