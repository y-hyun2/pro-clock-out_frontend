import React, { useState } from "react";
import styled from "styled-components";
import logoImage from "../img/logo.png";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/login/PasswordInput";
import InputDiv from "../components/login/InputDiv";
import LoginButton from "../components/login/LoginButton";
import KakaoLogin from "../components/login/KakaoLogin";
import axios from "axios";

import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const goToSignin = () => {
    navigate("signin");
  };
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  // API 명세서 보고 KEY 값, 엔드포인트 수정하기
  const requestData = {
    email: email,
    password: password,
  };

  console.log("email", email, "password", password, "requestdata", requestData);
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://www.proclockout.com/api/v1/login",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      const token = response.headers["authorization"];
      const nickname_res = response.headers["nickname"];
      //로그인 상태 업데이트
      login();
      console.log(isLoggedIn);
      alert("로그인에 성공하였습니다");
      if (token) {
        console.log(token);
        localStorage.setItem("authorization", token);
      }
      if (nickname_res == "hexcode") {
        alert("닉네임 설정으로 이동합니다.");
        navigate("/login/signin/nickname");
      } else {
        alert("홈 화면으로 이동합니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error response:", error.response);
    }
  };
  return (
    <Wrapper>
      <LogoImage src={logoImage} alt="Logo" />
      <InputDiv
        placeholder="이메일"
        type="text"
        handleInput={handleEmailInput}
      />
      <PasswordInput placeholder="비밀번호" setPassword={setPassword} />
      <StyledLoginButton>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </StyledLoginButton>
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
