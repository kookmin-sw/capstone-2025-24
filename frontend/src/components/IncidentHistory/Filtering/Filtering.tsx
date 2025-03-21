import * as S from './Filtering.style.ts';
import CategoryDropDown from '../../common/CategoryDropDown/CategoryDropDown.tsx';
import DateFiltering from './DateFiltering.tsx';
import SearchBar from './SearchBar.tsx';

const Filtering = () => {
  return (
    <div>
      <S.DropDownInfoLayout>
        <S.InfoP w={165}>사건 분류</S.InfoP>
        <S.InfoP w={201}>시작 날짜</S.InfoP>
        <S.InfoP w={201}>종료 날짜</S.InfoP>
      </S.DropDownInfoLayout>

      <S.FilteringLayout>
        <CategoryDropDown />
        <DateFiltering />
        <SearchBar />
        <S.SearchBtn>조회</S.SearchBtn>
      </S.FilteringLayout>
    </div>
  );
};

export default Filtering;
