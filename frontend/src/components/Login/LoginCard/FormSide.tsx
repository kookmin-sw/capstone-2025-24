import * as S from './LoginCard.style.ts';
import LoginForm from './LoginForm.tsx';
import logoBlue from '@/assets/icons/logoBlue.svg';

const FormSide = () => {
  return (
    <S.FormSideLayout>
      <S.LogoImg src={logoBlue} alt="questionmark" />
      <S.InfoP>순찰의 새로운 방향이 되다, 누리눈</S.InfoP>
      <LoginForm />
    </S.FormSideLayout>
  );
};

export default FormSide;
