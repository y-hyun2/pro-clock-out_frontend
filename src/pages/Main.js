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

// 전체 페이지를 감싸는 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// Character와 Bubble이 위치할 하단 컨테이너
const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;
