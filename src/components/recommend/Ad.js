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
    height: 180px;
    width: 220px;
    border-radius: 18px;
    overflow: hidden;

    &:hover img {
      filter: blur(4px);
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
    font-weight: bold;
    font-size: 17px;
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
    font-size: 20px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none; /* 클릭 이벤트를 막음 */

    &:hover {
      text-decoration: none;
    }

    ${ImageContainer}:hover & {
      pointer-events: auto; /* 부모가 hover될 때 클릭 가능하게 만듦 */
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
