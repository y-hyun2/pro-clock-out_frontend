import React from "react";
import styled from "styled-components";

const Character = () => {
  const gifUrl = process.env.PUBLIC_URL + "/image/tokki.gif";

  return (
    <ImageContainer>
      <Image src={gifUrl} alt="Character Image" />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 333px;
  height: 333px;

  @media (max-width: 768px) {
    width: 250px; /* 작은 화면에서는 이미지 크기 축소 */
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 180px; /* 더 작은 화면에서는 더 많이 축소 */
    height: 180px;
  }
`;


export default Character;
