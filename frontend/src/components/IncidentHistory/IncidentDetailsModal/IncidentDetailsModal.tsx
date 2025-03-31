import * as S from './IncidentDetailsModal.style.ts';
import Information from './Information.tsx';
import Memo from './Memo.tsx';
import Map from './Map.tsx';
import Video from './Video.tsx';
import { Incident } from '@/types/incident.ts';
import { categoryToKorean } from '@/utils/categoryMapper.ts';
import { useState, useEffect } from 'react';
import { getIncidentInfo, putMemo } from '@/apis/IncidentHistoryApi';

interface IncidentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident;
}

const IncidentDetailsModal = ({ isOpen, onClose, incident }: IncidentDetailsModalProps) => {
  const [memo, setMemo] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [videourl, setVideourl] = useState('');

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const data = await getIncidentInfo(incident.id);
        setMemo(data.memo);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setVideourl(data.videourl);

      } catch (error) {
        console.log('사건 정보를 불러오는데 실패했습니다.', error);
      }
    };

    fetchIncident();
  }, []);

  const handleClose = async () => {
    try {
      await putMemo(incident.id, memo);
      onClose();
    } catch (error) {
      console.log('메모 저장에 실패했습니다.', error);
    }
  };

  if (!isOpen) return null;

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
            <Map latitude={latitude} longitude={longitude}/>
          </S.InfoMapWrapper>
          <S.VideoMemoWrapper>
            <Video />
            <Memo content={memo} setContent={setMemo} />
          </S.VideoMemoWrapper>
        </S.WrapperContainer>
      </S.Layout>
    </S.Overlay>
  );
};

export default IncidentDetailsModal;
