import * as S from './Filtering.style.ts';
import { useState, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import useOutsideClick from '@/hooks/useOutsideClick.ts';

const options: string[] = ['최신순', '과거순'];

interface SortingDropDownProps {
  sort: string;
  setSort: (type: string) => void;
}

const SortingDropDown = ({sort, setSort} : SortingDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 옵션 선택 시 실행
  const handleSelect = (option: string) => {
    setSort(option);
    setIsOpen(false);
  };

  return (
    <S.SortingDropdownWrapper ref={dropdownRef}>
      <S.SortingDropdownHeader onClick={toggleDropdown} isOpen={isOpen}>
        {sort} <IoChevronDown />
      </S.SortingDropdownHeader>
      {isOpen && (
        <S.SortingDropdownList isOpen={isOpen}>
          {options.map((option, index) => (
            <S.SortingDropdownItem key={index} isSelected={sort === option} onClick={() => handleSelect(option)}>
              {option}
            </S.SortingDropdownItem>
          ))}
        </S.SortingDropdownList>
      )}
    </S.SortingDropdownWrapper>
  );
};

export default SortingDropDown;
