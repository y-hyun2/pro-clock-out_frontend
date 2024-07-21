import React from "react";
import styled from "styled-components";

const AccountTitle = ({ children }) => {
  return <AccountTitleStyle>{children}</AccountTitleStyle>;
};

export default AccountTitle;

const AccountTitleStyle = styled.h1`
  font-size: 2.8rem;
  margin-top: 15rem;
  margin-bottom: 4rem;
`;
