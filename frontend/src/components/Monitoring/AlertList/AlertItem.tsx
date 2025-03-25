import useIsModalOpen from '../../../hooks/useIsModalOpen';
import * as S from './style.ts';
import AlertModal from '../AlertModal/AlertModal.tsx';

interface AlertItemProps {
  id: number;
  level: number;
  category: string;
  date: string;
  address: string;
  state: '미확인' | '확인' | '미출동' | '출동' | '완료';
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
