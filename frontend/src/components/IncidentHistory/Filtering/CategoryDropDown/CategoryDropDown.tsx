import * as S from './CategoryDropDown.style.ts';
import { useState, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import useOutsideClick from '@/hooks/useOutsideClick.ts';
import { CATEGORY_OPTIONS } from '@/constants/dropdownOptions.ts';

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

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownWrapper ref={dropdownRef}>
      <S.InfoP>사건 유형</S.InfoP>
      <S.DropdownHeader onClick={toggleDropdown} $isOpen={isOpen}>
        {selected} <IoChevronDown />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList $isOpen={isOpen}>
          {CATEGORY_OPTIONS.map((option, index) => (
            <S.DropdownItem key={index} $isSelected={selected === option} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
};

export default CategoryDropDown;
