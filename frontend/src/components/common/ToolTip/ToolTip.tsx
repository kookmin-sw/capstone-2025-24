import * as S from './ToolTip.style.ts';
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
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '10px',
  },
}));

const ToolTip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <BootstrapTooltip title={<S.TooltipDiv>{children}</S.TooltipDiv>}>
        <S.InfoIcon />
      </BootstrapTooltip>
    </div>
  );
};

export default ToolTip;
