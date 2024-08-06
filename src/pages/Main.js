import React from "react";
import MainPage from "../components/main/MainPage";
import Character from "../components/main/Character";
import styled from "styled-components";
const Main = () => {
  return (
    <TopContainer>
      <MainPage />
      <Character userName="000" daysTogether={100} />
    </TopContainer>
  );
};

export default Main;
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
