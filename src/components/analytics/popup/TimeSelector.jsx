import React, { useState } from "react";
import styled from "styled-components";

const TimeSelector = ({
  defaultOption,
  onSelect,
  interval = 30,
  maxHours = 24,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const generateTimeOptions = (interval, maxHours) => {
    const times = [];
    for (let h = 0; h <= maxHours; h++) {
      for (let m = 0; m < 60; m += interval) {
        if (h === maxHours && m > 0) break;
        const hours = h.toString().padStart(2, "0");
        const minutes = m.toString().padStart(2, "0");
        times.push(`${hours}:${minutes}`);
      }
    }
    return times;
  };

  const formatTimeOption = (option) => {
    const [hours, minutes] = option.split(":");
    const formattedHours = parseInt(hours, 10);
    const formattedMinutes = parseInt(minutes, 10);

    return `${formattedHours}시간 ${
      formattedMinutes > 0 ? `${formattedMinutes}분` : ""
    }`.trim();
  };

  const parseToDecimal = (option) => {
    const [hours, minutes] = option.split(":");
    const decimalHours = parseInt(hours, 10);
    const decimalMinutes = parseInt(minutes, 10) / 60;
    return decimalHours + decimalMinutes;
  };

  const timeOptions = generateTimeOptions(interval, maxHours);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    const decimalTime = parseToDecimal(option);
    console.log(decimalTime);
    onSelect(option);
  };

  return (
    <Wrapper>
      <DropdownButton onClick={handleToggleDropdown}>
        {formatTimeOption(selectedOption)}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </DropdownButton>
      {isOpen && (
        <Dropdown>
          {timeOptions.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleSelectOption(option)}
            >
              {formatTimeOption(option)}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default TimeSelector;

const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  display: inline-block;
`;

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
  width: 12rem;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Arrow = styled.span`
  margin-left: 10px;
  font-size: 1.2rem;
  color: lightgray;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 12rem;
  font-size: 1.5rem;
  max-height: 150px;
  overflow-y: auto;
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
