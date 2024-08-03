import styled from "styled-components";

function Ad({ img, title, cate, color, url }) {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-start;
    width: 460px;
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

  const BotContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const AdTitle = styled.div`
    padding-top: 15px;
    padding-bottom: 20px;
    padding-left: 10px;
    font-weight: 800;
    font-size: 35px;
    word-wrap: break-word;
    width: 350px;
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
  const Category = styled.div`
    // 가로-세로 모두 중앙 정렬
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 28%;
    font-size: 28px;
    font-weight: 800;
    border: 5px solid ${(props) => props.color || "#000000"};
    border-radius: 15px;
    color: ${(props) => props.color || "#000000"};
  `;
  return (
    <Wrapper>
      <ImageContainer>
        <Adimg src={img} alt="광고 이미지" />
        <HoverText href={url} target="_blank" rel="nofollow noopener">
          상세보기
        </HoverText>
      </ImageContainer>
      <BotContainer>
        <AdTitle>{title}</AdTitle>
        <Category color={color} border={color}>
          {cate}
        </Category>
      </BotContainer>
    </Wrapper>
  );
}

export default Ad;
