import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/login/PasswordInput";
import LoginButton from "../components/login/LoginButton";
import KakaoLogin from "../components/login/KakaoLogin";

const Signin = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <Wrapper>
        <TitleDiv>
          <Subtitle>워라밸로 찾는 나만의 시간,</Subtitle>
          <Title>퇴근의 정석</Title>
        </TitleDiv>
        <AccountWrapper>
          <AccountTitle>계정을 생성하세요</AccountTitle>

          {/* <DivButtonWrapper>
            <ShortInputDiv placeholder="닉네임" />
            <IdentifyButton>중복 확인</IdentifyButton>
          </DivButtonWrapper> */}

          <DivButtonWrapper>
            <ShortInputDiv placeholder="이메일" />
            <IdentifyButton>인증 요청</IdentifyButton>
          </DivButtonWrapper>

          <PasswordInputWrapper style={{ marginTop: "-2rem" }}>
            <PasswordInput placeholder="비밀번호" />
          </PasswordInputWrapper>

          <PasswordInputWrapper style={{ marginTop: "3.9rem" }}>
            <PasswordInput placeholder="비밀번호 확인" />
          </PasswordInputWrapper>
          <LoginButton>회원가입</LoginButton>
          <KakaoLogin></KakaoLogin>
          <SigninWrapper>
            <LoginQuestion>이미 계정이 있으신가요?</LoginQuestion>
            <SigninButton onClick={goToLogin}>로그인하기</SigninButton>
          </SigninWrapper>
        </AccountWrapper>
      </Wrapper>
    </div>
  );
};

export default Signin;

//전체 Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

//왼쪽 타이틀 div
const TitleDiv = styled.div`
  background: linear-gradient(
    ${theme.colors["main-blue"]},
    ${theme.colors["main-light-green"]},
    ${theme.colors["main-sand"]}
  );
  margin-top: 0;
  height: 100vh;
  width: 55%;
`;

const Subtitle = styled.h1`
  font-size: 5rem;
  font-weight: 600;
  color: white;
  padding-top: 30rem;
  padding-left: 4rem;
  margin-top: 0;
  margin-bottom: 0;
`;

const Title = styled.h1`
  font-size: 11rem;
  font-weight: bold;
  color: white;
  margin-top: 0;
  padding-top: 2rem;
  padding-left: 26rem;
`;

//오른쪽 계정 생성 div
const AccountWrapper = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  align-items: center;
`;

const AccountTitle = styled.h1`
  font-size: 2.8rem;
  margin-top: 15rem;
  margin-bottom: 7rem;
`;

//이메일 + 인증요청 버튼 Wrapper
const DivButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

//이메일 input
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

//중복확인, 인증 요청 버튼
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

// PasswordInput 래퍼 div
const PasswordInputWrapper = styled.div`
  margin-top: ${(props) => props.marginTop || "0"};
  width: 100%;
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
