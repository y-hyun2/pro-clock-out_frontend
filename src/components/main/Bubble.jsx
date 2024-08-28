import styled from "styled-components";
import { colors } from "../../styles/theme"; // colors에서 가져올 경우 해당 경로 확인 필요

const BubbleStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  margin-left: 10px;
  color: ${colors.white};
  border-radius: 15px;
  background-color: ${colors.main};
  font-size: 32px;
  font-weight: bold;
  width: 60vw;
  height: auto;
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
  position: relative; /* 말풍선 꼬리 위치 설정에 필요 */

  // 말풍선 꼬리
  &:after {
    content: "";
    position: absolute;
    top: 21px;
    left: -30px;
    border-right: 30px solid ${colors.main};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const Bubble = () => {
  return <BubbleStyles>오늘도 화이팅!</BubbleStyles>;
};

export default Bubble;
