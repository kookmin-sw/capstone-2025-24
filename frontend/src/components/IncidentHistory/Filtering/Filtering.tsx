import * as S from './Filtering.style.ts';
import CategoryDropDown from './CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';
import { useState, useEffect } from 'react';
import SortingDropDown from './SortingDropDown.tsx';
import { Incident } from '@/types/incident.ts';
import { getIncidentList } from '@/apis/IncidentHistoryApi.ts';
import { categoryToEnglish } from '@/utils/categoryMapper.ts';
import { FilteringInfo } from '@/types/incident.ts';

interface FilteringProps {
  setIncidentData: React.Dispatch<React.SetStateAction<Incident[]>>;
  page: number;
  dataLength: number;
  setDataLength: (value: number) => void;
  setPageLength: (value: number) => void;
  setCurrentPage: (value: number) => void;
  setLastFilter: (value: FilteringInfo) => void;
  lastFilter: FilteringInfo;
}

const SortMap: Record<string, string> = {
  최신순: 'latest',
  과거순: 'oldest',
};

const formatDateTime = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};

const Filtering = ({
  setIncidentData,
  page,
  dataLength,
  setDataLength,
  setPageLength,
  setCurrentPage,
  setLastFilter,
  lastFilter,
}: FilteringProps) => {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [startDateFilter, setStartDateFilter] = useState(new Date('2024/01/01'));
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [searchType, setSearchType] = useState('담당 경찰');
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('최신순');

  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleClick = () => {
    setLastFilter({
      category: categoryFilter,
      startDate: startDateFilter,
      endDate: endDateFilter,
      searchType,
      searchWord,
    });

    setCurrentPage(1);
    setTriggerFetch((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryLabel = categoryToEnglish[categoryFilter] || null;

      const requestData = {
        category: categoryLabel,
        startDate: formatDateTime(lastFilter.startDate),
        endDate: formatDateTime(lastFilter.endDate),
        address: lastFilter.searchType === '위치' ? lastFilter.searchWord : null,
        police: lastFilter.searchType === '담당 경찰' ? lastFilter.searchWord : null,
        order: SortMap[sort],
        page,
      };

      const data = await getIncidentList(requestData);
      if (data) {
        setIncidentData(data.results);
        setDataLength(data.totalElements);
        setPageLength(data.totalPages);
      }
    };

    fetchData();
  }, [triggerFetch, sort, page]);

  return (
    <S.Layout>
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
        <S.BtnWrapper>
          <S.SearchBtn onClick={handleClick}>조회</S.SearchBtn>
        </S.BtnWrapper>
      </S.FilteringLayout>
      <S.Container>
        <S.IncidentNum>총 {dataLength}건</S.IncidentNum>
        <SortingDropDown sort={sort} setSort={setSort} />
      </S.Container>
    </S.Layout>
  );
};

export default Filtering;
