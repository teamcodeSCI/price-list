import React, { useEffect, useMemo, useState } from 'react';
import './ldpList.scss';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import LdpItem from '../../components/LdpItem';
import AddLdpModal from '../../components/AddLdpModal';
import Pagination from '../../components/Pagination';
import { brandStyle, removeAccents } from '../../utils/help';
import { useLanding } from '../../services/landingService';
import Loading from '../../components/Loading';

const LdpList = ({ brand, token, brandId, isSuccessUser }) => {
  const [search, setSearch] = useState('');
  const [openAddLdp, setOpenLdp] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const range = 5;

  const paginationLimit = 10;
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  const style = brandStyle(brand);
  const { dataLanding, isSuccessLanding } = useLanding({
    token,
    brandId,
  });

  const handleAddLdp = () => {
    setOpenLdp(!openAddLdp);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderData = useMemo(() => [], []);

  useEffect(() => {
    renderData.length = 0;
    if (isSuccessUser && isSuccessLanding) {
      const data =
        search === ''
          ? dataLanding.data.data
          : dataLanding.data.data.filter((item) => removeAccents(item.url).search(search) !== -1);

      setPageCount(Math.ceil(data.length / paginationLimit));

      data.forEach((item, index) => {
        if (index >= prevRange && index < currRange) {
          renderData.push(item);
        }
      });
    }
  }, [search, dataLanding, pageCount, prevRange, currRange, renderData, isSuccessLanding, isSuccessUser]);
  return (
    <div className='ldpList'>
      <div className='ldpList__header'>
        <span>Thương hiệu {brand}</span>
        {(isSuccessUser && isSuccessLanding && dataLanding.data.data.length) || 0} Landing Page
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
        {isSuccessUser && isSuccessLanding ? (
          dataLanding.data.data.length === 0 ? (
            <p>Không có dữ liệu</p>
          ) : (
            renderData.map((item) => <LdpItem key={item.id} {...item} />)
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
          range={range}
        />
      </div>
      {openAddLdp && <AddLdpModal handleAddLdp={handleAddLdp} />}
    </div>
  );
};

export default LdpList;
