import styled from "styled-components";

function Ad({ img, title }) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
  `;

  const ImageContainer = styled.div`
    position: relative;
    height: 380px;
    width: 460px;
    border-radius: 18px;
    overflow: hidden;

    &:hover img {
      filter: blur(12px);
    }

    &:hover a {
      opacity: 1;
    }
  `;

  const Adimg = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: filter 0.3s;
  `;

  const AdTitle = styled.div`
    padding-top: 15px;
    padding-left: 10px;
    font-weight: 800;
    font-size: 35px;
    word-wrap: break-word;
    width: 150px;
  `;

  const HoverText = styled.a`
    text-decoration: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 50px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    &:hover {
      text-decoration: none;
    }

    ${ImageContainer}:hover & {
      pointer-events: auto;
    }
  `;

  return (
    <Wrapper>
      <ImageContainer>
        <Adimg src={img} alt="광고 이미지" />
        <HoverText
          href="https://www.naver.com/"
          target="_blank"
          rel="nofollow noopener"
        >
          상세보기
        </HoverText>
      </ImageContainer>
      <AdTitle>{title}</AdTitle>
    </Wrapper>
  );
}

export default Ad;
