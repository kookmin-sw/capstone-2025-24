import styled from 'styled-components';

// CategoryDropDown.tsx -----------------------------//

export const DropdownWrapper = styled.div`
  position: relative;
  width: 16%;
  min-width: 170px;
`;

export const DropdownHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 52px;
  padding: 0px 24px;
  background: ${({ isOpen }) => (isOpen ? 'var(--primary500)' : 'white')};
  border: 1px solid var(--gray400);
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
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
  margin: 6px 10px;
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

export const InfoP = styled.p`
  font-size: 13px;
  color: var(--gray800);
  padding: 2px;
`;

