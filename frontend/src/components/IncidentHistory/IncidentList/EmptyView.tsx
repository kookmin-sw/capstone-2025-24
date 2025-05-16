import policerEmpty from '@/assets/images/policerEmpty.png';
import * as S from './IncidentList.style.ts';

const EmptyView = () => {
  return (
    <S.EmtyViewLayout>
      <S.EmptyImg src={policerEmpty} />
      <S.EmtyViewP>조회 결과가 없어요</S.EmtyViewP>
    </S.EmtyViewLayout>
  );
};
export default EmptyView;
