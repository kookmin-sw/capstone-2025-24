import * as S from './Sidebar.style';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <S.Backdrop>
      <S.ModalBox>
        <S.Message>{message}</S.Message>
        <S.ButtonGroup>
          <S.CancelBtn onClick={onCancel}>취소</S.CancelBtn>
          <S.ConfirmBtn onClick={onConfirm}>확인</S.ConfirmBtn>
        </S.ButtonGroup>
      </S.ModalBox>
    </S.Backdrop>
  );
};

export default ConfirmModal;
