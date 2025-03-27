import * as S from './Login.style.ts';
import { useState } from 'react';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  console.log(id, password);

  return (
    <S.StyledForm>
      <S.StyledInput placeholder="아이디" type="text" required onChange={(e) => setId(e.target.value)}></S.StyledInput>
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
