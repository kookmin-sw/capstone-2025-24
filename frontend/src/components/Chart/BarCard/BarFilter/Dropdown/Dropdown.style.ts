import styled from 'styled-components';

// Dropdown.tsx -----------------------------//

export const DropdownWrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => `${width}px`};
`;

export const DropdownHeader = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  height: 33px;
  padding: 0px 12px;
  background: ${({ $isOpen }) => ($isOpen ? 'var(--primary300)' : 'white')};
  border: 1px solid var(--gray400);
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  color: var(--gray800);

  svg {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  width: 100%;
  max-height: 120px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 2px var(--gray400) inset;
  padding-left: 3px;
  margin-top: 3px;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease-in-out;
  text-align: center;

  ${({ $isOpen }: { $isOpen: boolean }) =>
    $isOpen &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 연한 회색 */
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1); /* hover 시에만 thumb 보임 */
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const DropdownItem = styled.li`
  padding: 4px 0px;
  margin: 3px 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: transparent;
  color: black;
  border-radius: 8px;
  text-align: center;

  &:hover {
    background: var(--primary500);
  }
`;
