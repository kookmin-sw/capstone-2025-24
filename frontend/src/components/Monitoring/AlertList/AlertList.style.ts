import styled, { keyframes, css } from 'styled-components';
import { TbAlertTriangleFilled } from 'react-icons/tb';

// AlertItem.tsx --------------------------------------------//

const blinkShadow = keyframes`
  0%, 100% {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 1px 1px 10px 5px rgb(255, 179, 0);
  }
`;

export const Layout = styled.div<{ $clicked: boolean }>`
  display: flex;
  width: 274px;
  height: 159px;
  border-radius: 6px;
  margin: 7px 0px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);

  ${({ $clicked }) =>
    $clicked &&
    css`
      animation: ${blinkShadow} 1s ease-in-out 4;
    `}
`;

export const CardDiv = styled.div`
  background-color: white;
  width: 263px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 10px;
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ColorDiv = styled.div<{ $level: number }>`
  background-color: ${({ $level }) => ($level === 1 ? 'var(--yellow)' : 'var(--red)')};
  width: 6px;
  /* width: 11px; */
  height: 159px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const DateP = styled.p`
  color: var(--gray500);
  font-size: 11px;
`;

export const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StateCircle = styled.div<{ $state: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ $state }) => ($state === '미확인' ? '#45B404' : 'var(--gray400)')};
`;

export const CategoryDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const AlertIcon = styled(TbAlertTriangleFilled)<{ level: number }>`
  color: ${({ level }) => (level === 1 ? 'var(--yellow)' : 'var(--red)')};
  margin-right: 5px;
  font-size: 25px;
  margin-right: 10px;
`;

export const AddressP = styled.p`
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
  cursor: pointer;
  &:hover {
    background-color: #f5f7fe;
  }

  &:active {
    background-color: #e2e6fc;
  }
`;

//AlertList.tsx --------------------------------------------//

export const AlertListLayout = styled.div`
  width: 300px;
  height: 100vh;
`;

export const TitleDiv = styled.div`
  font-size: 25px;
  font-weight: 700;
  padding: 0px 17px;
  width: 300px;
  height: 53px;
  z-index: 100;
  line-height: 53px;
  display: flex;
  align-items: center;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 53px);
  overflow-y: auto;
  padding-top: 5px;

  &::-webkit-scrollbar {
    width: 1.5px;
    opacity: 0;
  }
`;

// EmptyView.tsx --------------------------------------------//

export const EmptyViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TextP = styled.p`
  color: var(--gray500);
  margin: 30px;
  font-size: 23px;
`;
