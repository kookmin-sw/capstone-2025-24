import * as S from './IncidentDetailsModal.style.ts';

interface MemoProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Memo = ({ content, setContent }: MemoProps) => {

  return (
    <S.MemoLayout>
      <S.MemoP>메모</S.MemoP>
      <S.MemoInput placeholder="메모를 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
    </S.MemoLayout>
  );
};
export default Memo;
