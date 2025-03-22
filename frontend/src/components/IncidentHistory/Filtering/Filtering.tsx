import * as S from './Filtering.style.ts';
import CategoryDropDown from '../../common/CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';
import { useState } from 'react';

const Filtering = () => {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [startDateFilter, setStartDateFilter] = useState(new Date('2024/01/01'));
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [searchType, setSearchType] = useState('담당 경찰');
  const [searchWord, setSearchWord] = useState('');

  const handleClick = () => {
    // 선택된 필터링 정보들
    console.log(categoryFilter);
    console.log(startDateFilter);
    console.log(endDateFilter);
    console.log(searchType);
    console.log(searchWord);
  };

  return (
    <div>
      <S.DropDownInfoLayout>
        <S.InfoP w={165}>사건 분류</S.InfoP>
        <S.InfoP w={201}>시작 날짜</S.InfoP>
        <S.InfoP w={201}>종료 날짜</S.InfoP>
      </S.DropDownInfoLayout>

      <S.FilteringLayout>
      <CategoryDropDown selected={categoryFilter} setSelected={setCategoryFilter} />
        <DateFiltering
          startDate={startDateFilter}
          endDate={endDateFilter}
          setStartDate={setStartDateFilter}
          setEndDate={setEndDateFilter}
        />
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
        <S.SearchBtn onClick={handleClick}>조회</S.SearchBtn>
      </S.FilteringLayout>
    </div>
  );
};

export default Filtering;
