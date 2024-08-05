import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const NicknameButton = ({ placeholder, setNickname }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setNickname(e.target.value);
  };

  return (
    <div>
      <DivButtonWrapper>
        <ShortInputDiv
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </DivButtonWrapper>
    </div>
  );
};

export default NicknameButton;

const DivButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ShortInputDiv = styled.input`
  width: 33rem;
  height: 6rem;
  border: 0.3rem solid;
  border-color: lightgray;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 1rem;
  font-size: 2rem;
  padding-left: 1rem;
  font-weight: bold;
  &:focus {
    border-color: ${theme.colors["main-purple"]};
    outline: none;
  }
`;
