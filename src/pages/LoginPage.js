import React from "react";
import styled from "styled-components";
import logoImage from "../img/logo.png";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/login/PasswordInput";
import InputDiv from "../components/login/InputDiv";
import LoginButton from "../components/login/LoginButton";
import KakaoLogin from "../components/login/KakaoLogin";

const LoginPage = () => {
  const navigate = useNavigate();

  const goToSignin = () => {
    navigate("signin");
  };

  return (
    <Wrapper>
      <LogoImage src={logoImage} alt="Logo" />
      <InputDiv placeholder="이메일" type="text" /> {/* type 속성 추가 */}
      <PasswordInput placeholder="비밀번호" />

      <FindPassword>비밀번호를 잊어버리셨나요?</FindPassword>
      <LoginButton>로그인</LoginButton>
      <KakaoLogin></KakaoLogin>

      <SigninWrapper>
        <LoginQuestion>아직 계정이 없으신가요?</LoginQuestion>
        <SigninButton onClick={goToSignin}>회원가입</SigninButton>
      </SigninWrapper>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  width: 70rem;
  height: 80rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const LogoImage = styled.img`
  height: 25rem;
  margin-bottom: 2rem;
`;

const FindPassword = styled.a`
  font-size: 1.5rem;
  color: ${theme.colors["main-purple"]};
  margin-top: 5.5rem;
  margin-left: 26rem;
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
