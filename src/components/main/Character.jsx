import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Bubble } from "./Bubble";

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

const Character = ({ userName, daysTogether }) => {
  const gifUrl = process.env.PUBLIC_URL + "/image/tokki.gif"; // 이미지 경로 설정

  return (
    <Container>
      <GlobalStyled />
      <ImageContainer>
        <Image src={gifUrl} alt="Character Image" />
      </ImageContainer>
      <Bubble>
        {userName}님과 함께한지 {daysTogether}일
      </Bubble>
    </Container>
  );
};

const Container = styled.div`
  position: flex;
  bottom: 30px;
  width: 888.229px;
  flex-direction: row;
  left: 30%;
  margin: 0 auto; /* 가운데 정렬을 위한 마진 설정 */
  height: 333px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  //   transform: translateX(-50%); /* 가운데 정렬 */
`;
const ImageContainer = styled.div`
  /* 추가된 스타일 */
  align-self: flex-start; /* 이미지를 컨테이너의 왼쪽에 붙이기 */
  display: inline-block;
`;
const Image = styled.img`
  width: 333px;
  height: 333px;
  border-radius: 50%;
`;

// const TextBubble = styled.div`
//   top: 60px;
//   display: inline-block;
//   vertical-align: middle;
//   background-color: #ffffff;
//   border-radius: 15px;
//   padding: 10px 15px;
//   margin-left: 10px;
//   font-size: 50px;
//   font-weight: bold;
// `;

export default Character;
