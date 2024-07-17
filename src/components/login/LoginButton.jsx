import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const LoginButton = ({children}) => {
  return (
    <Login>{children}</Login>
  );
};

const Login = styled.button`
  width: 46rem;
  height: 6.5rem;
  background-color: ${theme.colors["main-purple"]};
  margin-top: 7rem;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  border: none;
  border-radius: 1.5rem;
  box-shadow: 0rem 0.6rem 0.6rem lightgray;
`;

export default LoginButton;
