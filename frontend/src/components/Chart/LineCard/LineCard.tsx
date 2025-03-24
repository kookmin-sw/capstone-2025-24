import * as S from './LineCard.style';
import CalendarSection from './CalendarSection/CalendarSection';
const LineCard = () => {
  // const [data, setData] = useState<number[]>([21, 9, 7, 4, 1]);
  return (
    <S.LineCardLayout>
      <S.TitleDiv>
        <S.TitleP>시간대별 사건수</S.TitleP>
      </S.TitleDiv>
      <S.ContentDiv>
        <CalendarSection />
      </S.ContentDiv>
    </S.LineCardLayout>
  );
};

export default LineCard;
