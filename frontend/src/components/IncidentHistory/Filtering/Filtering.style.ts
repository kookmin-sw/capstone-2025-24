import styled from 'styled-components';
import { HiMiniCalendar } from 'react-icons/hi2';
import { IoChevronDown } from 'react-icons/io5';
import { CgSearch } from 'react-icons/cg';
import 'react-datepicker/dist/react-datepicker.css';

// Filtering.tsx ---------------------------------------------//
export const Layout = styled.div`
  width: 95%;
`;

export const FilteringLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 20px;
  width: 100%;
`;

export const DropDownInfoLayout = styled.div`
  display: flex;
  gap: 10px;
`;

export const InfoP = styled.p`
  font-size: 13px;
  color: var(--gray800);
  padding: 2px;
`;

export const SearchBtn = styled.button`
  width: 100%;
  height: 39px;
  border-radius: 10px;
  border: 2px solid var(--primary800);
  background-color: var(--primary400);
  color: var(--primary800);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  &:active {
    border: 2px solid var(--primary800);
    background-color: var(--primary800);
    color: white;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

export const IncidentNum = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export const BtnWrapper = styled.div`
  width: 6%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 65px;
`;

// DataFiltering.tsx ----------------------------------------//
export const DateFilteringLayout = styled.div`
  display: flex;
  border: 1px solid blue;
`;

export const DateFilteringContainer = styled.div`
  width: 17%;
  min-width: 192px;
`;

export const DatePickerWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;

  align-items: center;
  width: 100%;
  height: 52px;
  border: 1px solid var(--gray400);
  border-radius: 8px;
  background-color: ${({ isOpen }) => (isOpen ? 'var(--primary500)' : 'white')};
`;

export const CalendarIcon = styled(HiMiniCalendar)`
  font-size: 22px;
  color: var(--gray800);
`;

export const DownIcon = styled(IoChevronDown)<{ isOpen: boolean }>`
  font-size: 18px;
  color: var(--gray800);
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

// SearchBar.tsx ----------------------------------------//

export const SearchBarContainer = styled.div`
  width: 37%;
  height: 52px;
  display: flex;
  min-width: 400px;
`;

export const DropdownWrapper = styled.div`
  width: 35%;
  position: relative;
`;

export const DropdownHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 52px;
  border: 1px solid var(--gray400);
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  background: ${({ isOpen }) => (isOpen ? 'var(--primary500)' : 'white')};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  color: var(--gray800);
  padding: 0px 17px;
  color: var(--gray800);

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;
export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 0 2px var(--gray400) inset;
  margin-top: 6px;
  overflow: hidden;
  padding: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;
  text-align: center;

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`;

export const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 7px 0px;
  margin: 7px 10px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? 'var(--primary500)' : 'transparent')};
  color: black;
  border-radius: 8px;
  text-align: center;

  &:hover {
    background: var(--primary500);
  }
`;

export const SearchContainer = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  border: 1px solid var(--gray400);
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
`;

export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  font-size: 18px;
  border: none;
  margin: 0px 10px 0px 0px;
`;

export const SearchIcon = styled(CgSearch)`
  font-size: 25px;
  color: var(--gray800);
  text-align: center;
  margin: 0px 15px;
`;

// SortingDropDown.tsx -----------------------//

export const SortingDropdownWrapper = styled.div`
  position: relative;
  width: 69px;
`;

export const SortingDropdownHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 26px;
  padding: 0px 10px;
  background: ${({ isOpen }) => (isOpen ? 'var(--primary500)' : 'white')};
  border: 1px solid var(--gray400);
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  color: var(--gray800);

  svg {
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

export const SortingDropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 2px var(--gray400) inset;
  margin-top: 6px;
  overflow: hidden;
  padding: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;
  text-align: center;

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`;

export const SortingDropdownItem = styled.li<{ isSelected: boolean }>`
  padding: 3px 0px;
  margin: 5px 5px;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ isSelected }) => (isSelected ? 'var(--primary500)' : 'transparent')};
  color: black;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background: var(--primary500);
  }
`;
