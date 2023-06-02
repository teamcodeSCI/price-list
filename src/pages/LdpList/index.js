import React, { useState } from 'react';
import './ldpList.scss';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import LdpItem from '../../components/LdpItem';
import AddLdpModal from '../../components/AddLdpModal';
import Pagination from '../../components/Pagination';
import { brandStyle } from '../../utils/help';
import Loading from '../../components/Loading';

const LdpList = ({ brand, token, brandId, isSuccessUser }) => {
  const [search, setSearch] = useState('');
  const [openAddLdp, setOpenLdp] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const style = brandStyle(brand);

  const handleAddLdp = () => {
    setOpenLdp(!openAddLdp);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='ldpList'>
      <div className='ldpList__header'>
        <span>Thương hiệu {brand}</span>
        Landing Page
      </div>
      <div className='ldpList__control'>
        <div className='ldpList__search'>
          <Search handleSearch={handleSearch} search={search} placeholder='Tìm kiếm ...' />
        </div>
        <div className='ldpList__addNew'>
          <button onClick={handleAddLdp} style={style.style}>
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
        </div>
      </div>
      <div className='ldpList__main'>
        {isSuccessUser ? (
          false ? (
            <p>Không có dữ liệu</p>
          ) : (
            [].map((item) => <LdpItem key={item.id} {...item} />)
          )
        ) : (
          <div className='ldpList__loading'>
            <Loading size={30} borderTopColor={style.borderLoading} />
          </div>
        )}
      </div>

      <div className='ldpList__pagination'>
        <Pagination
          brandStyle={style.style}
          brandClass={style.className}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageCount={pageCount}
          range={10}
        />
      </div>

      {openAddLdp && <AddLdpModal brandId={brandId} handleAddLdp={handleAddLdp} />}
    </div>
  );
};

export default LdpList;
