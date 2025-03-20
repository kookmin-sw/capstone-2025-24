import { IoMdCamera } from "react-icons/io";
import * as S from './InProgress.style.ts';

const InProgress = () => {
  return (
    <S.InProgressLayout>
      <S.Title>출동중인 사건 (총 8건)</S.Title>
      <S.CardGrid>
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>흉기난동 감지</S.CardTitle>
            <S.VideoButton>
              <IoMdCamera className="icon" />
              영상 확인
            </S.VideoButton>
          </S.CardHeader>
          <S.Line />
          <S.CardBody>
            <S.LocationTitle>발생 위치</S.LocationTitle>
            <S.LocationAddress>서울특별시 성북구 보국문로 35길 21-54</S.LocationAddress>
            <S.ResolveButton>사건 해결</S.ResolveButton>
          </S.CardBody>
          <S.CardFooter>
            <span>2025.02.28 15:43:36</span>
            <span>김하나 순경</span>
          </S.CardFooter>
        </S.Card>
      </S.CardGrid>
    </S.InProgressLayout>
  );
};

export default InProgress;
