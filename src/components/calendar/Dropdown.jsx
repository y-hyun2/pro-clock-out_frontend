import React, { useState } from "react";
import styled from "styled-components";

export default function Dropdown({ setCurrentView }) {
  const textOptions = ["주", "월"];

  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState("주");

  const handleOptionClick = (option) => {
    setItem(option);
    setIsOpen(false);
    if (option === "주") {
      setCurrentView("timeGridWeek");
    } else if (option === "월") {
      setCurrentView("dayGridMonth");
    }
  };

  return (
    <DropdownWrapper>
      <DropdownBox
        onClick={() => {
          isOpen ? setIsOpen(false) : setIsOpen(true);
        }}
      >
        {item}
        <Arrow>▼</Arrow>
        {isOpen && (
          <OptionList>
            {textOptions.map((option) => (
              <OptionItem
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </OptionItem>
            ))}
          </OptionList>
        )}
      </DropdownBox>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: absolute;
  left: 88%;
`;

const DropdownBox = styled.div`
  width: 85px;
  padding: 14px 10px;
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 10px;
  background: var(--white);
  line-height: 15px;
  cursor: pointer;
  position: relative;
  text-align: center;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 0.8em;
`;

const OptionList = styled.ul`
  position: absolute;
  width: 100%;
  left: -1px;
  margin: 0 auto;
  padding: 14px 10px;
  list-style: none;
  border: 1px solid var(--white);
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
