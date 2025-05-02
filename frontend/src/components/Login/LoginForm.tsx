import * as S from './Login.style.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const LoginForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(userId, password);
      navigate('/monitoring');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert(error instanceof Error ? error.message : '로그인 중 알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <S.StyledForm onSubmit={submitLogin}>
      <S.StyledInput
        placeholder="아이디"
        type="text"
        required
        onChange={(e) => setUserId(e.target.value)}
      ></S.StyledInput>
      <S.StyledInput
        placeholder="비밀번호"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      ></S.StyledInput>
      <S.LoginBtn type="submit">로그인</S.LoginBtn>
    </S.StyledForm>
  );
};

export default LoginForm;
