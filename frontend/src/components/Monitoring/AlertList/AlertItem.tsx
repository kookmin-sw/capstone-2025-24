import * as S from './style.ts';

interface AlertItemProps {
  category: string;
  date: string;
  address: string;
  state: string;
  clicked: boolean;
}

const AlertItem = ({ category, date, address, state, clicked }: AlertItemProps) => {
  return (
    <div>
      <S.Layout clicked={clicked}>
        <S.ColorDiv category={category} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateP>{date}</S.DateP>
            <S.StateCircle state={state} />
          </S.DateWrapper>
          <S.CategoryDiv>
            <S.AlertIcon category={category} />
            {category} 감지
          </S.CategoryDiv>
          <S.AddressP>{address}</S.AddressP>
          <S.ShowButtoon>자세히 보기</S.ShowButtoon>
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;
