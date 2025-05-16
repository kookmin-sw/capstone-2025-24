import * as S from './IncidentDetailsModal.style.ts';

interface InformationProps {
  location: string;
  date: string;
  category: string;
  police: string;
}

const Information = ({ location, date, category, police }: InformationProps) => {
  return (
    <S.InformationLayout>
      <S.InfoContainer>
        <S.NameP>위치</S.NameP>
        <S.ValueP>{location}</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>시간</S.NameP>
        <S.ValueP>{date.replace(/-/g, '.')}</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>유형</S.NameP>
        <S.ValueP>{category}</S.ValueP>
      </S.InfoContainer>
      <S.InfoContainer>
        <S.NameP>담당</S.NameP>
        <S.ValueP>{police}</S.ValueP>
      </S.InfoContainer>
    </S.InformationLayout>
  );
};

export default Information;
