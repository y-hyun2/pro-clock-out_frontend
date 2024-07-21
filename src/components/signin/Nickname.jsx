import React from "react";
import styled from "styled-components";
import AccountTitle from "./AccountTitle";
import Titlediv from "./TitleDiv";
import EmailInputButton from "./EmailInputButton";
import LoginButton from "../login/LoginButton";

const Nickname = () => {
  return (
    <div>
      <Wrapper>
        <Titlediv></Titlediv>
        <NicknameWrapper>
          <AccountTitle>닉네임을 설정해주세요</AccountTitle>
          <EmailInputButton placeholder={"닉네임"}>중복 확인</EmailInputButton>
          <StyledLoginButton>
            <LoginButton>설정 완료</LoginButton>
          </StyledLoginButton>
        </NicknameWrapper>
      </Wrapper>
    </div>
  );
};

export default Nickname;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NicknameWrapper = styled.div`
  margin-top: 14.3rem;
  display: flex;
  width: 35%;
  flex-direction: column;
  align-items: center;
`;

const StyledLoginButton = styled.div`
  margin-top: 0rem;
`;
