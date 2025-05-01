import * as S from './LoginPage.style.ts';
import LoginCard from '@/components/Login/LoginCard.tsx';
const LoginPage = () => {
  return (
    <S.LoginPageLayout>
      <LoginCard />
    </S.LoginPageLayout>
  );
};

export default LoginPage;
