import React from "react";
import MainBanner from "../components/main/MainBanner";
import Character from "../components/main/Character";
import Bubble from "../components/main/Bubble";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <MainBanner />
      <BottomContainer>
        <Character />
        <Bubble />
      </BottomContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BottomContainer = styled.div`
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;
