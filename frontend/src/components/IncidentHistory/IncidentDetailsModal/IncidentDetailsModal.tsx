import * as S from './IncidentDetailsModal.style.ts';
import Information from './Information.tsx';
import Memo from './Memo.tsx';
import Map from './Map.tsx';
import VideoComponent from '@/components/common/VideoComponent/VideoComponent.tsx';
import { Incident } from '@/types/incident.ts';
import { categoryToKorean } from '@/utils/categoryMapper.ts';
import { useState, useEffect } from 'react';
import { getIncidentInfo, putMemo } from '@/apis/IncidentHistoryApi';
import { IncidentModalInfo } from '@/types/incident.ts';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident;
}

const IncidentDetailsModal = ({ isOpen, onClose, incident }: IncidentDetailsModalProps) => {
  if (!isOpen) return null;

  const [incidentDetails, setIncidentDetails] = useState<IncidentModalInfo>({
    memo: '',
    latitude: 0,
    longitude: 0,
    videourl: '',
  });

  useEffect(() => {
    const fetchIncident = async () => {
      const data = await getIncidentInfo(incident.id);
      setIncidentDetails({
        memo: data.memo,
        latitude: data.latitude,
        longitude: data.longitude,
        videourl: data.video,
      });
    };

    fetchIncident();
  }, []);

  const handleClose = async () => {
    await putMemo(incident.id, incidentDetails.memo);
    onClose();
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.Layout onClick={(e) => e.stopPropagation()}>
        <S.TitleBtnContainer>
          <S.TitleP>사건 세부 정보</S.TitleP>
          <S.XBtn onClick={handleClose} />
        </S.TitleBtnContainer>
        <S.WrapperContainer>
          <S.InfoMapWrapper>
            <Information
              location={incident.address}
              date={incident.date}
              category={categoryToKorean[incident.category] || incident.category}
              police={incident.policeName}
            />
            <Map latitude={incidentDetails.latitude} longitude={incidentDetails.longitude} />
          </S.InfoMapWrapper>
          <S.VideoMemoWrapper>
            <VideoComponent w={586} h={361} radius={8} video={incidentDetails.videourl} />
            <Memo
              content={incidentDetails.memo}
              setContent={(newMemo) => setIncidentDetails((prev) => ({ ...prev, memo: newMemo }))}
            />
          </S.VideoMemoWrapper>
        </S.WrapperContainer>
      </S.Layout>
    </S.Overlay>
  );
};

export default IncidentDetailsModal;
