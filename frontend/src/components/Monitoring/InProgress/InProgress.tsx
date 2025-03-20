import { useState } from 'react';
import VideoModal from './VideoModal';
import { InProgresstData } from '../../../mocks/InProgressData.tsx';
import { IoMdCamera } from 'react-icons/io';
import video from './test.mov';
import * as S from './InProgress.style.ts';

const InProgress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const openModal = () => {
    // setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedVideoUrl("");
  };
  return (
    <S.InProgressLayout>
      <S.Title>출동중인 사건 (총 {InProgresstData.length}건)</S.Title>
      <S.CardGrid>
        {InProgresstData.map((incident) => (
          <S.Card key={incident.id}>
            <S.CardHeader>
              <S.CardTitle>{incident.title} 감지</S.CardTitle>
              <S.VideoButton onClick={() => openModal()}>
                {/* <S.VideoButton onClick={() => handleOpenModal(incident.videoUrl)}> */}
                <IoMdCamera className="icon" />
                영상 확인
              </S.VideoButton>
            </S.CardHeader>
            <S.Line />
            <S.CardBody>
              <S.LocationTitle>발생 위치</S.LocationTitle>
              <S.LocationAddress>{incident.location}</S.LocationAddress>
              <S.ResolveButton>사건 해결</S.ResolveButton>
            </S.CardBody>
            <S.CardFooter>
              <span>{incident.dateTime}</span>
              <span>{incident.police} 순경</span>
            </S.CardFooter>
          </S.Card>
        ))}
      </S.CardGrid>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={video} />
    </S.InProgressLayout>
  );
};

export default InProgress;
