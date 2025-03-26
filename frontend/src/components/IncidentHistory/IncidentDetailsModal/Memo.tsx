import { useState } from 'react';
import * as S from './IncidentDetailsModal.style.ts';

const Memo = () => {
  const [memoVal, setMemoVal] = useState('');
  return (
    <S.MemoLayout>
      <S.MemoP>메모</S.MemoP>
      <S.MemoInput placeholder="메모를 입력하세요." value={memoVal} onChange={(e) => setMemoVal(e.target.value)} />
    </S.MemoLayout>
  );
};
export default Memo;
