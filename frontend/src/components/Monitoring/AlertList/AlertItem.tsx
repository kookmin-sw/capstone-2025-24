import useIsModalOpen from '@/hooks/useIsModalOpen';
import AlertModal from '../AlertModal/AlertModal.tsx';
import * as S from './AlertList.style.ts';
import { AlertProps } from '@/types/alert';
import { axiosInstance } from '@/apis/axiosInstance';

interface AlertItemProps extends AlertProps {
  clicked: boolean;
}

const AlertItem = ({ id, level, category, date, address, state, clicked }: AlertItemProps) => {
  const { isModalOpen, openModal, closeModal } = useIsModalOpen();

  const handlePost = async () => {
    openModal();

    try {
      const response = await axiosInstance.post('api/v1/case/detect', {
        officeId: 2,
        cctvId: 1,
        level: 1,
        category: 'crowd_congestion',
        video: 'https://storage.example.com/videos/fire_2025-03-29.mp4',
        memo: '',
      });
      console.log('AI post 성공 : ', response.data);
    } catch (error) {
      console.log('AI post 에러', error);
    }
  };

  return (
    <div>
      <S.Layout clicked={clicked}>
        <S.ColorDiv level={level} />
        <S.CardDiv>
          <S.DateWrapper>
            <S.DateP>{date.replace(/-/g, '.')}</S.DateP>
            <S.StateCircle state={state} />
          </S.DateWrapper>
          <S.CategoryDiv>
            <S.AlertIcon level={level} />
            {category} 감지
          </S.CategoryDiv>
          <S.AddressP>{address}</S.AddressP>
          <S.ShowButtoon onClick={handlePost}>자세히 보기</S.ShowButtoon>
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
