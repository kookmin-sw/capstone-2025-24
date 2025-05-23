import * as S from './Dropdown.style.ts';
import { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
interface dropdownProps {
  items: string[];
  placeholder: string;
  width: number;
  value: string;
  type: 'category' | 'year' | 'month';
  onChange: (type: 'category' | 'year' | 'month', newValue: string) => void;
}
const Dropdown = ({ items, width, value, type, onChange }: dropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    onChange(type, option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <S.DropdownWrapper width={width} ref={dropdownRef}>
      <S.DropdownHeader onClick={toggleDropdown} $isOpen={isOpen}>
        {value} <IoChevronDown />
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList $isOpen={isOpen}>
          {items?.map((option, index) => (
            <S.DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
};

export default Dropdown;
