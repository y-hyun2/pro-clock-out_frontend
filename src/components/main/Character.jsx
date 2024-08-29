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
`;


export default Character;
