import styled from 'styled-components';
import ToolTip from '../common/ToolTip/ToolTip';

export const OverviewCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 215px;
  height: 98px;
  padding-left: 18px;
  justify-content: start;
  align-items: center;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(181, 181, 181, 0.25);
`;

export const VerticalLine = styled.div`
  background-color: var(--primary900);
  border-radius: 10px;
  width: 3px;
  height: 58px;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 18px;
`;

export const TitleP = styled.p`
  font-size: 13px;
  color: var(--gray600);
  font-weight: 700;
`;

export const CountP = styled.p`
  font-size: 30px;
  color: black;
  font-weight: 700;
`;

export const ToolTipDiv = styled.div`
  /* border: 1px solid red; */
  padding-left: 30px;
  padding-top: 50px;
`;
