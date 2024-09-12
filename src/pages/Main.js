import React from "react";
import MainBanner from "../components/main/MainBanner";
import Character from "../components/main/Character";
import Bubble from "../components/main/Bubble";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <MainBannerContainer>
        <MainBanner />
      </MainBannerContainer>
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
`;

const MainBannerContainer = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 필요 시 수직 중앙 정렬 */
`;

const BottomContainer = styled.div`
  width: 100%; /* 화면 높이의 40%를 차지하도록 설정 */
  display: flex;
  flex-direction: row;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;
