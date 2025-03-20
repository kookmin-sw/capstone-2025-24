import * as S from './DoughnutCard.style';
import DoughnutChart from './DoughnutChart';
import ChartFilter from './ChartFilter/ChartFilter';

interface DoughnutCardProps {
  title?: string;
}
const DoughnutCard = ({ title }: DoughnutCardProps) => {
  return (
    <S.DoughnutCardLayout>
      <S.TitleDiv>
        <S.TitleP>{title}</S.TitleP>
        <ChartFilter />
      </S.TitleDiv>
      <DoughnutChart />
    </S.DoughnutCardLayout>
  );
};

export default DoughnutCard;
