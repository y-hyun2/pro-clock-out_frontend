import React, { useState } from "react";

import styled from "styled-components";
import logoImage from "../img/logo.png";
import hideImage from "../img/hideImage.png";
import showImage from "../img/showImage.png";
import kakaoLogin from "../img/kakao_login.png";
import theme from "../styles/theme";
import {useNavigate} from "react-router-dom";


//비밀번호를 잊어버리셨나요? 버튼에 추후 링크 연결 or 기능 추가
const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const goToSignin = () => {
    navigate("signin");
  }

  return (
    <Wrapper>
      <LogoImage src={logoImage} alt="Logo" />
      <InputDiv placeholder="이메일" />
      <PasswordWrapper>
        <InputDiv
          type={passwordVisible ? "text" : "password"}
          placeholder="비밀번호"
        />
        <ToggleButton onClick={togglePasswordVisibility}>
          <ToggleImage
            src={passwordVisible ? showImage : hideImage}
            alt={passwordVisible ? "숨기기" : "보이기"}
          />
        </ToggleButton>
        
      </PasswordWrapper>

      <FindPassword>비밀번호를 잊어버리셨나요?</FindPassword>
      <LoginButton>로그인</LoginButton>
      <KakaoLogin src={kakaoLogin}>
      </KakaoLogin>

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

const InputDiv = styled.input`
  width: 45rem;
  height: 5rem;
  font-size: 2rem;
  font-weight: 400;
  margin-top: 2rem;
  padding-left: 2rem;
  border-radius: 1.5rem;
  border: 0.3rem solid lightgray;
  padding: 0.5rem;

  &:focus {
    border-color: ${theme.colors["main-purple"]};
    outline: none;
  }

  ::placeholder {
    color: lightgray;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 46.6rem;
  height: 4rem;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1.7rem;
  top: 3.7rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ToggleImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const FindPassword = styled.a`
  font-size: 1.5rem;
  color: ${theme.colors["main-purple"]};
  margin-top: 5.5rem;
  margin-left: 26rem;
`;

const LoginButton = styled.button `
    width: 46rem;
    height: 6.5rem;
    background-color: ${theme.colors["main-purple"]};
    margin-top: 7rem;
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    border: none;
    border-radius: 1.5rem;;
    box-shadow: 0rem 0.6rem 0.6rem lightgray;
`;

const KakaoLogin = styled.img`
    margin-top: 2rem;
    width: 46rem;
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
`
