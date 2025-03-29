import * as S from './IncidentDetailsModal.style.ts';
import Information from './Information.tsx';
import Memo from './Memo.tsx';
import Map from './Map.tsx';
import Video from './Video.tsx';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: {
    id: number;
    policeId: number;
    policeName: string;
    cctvId: number;
    location: string;
    date: string;
    category: string;
    memo: string | null;
  };
}

const IncidentDetailsModal = ({ isOpen, onClose, incident }: IncidentDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Layout onClick={(e) => e.stopPropagation()}>
        <S.TitleBtnContainer>
          <S.TitleP>사건 세부 정보</S.TitleP>
          <S.XBtn onClick={onClose} />
        </S.TitleBtnContainer>
        <S.WrapperContainer>
          <S.InfoMapWrapper>
            <Information
              location={incident.location}
              date={incident.date}
              category={incident.category}
              police={incident.policeName}
            />
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