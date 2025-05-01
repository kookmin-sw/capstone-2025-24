import * as S from './Login.style.ts';
import VisualSide from './VisualSide.tsx';
import FormSide from './FormSide.tsx';

const LoginCard = () => {
  return (
    <S.LoginCard>
      <VisualSide />
      <FormSide />
    </S.LoginCard>
  );
};

export default LoginCard;
