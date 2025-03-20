import * as S from './IncidentList.style.ts';
import IncidentListData from '../../../mocks/IncidentListData.ts';

const IncidentList = () => {
  // 사건 리스트 데이터
  const incidentdata = IncidentListData;
  // 사건 총 개수 (나중에 백한테 전달받아서 사용)
  const incident_num = incidentdata.length;
  return (
    <S.Layout>
      <S.IncidentNum>총 {incident_num}건</S.IncidentNum>
      <S.IncidentListDiv>
        <S.Table>
          <S.TableHeaderRow>
            <S.TableHeader w={15}>사건 번호</S.TableHeader>
            <S.TableHeader w={20}>사건 분류</S.TableHeader>
            <S.TableHeader w={23}>날짜</S.TableHeader>
            <S.TableHeader w={30}>위치</S.TableHeader>
            <S.TableHeader w={12}>담당 경찰</S.TableHeader>
          </S.TableHeaderRow>
          {incidentdata.map((incident, index) => (
            <S.TableBodyRow
              // key={startIndex + index}
              key={index}
            >
              <S.TableData index={index+1}>
                <S.InfoP>{index + 1}</S.InfoP>
              </S.TableData>
              <S.TableData index={index+1}>
                <S.InfoP>{incident.category}</S.InfoP>
              </S.TableData>
              <S.TableData index={index+1}>
                <S.InfoP>{incident.date}</S.InfoP>
              </S.TableData>
              <S.TableData index={index+1}>
                <S.InfoP>{incident.address}</S.InfoP>
              </S.TableData>
              <S.TableData index={index+1}>
                <S.InfoP>{incident.police}</S.InfoP>
              </S.TableData>
            </S.TableBodyRow>
          ))}
        </S.Table>
      </S.IncidentListDiv>
    </S.Layout>
  );
};
export default IncidentList;
