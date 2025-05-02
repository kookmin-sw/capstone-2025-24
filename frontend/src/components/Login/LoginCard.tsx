import * as S from './Login.style.ts';
import InfoSide from './InfoSide.tsx';
import FormSide from './FormSide.tsx';

const LoginCard = () => {
  return (
    <S.LoginCard>
      <InfoSide />
      <FormSide />
    </S.LoginCard>
  );
};

export default LoginCard;
