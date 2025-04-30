import * as S from './Login.style.ts';
import { useState } from 'react';
import { postLogin } from '@/apis/LoginApi';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/stores/profileStore.ts';
const LoginForm = () => {
  const { setProfile } = useProfileStore();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await postLogin(userId, password);
    if (data !== undefined && 'message' in data) {
      alert(data.message);
      return;
    } else if (data !== undefined) {
      setProfile(() => data);
      navigate('monitoring');
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
