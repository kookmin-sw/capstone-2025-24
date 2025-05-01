import * as S from './Login.style.ts';
import LoginForm from './LoginForm.tsx';
import LOGOBLUE from '@/assets/icons/logo_blue.svg';

const FormSide = () => {
  return (
    <S.FormSideLayout>
      <img src={LOGOBLUE} alt="questionmark" />
      <S.InfoP>순찰의 새로운 기준이 되다, 누리눈</S.InfoP>
      <LoginForm />
    </S.FormSideLayout>
  );
};

export default FormSide;
