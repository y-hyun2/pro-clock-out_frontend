import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const Signin = ({ children, issame, onClick }) => {
  const [isbuttonenabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(issame);
  }, [issame]);

  const handleClick = () => {
    if (isbuttonenabled && onClick) {
      onClick();
    }
  };

  return (
    <Sign
      disabled={!isbuttonenabled}
      isbuttonenabled={isbuttonenabled}
      onClick={handleClick}
    >
      {children}
    </Sign>
  );
};

const Sign = styled.button`
  width: 46.7rem;
  height: 6.5rem;
  background-color: ${({ isbuttonenabled }) =>
    isbuttonenabled
      ? theme.colors["main-purple"]
      : theme.colors["main-light-purple"]};
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  border: none;
  border-radius: 1.5rem;
  box-shadow: 0rem 0.6rem 0.6rem lightgray;
  cursor: ${({ isbuttonenabled }) =>
    isbuttonenabled ? "pointer" : "not-allowed"};
`;

export default Signin;
