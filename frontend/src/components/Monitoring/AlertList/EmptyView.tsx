import React from 'react';
import * as S from './style.ts';
import FolderImg from '@/assets/folder_icon.svg';

const EmptyView: React.FC = () => {
  return (
    <S.EmptyViewLayout>
      <img src={FolderImg} />
      <S.TextDiv>알림 내역이 없어요</S.TextDiv>
    </S.EmptyViewLayout>
  );
};

export default EmptyView;
