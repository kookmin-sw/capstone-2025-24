import * as S from './style.ts';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const options: string[] = ['담당 경찰', '위치'];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('담당 경찰');

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 옵션 선택 시 실행
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  
  return (
    <S.SearchBarContainer>
      <S.DropdownWrapper>
        <S.DropdownHeader onClick={toggleDropdown} isOpen={isOpen}>
          {selected}
          <IoChevronDown />
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

      <S.SearchContainer>
        <S.SearchIcon />
        <S.SearchInput placeholder={'검색어를 입력하세요'} />
      </S.SearchContainer>
    </S.SearchBarContainer>
  );
};

export default SearchBar;
