import * as S from './StatsPanel.style';
import AnimatedBar from './AnimatedBar';
interface StatsItemProps {
  label: string;
  count: string;
  isVisible: boolean;
  color: string;
}
const StatsItem = ({ label, count, isVisible, color }: StatsItemProps) => {
  return (
    <S.StatsItemLayout>
      <S.LabelDiv>
        <p>{label}</p>
        <p>{count}%</p>
      </S.LabelDiv>
      <S.RatioBar>
        <AnimatedBar target={parseInt(count)} color={color} isVisible={isVisible} />
      </S.RatioBar>
    </S.StatsItemLayout>
  );
};

export default StatsItem;
