import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import axios from "axios";
const EmailInputButton = ({
  placeholder,
  children,
  setIsCanSignin,
  setEmail,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isbuttonenabled, setIsButtonEnabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isokayemail, setIsokayemail] = useState();
  useEffect(() => {
    const hasAtSymbol = inputValue.includes("@");
    setIsButtonEnabled(inputValue.trim().length > 0 && hasAtSymbol);
    setShowError(!hasAtSymbol && inputValue.trim().length > 0);
  }, [inputValue]);

  // useEffect(() => {
  //   if (isbuttonenabled && isokayemail) {
  //     setIsCanSignin(true);
  //   } else {
  //     setIsCanSignin(false);
  //   }
  // }, [isbuttonenabled, setIsCanSignin]);

  useEffect(() => {
    if (isbuttonenabled) {
      setIsCanSignin(true);
    } else {
      setIsCanSignin(false);
    }
  }, [isbuttonenabled, setIsCanSignin]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setEmail(e.target.value);
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.get(
        "https://www.proclockout.com/api/v1/oauth2/duplicate_email",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      console.log(response.data); // 응답 데이터를 출력합니다.
      setIsokayemail(response.data);
    } catch (error) {
      console.error(error); // 에러를 출력합니다.
    }
  };

  return (
    <div>
      <DivButtonWrapper>
        <ShortInputDiv
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <IdentifyButton
          disabled={!isbuttonenabled}
          isbuttonenabled={isbuttonenabled}
          onClick={handlesubmit}
        >
          {children}
        </IdentifyButton>
      </DivButtonWrapper>
      {showError && <ErrorText>@ 문자를 포함하여 입력해주세요.</ErrorText>}
    </div>
  );
};

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
  background-color: ${({ isbuttonenabled }) =>
    isbuttonenabled
      ? theme.colors["main-purple"]
      : theme.colors["main-light-purple"]};
  color: white;
  font-size: 2rem;
  font-weight: bolder;
  border-radius: 1rem;
  margin-top: 0.3rem;
  cursor: ${({ isbuttonenabled }) =>
    isbuttonenabled ? "pointer" : "not-allowed"};
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.5rem;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
  margin-left: 0.5rem;
`;
