import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/theme";
import axios from "axios";

// 애니메이션 키프레임 설정
const bounce = keyframes`
  0%, 20%, 50%, 75%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// 스타일 컴포넌트 설정
const BubbleStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  margin-left: 10px;
  color: ${colors.white};
  border-radius: 50px;
  background-color: ${colors.main};
  font-size: 32px;
  font-weight: medium;
  width: 60vw;
  height: auto;
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
  position: relative; /* 말풍선 꼬리 위치 설정에 필요 */

  // /* 애니메이션 적용 */
  // animation: ${bounce} 2s infinite;

  /* 말풍선 꼬리 */
  &:after {
    content: "";
    position: absolute;
    top: 21px;
    left: -20px;
    border-right: 30px solid ${colors.main};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const Bubble = () => {
  const [message, setMessage] = useState("오늘도 화이팅!");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          "https://www.proclockout.com/api/v1/cheer",
          {
            headers: {
              authorization: localStorage.getItem("authorization"),
            },
          }
        );
        console.log("response", response.data);
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error response:", error.response);
      }
    };
    fetchMessage();
  }, []);

  return <BubbleStyles>{message}</BubbleStyles>;
};

export default Bubble;