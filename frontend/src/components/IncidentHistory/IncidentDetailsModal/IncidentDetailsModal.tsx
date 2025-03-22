import React from 'react';
import * as S from './IncidentDetailsModal.style.ts';
import Information from './Information.tsx';
import Memo from './Memo.tsx';
import Map from './Map.tsx';
import Video from './Video.tsx';

const IncidentDetailsModal: React.FC = () => {
  return (
    <S.Layout>
      <S.TitleP>사건 세부 정보</S.TitleP>
      <S.WrapperContainer>
        <S.InfoMapWrapper>
          <Information />
          <Map />
        </S.InfoMapWrapper>
        <S.VideoMemoWrapper>
          <Video/>
          <Memo />
        </S.VideoMemoWrapper>
      </S.WrapperContainer>
    </S.Layout>
  );
};

export default IncidentDetailsModal;
