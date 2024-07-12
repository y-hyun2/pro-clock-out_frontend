import React from "react";
import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../components/recommend/GlobalStyle_recommend";
import Ad from "../components/recommend/Ad";
import img1 from "../img/Ad_img1_1.png";
import img2 from "../img/Ad_img3_1.png";
import img3 from "../img/Ad_img4_1.png";
import img4 from "../img/Ad_img1_2.png";
import img5 from "../img/Ad_img2_2.png";
import img6 from "../img/Ad_img3_2.png";
import img7 from "../img/Ad_img4_2.png";

const OuterWrapper = styled.div`
  padding-left: 10%;
`;

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  gap: 10px 10px;
`;
const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
`;
const AdContainer = styled.div`
  flex: 1 1 calc(25% - 10px);
  margin-bottom: 10px;
`;

const Recommend = () => {
  const [imgarr, setImgarr] = useState([
    { img: img1, title: "Title 1" },
    { img: img2, title: "Title 2" },
    { img: img3, title: "Title 3" },
    { img: img4, title: "Title 4" },
    { img: img5, title: "Title 5" },
    { img: img6, title: "Title 6" },
    { img: img7, title: "Title 7" },
  ]);

  // 배열의 길이를 4의 배수로 맞추기 위해 빈 요소 추가
  const filledImgArr = [...imgarr];
  while (filledImgArr.length % 4 !== 0) {
    filledImgArr.push({ img: null, title: null });
  }

  return (
    <OuterWrapper>
      <GlobalStyle />
      <Title>당신을 위한 추천 활동</Title>
      <InnerWrapper>
        {filledImgArr.map((item, index) => (
          <AdContainer key={index}>
            {item.img ? <Ad img={item.img} title={item.title} /> : null}
            {/* img가 null이 아니면 Ad 컴포넌트를 렌더링 */}
          </AdContainer>
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default Recommend;
