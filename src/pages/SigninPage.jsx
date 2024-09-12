import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import theme from "../styles/theme";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/login/PasswordInput";
import Signin from "../components/signin/Signin";
// import KakaoLogin from "../components/login/KakaoLogin";
import AccountTitle from "../components/signin/AccountTitle";
import EmailInputButton from "../components/signin/EmailInputButton";
import Titlediv from "../components/signin/TitleDiv";

const SigninPage = () => {
  const [firstpassword, setFirstPassword] = useState("");
  const [secondpassword, setSecondpassword] = useState("");
  const [email, setEmail] = useState();
  const [issame, setIsSame] = useState(false);
  const [iscansignin, setIsCanSignin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      firstpassword &&
      secondpassword &&
      firstpassword === secondpassword &&
      iscansignin
    ) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [firstpassword, secondpassword, iscansignin]);

  // const handleSignin = async () => {
  //   if (iscansignin) {
  //     try {
  //       const response = await axios.post(
  //         "https://www.proclockout.com/api/v1/signup",
  //         {
  //           username: email,
  //           password: firstpassword,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error response:", error.response);
  //     }
  //   }
  // };
  const handleSignin = async () => {
    if (iscansignin) {
      const requestData = {
        email: email,
        password: firstpassword,
      };

      console.log("Request URL:", "https://www.proclockout.com/api/v1/signup");
      console.log("Request Data:", requestData);

      try {
        const response = await axios.post(
          "https://www.proclockout.com/api/v1/signup",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response);
        alert("회원가입 성공~");
        navigate("/login");
      } catch (error) {
        console.error("Error response:", error.response);
      }
    }
  };

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

          {/* <button onClick={goToNickname}>닉네임(임시)</button> */}

          <EmailInputButton
            placeholder={"이메일"}
            setIsCanSignin={setIsCanSignin}
            setEmail={setEmail}
          >
            중복 확인
          </EmailInputButton>

          <PasswordInputWrapper style={{ marginTop: "0rem" }}>
            <PasswordInput
              placeholder="비밀번호"
              setPassword={setFirstPassword}
            />
          </PasswordInputWrapper>

          <PasswordInputWrapper style={{ marginTop: "4.2rem" }}>
            <PasswordInput
              placeholder="비밀번호 확인"
              setPassword={setSecondpassword}
            />
          </PasswordInputWrapper>

          <StyledLoginButton>
            <Signin issame={issame} onClick={handleSignin}>
              회원가입
            </Signin>
          </StyledLoginButton>
          <Link to={"/login/signin/nickname"}>
            {/* <KakaoLogin></KakaoLogin> */}
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
  margin-top: 2rem;
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
