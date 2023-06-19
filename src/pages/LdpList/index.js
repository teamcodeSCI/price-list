import React, { useEffect, useState } from 'react';
import './ldpList.scss';
import Search from '../../components/Search';
import plusIcon from '../../assets/icons/plus-icon.svg';
import LdpItem from '../../components/LdpItem';
import AddLdpModal from '../../components/AddLdpModal';
import Pagination from '../../components/Pagination';
import { brandStyle } from '../../utils/help';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanding } from '../../apis/landing';

import {
  landingLoadedSelector,
  landingNumberSelector,
  landingPageCountSelector,
  landingSelector,
} from '../../services/landingService';
import { Tooltip } from 'react-tooltip';

const LdpList = ({ brand, token, brandId, isSuccessUser }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [openAddLdp, setOpenLdp] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const style = brandStyle(brand);
  const pageCount = useSelector(landingPageCountSelector);
  const loadedLanding = useSelector(landingLoadedSelector);
  const landingNumber = useSelector(landingNumberSelector);

  // const loadingLanding = useSelector(landingLoadingSelector);
  // const errorLanding = useSelector(landingErrorSelector);
  const listLanding = useSelector(landingSelector);

  const handleAddLdp = () => {
    setOpenLdp(!openAddLdp);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isSuccessUser) dispatch(fetchLanding({ token, brandId, pageNum, filter: search }));
  }, [dispatch, isSuccessUser, token, brandId, pageNum, search]);
  return (
    <div className='ldpList'>
      <div className='ldpList__header'>
        <span>Thương hiệu {brand}</span>
        {isSuccessUser && loadedLanding ? landingNumber : 0} Landing Page
      </div>
      <div className='ldpList__control'>
        <div className='ldpList__search'>
          <Search handleSearch={handleSearch} search={search} placeholder='Tìm kiếm ...' />
        </div>
        <div className='ldpList__addNew'>
          <button
            data-tooltip-id='addNew-tooltip'
            data-tooltip-content='Thêm mới'
            data-tooltip-delay-show={1000}
            onClick={handleAddLdp}
            style={style.style}
          >
            <img width={15} height={15} src={plusIcon} alt='' />
          </button>
          <Tooltip id='addNew-tooltip' />
        </div>
      </div>
      <div className='ldpList__main'>
        {isSuccessUser && loadedLanding ? (
          listLanding.length === 0 ? (
            <p> Không có dữ liệu</p>
          ) : (
            listLanding.map((item) => <LdpItem key={item.id} {...item} token={token} />)
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
      {openAddLdp && <AddLdpModal brandId={brandId} token={token} handleAddLdp={handleAddLdp} />}
    </div>
  );
};

export default LdpList;
