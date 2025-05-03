import * as S from './LoginCard.style.ts';
import { useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { postLogin } from '@/apis/LoginApi';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/stores/profileStore.ts';
const LoginForm = () => {
  const { setProfile } = useProfileStore();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await postLogin(userId, password);
    if (data !== undefined && 'message' in data) {
      setIsFailed(true);
      return;
    } else if (data !== undefined) {
      setProfile(() => data);
      navigate('/monitoring');
    }
  };

  return (
    <S.LoginFormLayout onSubmit={submitLogin}>
      <S.InputSection>
        <S.LoginInput
          placeholder="아이디"
          type="text"
          required
          $isFailed={isFailed}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        ></S.LoginInput>
        <S.LoginInput
          placeholder="비밀번호"
          type="password"
          required
          $isFailed={isFailed}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></S.LoginInput>
      </S.InputSection>
      <S.ValidSection $isFailed={isFailed}>
        <IoWarning size={13} />
        아이디 또는 비밀번호를 다시 확인하세요
      </S.ValidSection>
      <S.LoginBtn type="submit">로그인</S.LoginBtn>
    </S.LoginFormLayout>
  );
};

export default LoginForm;
