import React, { useState } from "react";
import styled from "styled-components";

const WorkoutCount = ({ defaultOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  // 0부터 7까지의 숫자 옵션 생성
  const numberOptions = Array.from({ length: 8 }, (_, i) => i);

  // 드롭다운 열기/닫기
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 옵션 선택
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <Wrapper>
      <DropdownButton onClick={handleToggleDropdown}>
        {selectedOption}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </DropdownButton>
      {isOpen && (
        <Dropdown>
          {numberOptions.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default WorkoutCount;

const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  display: inline-block;
`;

// 리스트 나오도록 하는 버튼
const DropdownButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 8rem;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Arrow = styled.span`
  margin-left: 10px;
  font-size: 1.2rem;
  color: lightgray;
`;

// 버튼 누르면 나오는 리스트
const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 8rem;
  font-size: 1.5rem;
  max-height: 150px; /* 최대 5개의 항목 표시 */
  overflow-y: auto; /* 스크롤링 활성화 */
`;

const DropdownItem = styled.div`
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;
