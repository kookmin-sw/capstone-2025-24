import styled, { keyframes, css } from 'styled-components';
import { TbAlertTriangleFilled } from 'react-icons/tb';
import { IoAlertCircleOutline } from 'react-icons/io5';

// AlertItem.tsx

interface ColorDivProps {
  category: string;
}

interface StateCircleProps {
  state: string;
}

interface IconProps {
  category: string;
}

interface LayoutProps {
  clicked: boolean;
}

const blinkShadow = keyframes`
  0%, 100% {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 1px 1px 10px 5px var(--yellow);
  }
`;

export const Layout = styled.div<LayoutProps>`
  display: flex;
  width: 274px;
  height: 159px;
  border-radius: 10px;
  margin: 10px 0px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  ${({ clicked }) =>
    clicked &&
    css`
      animation: ${blinkShadow} 1s ease-in-out 3;
    `}
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

export const ColorDiv = styled.div<ColorDivProps>`
  background-color: ${({ category }) =>
    category === '폭행' || category === '군중 밀집' ? 'var(--yellow)' : 'var(--red)'};
  width: 11px;
  height: 159px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const DateDiv = styled.div`
  color: var(--gray500);
  font-size: 11px;
`;

export const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StateCircle = styled.div<StateCircleProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ state }) => (state === '미확인' ? '#45B404' : 'var(--gray400)')};
`;

export const CategoryDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const AlertIcon = styled(TbAlertTriangleFilled)<IconProps>`
  color: ${({ category }) => (category === '폭행' || category === '군중 밀집' ? 'var(--yellow)' : 'var(--red)')};
  margin-right: 5px;
  font-size: 25px;
  margin-right: 10px;
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
  &:hover {
    background-color: #f5f7fe;
  }

  &:active {
    background-color: #e2e6fc;
  }
`;

//AlertList.tsx
export const AlertListLayout = styled.div`
  width: 275px;
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden; /* 넘치는 부분 숨김 */
`;

export const TitleDiv = styled.div`
  font-size: 25px;
  font-weight: 700;
  position: fixed;
  top: 0;
  background-color: #fafafa;
  width: 275px;
  height: 53px;
  z-index: 100;
  line-height: 53px;
  display: flex;
  align-items: center;
`;

export const AlertContainer = styled.div`
  padding-top: 53px;
  background-color: #fafafa;
  height: calc(100vh - 53px); /* 제목을 제외한 높이 */
  overflow-y: auto; /* 내부 스크롤 */
`;

// ToolTip.tsx
export const InfoIcon = styled(IoAlertCircleOutline)`
  font-size: 18px;
  color: var(--gray600);
  margin: 0px 8px;
  cursor: pointer;
`;

export const TooltipDiv = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items-center;
  font-size: 10px;
  color: var(--gray800)
  
`;
