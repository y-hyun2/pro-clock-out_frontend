// PasswordInput.jsx
import React, { useState } from "react";
import styled from "styled-components";
import hideImage from "../../img/hideImage.png";
import showImage from "../../img/showImage.png";
import InputDiv from "./InputDiv";

const PasswordInput = ({ placeholder, setPassword }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <PasswordWrapper>
      <InputDiv
        placeholder={placeholder}
        type={passwordVisible ? "text" : "password"} // type 속성을 전달
        handleInput={handleInput}
      />
      <ToggleButton onClick={togglePasswordVisibility}>
        <ToggleImage
          src={passwordVisible ? showImage : hideImage}
          alt={passwordVisible ? "숨기기" : "보이기"}
        />
      </ToggleButton>
    </PasswordWrapper>
  );
};

export default PasswordInput;

const ToggleButton = styled.button`
  position: absolute;
  right: 1.7rem;
  top: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ToggleImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 46.6rem;
  height: 4rem;
`;
