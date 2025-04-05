import useIsModalOpen from '@/hooks/useIsModalOpen';
import AlertModal from '../AlertModal/AlertModal.tsx';
import * as S from './AlertList.style.ts';
import { AlertProps } from '@/types/alert';

interface AlertItemProps extends AlertProps {
  clicked: boolean;
}

const AlertItem = ({ id, level, category, date, address, state, clicked }: AlertItemProps) => {
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

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
          <S.ShowButtoon onClick={openModal}>자세히 보기</S.ShowButtoon>
          {isModalOpen && (
            <AlertModal
              onClose={closeModal}
              highlight={false}
              alertItem={{
                id,
                level,
                category,
                date,
                address,
                state,
              }}
            />
          )}
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;
