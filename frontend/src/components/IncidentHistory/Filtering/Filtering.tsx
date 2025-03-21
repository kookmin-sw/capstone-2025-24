import * as S from './Filtering.style.ts';
import CategoryDropDown from '../../common/CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';

const Filtering = () => {
  return (
    <S.FilteringLayout>
      <CategoryDropDown />
      <DateFiltering />
      <SearchBar />
      <S.SearchBtn>조회</S.SearchBtn>
    </S.FilteringLayout>
  );
};

export default Filtering;
