import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const InputDiv = ({ placeholder, type, handleInput }) => {
  return (
    <InputField type={type} placeholder={placeholder} onChange={handleInput} />
  );
};

export default InputDiv;

const InputField = styled.input`
  width: 45rem;
  height: 6rem;
  border: 0.3rem solid lightgray;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 0rem;
  font-size: 2rem;
  padding-left: 1rem;
  font-weight: bold;
  &:focus {
    border-color: ${theme.colors["main-purple"]};
    outline: none;
  }
`;
