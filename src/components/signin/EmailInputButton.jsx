import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const EmailInputButton = ({placeholder, children}) => {
return (
    <div>
       <DivButtonWrapper>
            <ShortInputDiv placeholder={placeholder} />
            <IdentifyButton>{children}</IdentifyButton>
          </DivButtonWrapper> 
    </div>
)
}

export default EmailInputButton;

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

const IdentifyButton = styled.button`
  height: 6rem;
  width: 11rem;
  border: none;
  background-color: ${theme.colors["main-light-purple"]};
  color: white;
  font-size: 2rem;
  font-weight: bolder;
  border-radius: 1rem;
  margin-top: 0.3rem;
`;