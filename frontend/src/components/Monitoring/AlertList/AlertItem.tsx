import AlertModal from '../AlertModal/AlertModal.tsx';
import * as S from './AlertList.style.ts';
import { AlertProps } from '@/types/alert';
import { useItemStore } from '@/stores/itemStore';
import { useModal } from '@/hooks/useModal';

interface AlertItemProps extends AlertProps {
  clicked: boolean;
}

const AlertItem = ({ id, level, category, date, address, state, clicked }: AlertItemProps) => {
  const { updateItemState } = useItemStore();
  const { openModal, closeModal, currentItem } = useModal();

  const handleDetail = () => {
    openModal({ type: 'norealtime', id: id });
    if (state === '미확인') updateItemState(id, '확인');
  };

  return (
    <div>
      <S.Layout $clicked={clicked}>
        <S.ColorDiv $level={level} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateP>{date.replace(/-/g, '.')}</S.DateP>
            <S.StateCircle $state={state} />
          </S.DateWrapper>
          <S.CategoryDiv>
            <S.AlertIcon level={level} />
            {category} 감지
          </S.CategoryDiv>
          <S.AddressP>{address}</S.AddressP>
          <S.ShowButtoon onClick={handleDetail}>자세히 보기</S.ShowButtoon>
          {currentItem?.type === 'norealtime' && currentItem.id === id && (
            <AlertModal
              onClose={closeModal}
              alertItem={{
                id,
                level,
                category,
                date,
                address,
                state,
              }}
              highlight={false}
            />
          )}
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;
