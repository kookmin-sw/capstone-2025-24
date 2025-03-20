import * as S from './style.ts';
import CategoryDropDown from '../../common/CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';

const Filtering = () => {
  return (
    <S.FilteringLayout>
      <CategoryDropDown />
      <DateFiltering />
      <SearchBar />
      <S.SearchButton>조회</S.SearchButton>
    </S.FilteringLayout>
  );
};

export default Filtering;
