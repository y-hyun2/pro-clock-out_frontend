import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/theme";

const ANIMATION_DURATION = "1s";
const DISPLAY_DURATION = 2000; // 2초 동안 텍스트가 고정된 채로 보임

// 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(0);
    opacity: 0.5;
    font-size: 2rem;
    font-weight: 500;
  }
  to {
    transform: translateY(150px);
    opacity: 1;
    font-size: 6rem;
    font-weight: 600;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
    font-size: 6rem;
    font-weight: 600;
  }
  to {
    transform: translateY(150px);
    opacity: 0.5;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(${colors.main}, ${colors.white});
  text-align: center;
  font-weight: 500;

  @media (max-width: 768px) {
    flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
    height: 50%; /* 높이 축소 */
  }
`;

const Title = styled.div`
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 1500px;
  padding: 0 40px;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
    text-align: center;
    padding: 0 10px;
  }
`;

const LeftText = styled.div`
  margin-right: 50px;
  flex: 1;
  text-align: right;
  font-family: "Gmarket Sans Bold", sans-serif;
  font-size: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem; /* 작은 화면에서는 글자 크기 축소 */
    margin-right: 0;
  }
`;

const RightText = styled.div`
  margin-left: 50px;
  flex: 1;
  text-align: left;
  font-family: "Gmarket Sans Bold", sans-serif;
  font-size: 4rem;

  @media (max-width: 768px) {
    font-size: 2rem; /* 작은 화면에서는 글자 크기 축소 */
    margin-left: 0;
  }
`;

const TitleWrapper = styled.div`sss
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%; /* 작은 화면에서 너비 확장 */
  }
`;

const TitleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  text-align: center;
  white-space: nowrap;
  font-size: 2rem;
  color: ${colors.main};
  opacity: 0.5;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* 작은 화면에서 글자 크기 축소 */
  }
`;

const TopWrapper = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
`;

const NewTitleItem = styled(TitleItem)`
  opacity: 0;
  position: absolute;
  animation: ${(props) => (props.animate ? fadeIn : 'none')} ${ANIMATION_DURATION} ease-in-out;
`;

const TopTitleItem = styled(TitleItem)`
  position: absolute;
  animation: ${(props) => (props.animate ? slideIn : 'none')} ${ANIMATION_DURATION} ease-in-out;
`;

const MainTitleItem = styled(TitleItem)`
  font-weight: bold;
  font-size: 6rem;
  opacity: 1;
  animation: ${(props) => (props.animate ? slideOut : 'none')} ${ANIMATION_DURATION} ease-in-out;

  @media (max-width: 768px) {
    font-size: 3rem; /* 작은 화면에서 메인 타이틀 크기 축소 */
  }
`;

const BottomTitleItem = styled(TitleItem)`
  animation: ${(props) => (props.animate ? fadeOut : 'none')} ${ANIMATION_DURATION} ease-in-out;
`;

const services = ["나만의 시간", "행복", "즐거움", "한잔의 여유", "활기찬 하루"];

const MainBanner = () => {
  const [newIndex, setNewIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [nextIndex, setNextIndex] = useState(3);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const animateSequence = () => {
      setAnimate(true);
      setTimeout(() => {
        setNewIndex((index) => (((index - 1) + services.length) % services.length));
        setPrevIndex((index) => (((index - 1) + services.length) % services.length));
        setCurrentIndex((index) => (((index - 1) + services.length) % services.length));
        setNextIndex((index) => (((index - 1) + services.length) % services.length));
        setAnimate(false);
      }, parseFloat(ANIMATION_DURATION) * 1000);
    };

    const timer = setInterval(animateSequence, DISPLAY_DURATION + parseFloat(ANIMATION_DURATION) * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <MainContainer>
      <Title>
        <LeftText>워라밸로 찾는</LeftText>
        <TitleWrapper>
          <TopWrapper>
            <NewTitleItem animate={animate}>
              {services[newIndex]}
            </NewTitleItem>
            <TopTitleItem animate={animate}>
              {services[prevIndex]}
            </TopTitleItem>
          </TopWrapper>
          <MainTitleItem animate={animate}>
            {services[currentIndex]}
          </MainTitleItem>
          <BottomTitleItem animate={animate}>
            {services[nextIndex]}
          </BottomTitleItem>
        </TitleWrapper>
        <RightText>, 퇴근의정석</RightText>
      </Title>
    </MainContainer>
  );
};

export default MainBanner;
