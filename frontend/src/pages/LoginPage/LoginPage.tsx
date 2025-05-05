import * as S from './LoginPage.style.ts';
import LoginForm from '../../components/Login/LoginForm.tsx';

const LoginPage = () => {
  return (
    <S.LoginPageLayout>
      <LoginForm />
    </S.LoginPageLayout>
  );
};

export default LoginPage;
