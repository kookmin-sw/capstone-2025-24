import { useState } from 'react';
import * as S from './style';

interface SidebarBtnProps {
  text: string;
  icon: string;
  icon_focused: string;
  onClick: (value: string) => void;
  size: string;
}

const SidebarBtn = ({ text, icon, icon_focused, onClick, size }: SidebarBtnProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleClick = () => {
    onClick(text);
  };
  return (
    <S.SidebarBtnLayout onClick={handleClick} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <img alt="icon" src={isFocused ? icon_focused : icon} style={{ width: size, height: size }} />
      {text}
    </S.SidebarBtnLayout>
  );
};

export default SidebarBtn;
