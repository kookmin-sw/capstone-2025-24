import * as S from './IncidentDetailsModal.style.ts';
import Information from './Information.tsx';
import Memo from './Memo.tsx';
import Map from './Map.tsx';
import Video from './Video.tsx';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incidentId: number;
}

const IncidentDetailsModal = ({ isOpen, onClose, incidentId }: IncidentDetailsModalProps) => {
  if (!isOpen) return null;

  // API 요청할 때 incidentId 넘겨주면 사건 정보 받아옴
  console.log(incidentId);


  return (
    <S.Overlay onClick={onClose}>
      <S.Layout>
        <S.TitleBtnContainer>
          <S.TitleP>사건 세부 정보</S.TitleP>
          <S.XBtn onClick={onClose} />
        </S.TitleBtnContainer>
        <S.WrapperContainer>
          <S.InfoMapWrapper>
            <Information />
            <Map />
          </S.InfoMapWrapper>
          <S.VideoMemoWrapper>
            <Video />
            <Memo />
          </S.VideoMemoWrapper>
        </S.WrapperContainer>
      </S.Layout>
    </S.Overlay>
  );
};

export default IncidentDetailsModal;
