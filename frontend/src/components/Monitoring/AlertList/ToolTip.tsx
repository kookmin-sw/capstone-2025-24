import React from 'react';
import * as S from './style.ts';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "10px",
  },
}));

const ToolTip: React.FC = () => {
  return (
    <div>
      <BootstrapTooltip
        title={
          <div>
            <S.TooltipDiv>각 알림은 24시간이 지나면</S.TooltipDiv>
            <S.TooltipDiv>알림 리스트에서 자동 삭제됩니다.</S.TooltipDiv>
          </div>
        }
      >
        <S.InfoIcon />
      </BootstrapTooltip>
    </div>
  );
};

export default ToolTip;
