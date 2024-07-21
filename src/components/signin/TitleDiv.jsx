import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const Titlediv = () => {
  return (
    <TitleDivStyle>
      <Subtitle>워라밸로 찾는 나만의 시간,</Subtitle>
      <Title>퇴근의 정석</Title>
    </TitleDivStyle>
  );
};

export default Titlediv;

const TitleDivStyle = styled.div`
  background: linear-gradient(
    ${theme.colors["main-blue"]},
    ${theme.colors["main-light-green"]},
    ${theme.colors["main-sand"]}
  );
  margin-right: 4rem;
  height: 100vh;
  width: 60%;
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
