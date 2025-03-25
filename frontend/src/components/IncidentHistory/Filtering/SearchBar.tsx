import * as S from './Filtering.style.ts';
import { useState, useRef } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import useOutsideClick from '../../../hooks/useOutsideClick.ts';

const options: string[] = ['담당 경찰', '위치'];

interface SearchBarProps {
  searchType: string;
  setSearchType: (type: string) => void;
  searchWord: string | null;
  setSearchWord: (word: string) => void;
}

const SearchBar = ({ searchType, setSearchType, searchWord, setSearchWord }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 옵션 선택 시 실행
  const handleSelect = (option: string) => {
    setSearchType(option);
    setIsOpen(false);
  };

  return (
    <S.SearchBarContainer>
      <S.DropdownWrapper ref={dropdownRef}>
        <S.DropdownHeader onClick={toggleDropdown} isOpen={isOpen}>
          {searchType}
          <IoChevronDown />
        </S.DropdownHeader>
        {isOpen && (
          <S.DropdownList isOpen={isOpen}>
            {options.map((option, index) => (
              <S.DropdownItem key={index} isSelected={searchType === option} onClick={() => handleSelect(option)}>
                {option}
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.DropdownWrapper>

      <S.SearchContainer>
        <S.SearchIcon />
        <S.SearchInput
          placeholder={'검색어를 입력하세요'}
          value={searchWord || ''}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </S.SearchContainer>
    </S.SearchBarContainer>
  );
};

export default SearchBar;
