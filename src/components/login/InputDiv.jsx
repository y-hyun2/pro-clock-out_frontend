import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const InputDiv = ({ placeholder }) => {
  return (
    <UserInputDiv placeholder={placeholder} />
  );
};

export default InputDiv;

const UserInputDiv = styled.input`
  width: 45rem;
  height: 5.8rem;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  padding-left: 2rem;
  border-radius: 1.5rem;
  border: 0.3rem solid lightgray;
  padding-left: 1rem;

  &:focus {
    border-color: ${theme.colors["main-purple"]};
    outline: none;
  }

  ::placeholder {
    color: lightgray;
  }
`;
