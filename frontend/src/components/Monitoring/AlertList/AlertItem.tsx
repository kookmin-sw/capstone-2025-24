import useIsModalOpen from '@/hooks/useIsModalOpen';
import AlertModal from '../AlertModal/AlertModal.tsx';
import { AlertProps } from '@/types/alert';
import * as S from './style.ts';

interface AlertItemProps extends AlertProps {
  clicked: boolean;
}

const AlertItem = ({ id, level, category, date, address, state, clicked }: AlertItemProps) => {
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

  return (
    <div>
      <S.Layout clicked={clicked}>
        <S.ColorDiv level={level} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateP>{date}</S.DateP>
            <S.StateCircle state={state} />
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
