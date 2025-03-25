import * as S from './IncidentList.style.ts';
import { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';

// 드롭다운 옵션 리스트
const options: string[] = ['최신순', '과거순'];

const SortingDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('최신순');

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 전체 영역

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 옵션 선택 시 실행
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.DropdownWrapper ref={dropdownRef}>
      <S.DropdownHeader onClick={toggleDropdown} isOpen={isOpen}>
        {selected} <IoChevronDown />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList isOpen={isOpen}>
          {options.map((option, index) => (
            <S.DropdownItem key={index} isSelected={selected === option} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
};

export default SortingDropDown;
