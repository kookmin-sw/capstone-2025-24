import useIsModalOpen from '@/hooks/useIsModalOpen';
import AlertModal from '../AlertModal/AlertModal.tsx';
import * as S from './AlertList.style.ts';
import { AlertProps } from '@/types/alert';
import { useItemStore } from '@/stores/itemStore';

interface AlertItemProps extends AlertProps {
  clicked: boolean;
}

const AlertItem = ({ id, level, cctvId, category, date, address, state, clicked }: AlertItemProps) => {
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();
  const { updateItemState } = useItemStore();

  const handleDetail = () => {
    openModal();
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
          {isModalOpen && (
            <AlertModal
              onClose={closeModal}
              alertItem={{
                id,
                level,
                cctvId,
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
