import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/login/PasswordInput";
import LoginButton from "../components/login/LoginButton";
import KakaoLogin from "../components/login/KakaoLogin";
import AccountTitle from "../components/signin/AccountTitle";
import EmailInputButton from "../components/signin/EmailInputButton";
import Titlediv from "../components/signin/TitleDiv";

const SigninPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToNickname = () => {
    navigate("/login/signin/nickname");
  };

  return (
    <div>
      <Wrapper>
        <Titlediv></Titlediv>
        <AccountWrapper>
          <AccountTitle>계정을 생성하세요</AccountTitle>

          <button onClick={goToNickname}>닉네임(임시)</button>

          <EmailInputButton placeholder={"이메일"}>인증 요청</EmailInputButton>

          <PasswordInputWrapper style={{ marginTop: "0rem" }}>
            <PasswordInput placeholder="비밀번호" />
          </PasswordInputWrapper>

          <PasswordInputWrapper style={{ marginTop: "4.2rem" }}>
            <PasswordInput placeholder="비밀번호 확인" />
          </PasswordInputWrapper>

          <StyledLoginButton>
            <LoginButton>회원가입</LoginButton>
          </StyledLoginButton>
          <Link to={"/login/signin/nickname"}>
            <KakaoLogin></KakaoLogin>
          </Link>

          <SigninWrapper>
            <LoginQuestion>이미 계정이 있으신가요?</LoginQuestion>
            <SigninButton onClick={goToLogin}>로그인하기</SigninButton>
          </SigninWrapper>
        </AccountWrapper>
      </Wrapper>
    </div>
  );
};

export default SigninPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const AccountWrapper = styled.div`
  display: flex;
  width: 35%;
  flex-direction: column;
  align-items: center;
`;

const PasswordInputWrapper = styled.div`
  margin-top: ${(props) => props.marginTop || "0"};
  width: 60rem;
  display: flex;
  justify-content: center;
`;

const SigninWrapper = styled.div`
  display: flex;
`;

const LoginQuestion = styled.p`
  color: gray;
  font-size: 2rem;
`;

const SigninButton = styled.a`
  color: ${theme.colors["main-purple"]};
  font-size: 2rem;
  margin-left: 3rem;
  margin-top: 2rem;
`;

const StyledLoginButton = styled.div`
  margin-top: 7rem;
`;
