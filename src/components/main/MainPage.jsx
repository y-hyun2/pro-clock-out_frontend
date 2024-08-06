import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const GlobalStyled = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

  body {
    font-family: 'Noto Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow: hidden;
  }
`;

const ANIMATION_DURATION = "0.5s"; // 애니메이션 시간
const ANIMATION_TIMING_FUNCTION = "ease-in-out";
const DISPLAY_DURATION = 2500; // 중앙 글자가 표시되는 시간

const fade = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const MainContainer = styled.div`
  display: flex;
  /* position: absolute; */
  /* top: 200px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 573px;
  background: linear-gradient(#dadbff, #ffffff);
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const LeftText = styled.div`
  margin-right: 10px;
`;

const RightAlignedText = styled.div`
  margin-left: 10px;
  text-align: right;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  width: ${({ width }) => width || "100%"};
  height: 300px;
`;

const TitleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100px;
  text-align: center;
  white-space: nowrap;
  opacity: ${({ isCurrent }) => (isCurrent ? 1 : 0.5)};
  animation: ${({ state }) =>
    state === "fade"
      ? css`
          ${fade} ${ANIMATION_DURATION} ${ANIMATION_TIMING_FUNCTION} forwards
        `
      : "none"};
  color: ${({ isCurrent }) => (isCurrent ? "#7A7EE3" : "rgba(0, 0, 0, 0.5)")};
  transition: transform ${ANIMATION_DURATION} ${ANIMATION_TIMING_FUNCTION};
`;

const ServiceName = styled.span`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;

const services = [
  { name: "나만의 시간", width: "300px" },
  { name: "행복", width: "131px" },
  { name: "즐거움", width: "196px" },
  { name: "여유", width: "131px" },
];

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [animationState, setAnimationState] = useState("none");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState("fade");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        setAnimationState("none");
      }, parseFloat(ANIMATION_DURATION) * 1000);
    }, DISPLAY_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevIndex = (currentIndex - 1 + services.length) % services.length;
  const nextIndex = (currentIndex + 1) % services.length;

  return (
    <MainContainer>
      <GlobalStyled />
      <Title>
        <LeftText>워라밸로 찾는</LeftText>
        <TitleWrapper width={services[currentIndex].width}>
          <TitleItem
            state={animationState}
            style={{ top: "0px" }}
            isCurrent={false}
          >
            <ServiceName>{services[prevIndex].name}</ServiceName>
          </TitleItem>
          <TitleItem
            state={animationState}
            style={{ top: "100px" }}
            isCurrent={true}
          >
            <ServiceName>{services[currentIndex].name}</ServiceName>
          </TitleItem>
          <TitleItem
            state={animationState}
            style={{ top: "200px" }}
            isCurrent={false}
          >
            <ServiceName>{services[nextIndex].name}</ServiceName>
          </TitleItem>
        </TitleWrapper>
        <RightAlignedText>퇴근의 정석</RightAlignedText>
      </Title>
    </MainContainer>
  );
};

export default MainPage;
