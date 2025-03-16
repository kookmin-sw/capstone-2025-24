import styled from 'styled-components';

// AlertItem.tsx
export const Layout = styled.div`
  display: flex;
  width: 274px;
  height: 159px;
  border-radius: 10px;
  margin: 10px 0px;
`;

export const CardDiv = styled.div`
    background-color: white;
    width: 263px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const ColorDiv = styled.div`
  background-color: var(--yellow);
  width: 11px;
  height: 159px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const DateDiv = styled.div`
  color: var(--gray500);
  font-size: 11px;
`;

export const CategoryDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const AddressDiv = styled.div`
  color: var(--gray700);
  font-size: 14px;
`;

export const ShowButtoon = styled.button`
  width: 100%;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: var(--primary900);
  border: 1px solid var(--primary900);
  background-color: white;
  border-radius: 5px;
`;

//AlertList.tsx
export const AlertListLayout = styled.div`
  width: 275px;
  height: 100vh;
  background-color: #FAFAFA;
  overflow: hidden; /* 넘치는 부분 숨김 */
`;

export const TitleDiv = styled.div`
  font-size: 25px;
  font-weight: 700;
  position: fixed;
  top: 0;
  background-color: #FAFAFA;
  width: 275px;
  height: 53px;
  z-index: 100;
  line-height: 53px;
`;

export const AlertContainer = styled.div`
  padding-top: 53px;
  background-color: #FAFAFA;
  height: calc(100vh - 53px); /* 제목을 제외한 높이 */
  overflow-y: auto; /* 내부 스크롤 */
`;
