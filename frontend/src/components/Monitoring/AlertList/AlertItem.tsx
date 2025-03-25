import useIsModalOpen from '../../../hooks/useIsModalOpen';
import * as S from './style.ts';
import AlertModal from '../AlertModal/AlertModal.tsx';

interface AlertItemProps {
  id: number;
  category: string;
  date: string;
  address: string;
  state: string;
  clicked: boolean;
}

const AlertItem = ({ id, category, date, address, state, clicked }: AlertItemProps) => {
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

  return (
    <div>
      <S.Layout clicked={clicked}>
        <S.ColorDiv category={category} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateP>{date}</S.DateP>
            <S.StateCircle state={state} />
          </S.DateWrapper>
          <S.CategoryDiv>
            <S.AlertIcon category={category} />
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
              }}
            />
          )}
        </S.CardDiv>
      </S.Layout>
    </div>
  );
};

export default AlertItem;
