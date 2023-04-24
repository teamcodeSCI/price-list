import React, { useState } from 'react';
import './ldpList.scss';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import LdpItem from '../../components/LdpItem';
import AddLdpModal from '../../components/AddLdpModal';
import Pagination from '../../components/Pagination';

const LdpList = ({ user }) => {
  const [search, setSearch] = useState('');
  const [openAddLdp, setOpenLdp] = useState(false);
  const brand = user.brand || '';
  const [pageNum, setPageNum] = useState(1);
  const range = 5;
  const pageCount = 10;
  const handleAddLdp = () => {
    setOpenLdp(!openAddLdp);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='ldpList'>
      <div className='ldpList__header'>
        <span>Thương hiệu {brand}</span>8 Landing Page
      </div>
      <div className='ldpList__control'>
        <div className='ldpList__search'>
          <Search handleSearch={handleSearch} search={search} placeholder='Tìm kiếm ...' />
        </div>
        <div className='ldpList__addNew'>
          <button onClick={handleAddLdp}>
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
      <div className='ldpList__pagination'>
        <Pagination pageNum={pageNum} setPageNum={setPageNum} pageCount={pageCount} range={range} />
      </div>
      {openAddLdp && <AddLdpModal handleAddLdp={handleAddLdp} />}
    </div>
  );
};

export default LdpList;
