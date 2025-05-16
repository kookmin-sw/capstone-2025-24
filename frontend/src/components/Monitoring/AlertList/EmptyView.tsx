import * as S from './AlertList.style.ts';
import FolderImg from '@/assets/icons/folderIcon.svg';

const EmptyView = () => {
  return (
    <S.EmptyViewLayout>
      <img src={FolderImg} />
      <S.TextP>알림 내역이 없어요</S.TextP>
    </S.EmptyViewLayout>
  );
};

export default EmptyView;
