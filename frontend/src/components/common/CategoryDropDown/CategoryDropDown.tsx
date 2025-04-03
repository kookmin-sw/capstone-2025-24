import * as S from './CategoryDropDown.style.ts';
import { useState, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import useOutsideClick from '@/hooks/useOutsideClick.ts';

// 드롭다운 옵션 리스트
const options: string[] = ['전체', '화재', '폭행', '쓰러짐', '흉기난동', '군중밀집'];

interface CategoryDropDownProps {
  selected: string;
  setSelected: (value: string) => void;
}

const CategoryDropDown = ({ selected, setSelected }: CategoryDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 옵션 선택 시 실행
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownWrapper ref={dropdownRef}>
      <S.DropdownHeader onClick={toggleDropdown} isOpen={isOpen}>
        {selected} <IoChevronDown />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList isOpen={isOpen}>
          {options?.map((option, index) => (
            <S.DropdownItem key={index} isSelected={selected === option} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
};

export default CategoryDropDown;
