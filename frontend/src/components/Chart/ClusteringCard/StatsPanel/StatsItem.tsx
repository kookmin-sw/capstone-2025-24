import * as S from './StatsPanel.style';
import AnimatedBar from './AnimatedBar';
import { STATSLABEL } from '../../../../constants/labelList';
interface StatsItemProps {
  label: string;
  count: string;
  isVisible: boolean;
}
const StatsItem = ({ label, count, isVisible }: StatsItemProps) => {
  return (
    <S.StatsItemLayout>
      <S.LabelDiv>
        <p>{STATSLABEL.find((item) => item.key === label)?.text}</p>
        <p>{count}%</p>
      </S.LabelDiv>
      <S.RatioBar>
        <AnimatedBar
          target={parseInt(count)}
          color={STATSLABEL.find((item) => item.key === label)?.color || '#000'}
          isVisible={isVisible}
        />
      </S.RatioBar>
    </S.StatsItemLayout>
  );
};

export default StatsItem;
