import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Signin = () => {
  return (
    <div>
      <TitleDiv>
        <Subtitle>워라밸로 찾는 나만의 시간,</Subtitle>
        <Title>퇴근의 정석</Title>
      </TitleDiv>
    </div>
  );
};

export default Signin;

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
const Rightdiv = styled.div`
display: flex;

`