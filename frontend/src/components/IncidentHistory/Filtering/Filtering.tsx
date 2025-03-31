import * as S from './Filtering.style.ts';
import CategoryDropDown from '../../common/CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';
import { useState, useEffect } from 'react';
import SortingDropDown from './SortingDropDown.tsx';
import { Incident } from '@/types/incident.ts';
import { getIncidentList } from '@/apis/IncidentHistoryApi.ts';
import { LABELBYCATEGORY } from '@/constants/labelList.ts';

interface FilteringProps {
  setIncidentData: React.Dispatch<React.SetStateAction<Incident[]>>;
  page: number;
}

const SortMap: Record<string, string> = {
  최신순: 'latest',
  과거순: 'oldest',
};

const formatDateTime = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

const Filtering = ({ setIncidentData, page }: FilteringProps) => {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [startDateFilter, setStartDateFilter] = useState(new Date('2024/01/01'));
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [searchType, setSearchType] = useState('담당 경찰');
  const [searchWord, setSearchWord] = useState('');
  const [sort, setSort] = useState('최신순');

  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleClick = () => {
    setTriggerFetch((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryItem = LABELBYCATEGORY.find((item) => item.text === categoryFilter);
      const CategoryLabel = categoryItem ? categoryItem.key : null;
      const sortLabel = SortMap[sort];
      const location = searchType === '위치' ? searchWord : null;
      const police = searchType === '담당 경찰' ? searchWord : null;

      const requestData = {
        category: CategoryLabel,
        startDate: formatDateTime(startDateFilter),
        endDate: formatDateTime(endDateFilter),
        location: location,
        police: police,
        order: sortLabel,
        page: 1,
      };
      // const requestData = {
      //   category: null,
      //   startDate: null,
      //   endDate: null,
      //   order: "latest",
      //   page: 1,
      // };

      const data = await getIncidentList(requestData);
      if (data) {
        setIncidentData(data);
      }
    };

    fetchData();
  }, [triggerFetch, sort, page]);

  return (
    <S.Layout>
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
      <S.Container>
        <S.IncidentNum>총 112건</S.IncidentNum>
        <SortingDropDown sort={sort} setSort={setSort} />
      </S.Container>
    </S.Layout>
  );
};

export default Filtering;
