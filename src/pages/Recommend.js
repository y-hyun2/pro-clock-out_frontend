import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Ad from "../components/recommend/Ad";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";
import img6 from "../img/img6.png";
import img7 from "../img/img7.jpg";
import img8 from "../img/img8.png";
import theme from "../styles/theme";
const OuterWrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  padding-left: 8%;
`;

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;
const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
`;
const AdContainer = styled.div`
  flex: 1 1 calc(25% - 10px);
  margin-bottom: 3%;
`;

const Recommend = () => {
  const [imgarr, setImgarr] = useState([
    {
      img: img1,
      title: "쉬엄쉬엄 한강 요가",
      cate: "휴식",
      color: `${theme.colors["main-purple"]}`,
      url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S240510115158371429",
    },
    {
      img: img2,
      title: "바른척추지압원 ",
      cate: "수면",
      color: `${theme.colors["main-light-green"]}`,
      url: "https://bareunspine.modoo.at/",
    },
    {
      img: img3,
      title: "힐링힐스 스파",
      cate: "수면",
      color: `${theme.colors["main-light-purple"]}`,
      url: "https://www.instagram.com/2h_spa/",
    },
    {
      img: img4,
      title: "도그메이트",
      cate: "개인생활",
      color: `${theme.colors["main-blue"]}`,
      url: "https://www.dogmate.co.kr/",
    },
    {
      img: img5,
      title: "마곡지압원",
      cate: "건강",
      color: "#ffe882",
      url: "https://magok2677.modoo.at/",
    },
    {
      img: img6,
      title: "캐리비안베이",
      cate: "개인생활",
      color: `${theme.colors["main-blue"]}`,
      url: "https://www.everland.com/caribbeanbay/home/main",
    },
    {
      img: img7,
      title: "마이리얼트립",
      cate: "휴식",
      color: `${theme.colors["main-purple"]}`,
      url: "https://www.myrealtrip.com/",
    },
    {
      img: img8,
      title: "롯데월드",
      cate: "개인생활",
      color: `${theme.colors["main-light-green"]}`,
      url: "https://www.myrealtrip.com/",
    },
  ]);

  // 배열의 길이를 4의 배수로 맞추기 위해 빈 요소 추가
  const filledImgArr = [...imgarr];
  while (filledImgArr.length % 4 !== 0) {
    filledImgArr.push({ img: null, title: null });
  }

  return (
    <OuterWrapper>
      <Title>당신을 위한 추천 활동</Title>
      <InnerWrapper>
        {filledImgArr.map((item, index) => (
          <AdContainer key={index}>
            {item.img ? (
              <Ad
                img={item.img}
                title={item.title}
                cate={item.cate}
                color={item.color}
                url={item.url}
              />
            ) : null}
            {/* img가 null이 아니면 Ad 컴포넌트를 렌더링 */}
          </AdContainer>
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default Recommend;
