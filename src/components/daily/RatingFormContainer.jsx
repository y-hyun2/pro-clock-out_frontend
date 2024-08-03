import React from "react";
import styled from "styled-components";
import RatingForm from "./RaitingForm";

// 파트별 색상 매핑
const parts = {
  작업: "#7AA2E3",
  휴식: "#A2A6FF",
  개인생활: "#97E7E1",
  수면: "#6AD4DD",
  건강: "#F2E88E",
};

const DailyPageContainer = styled.div`
  width: 350px;
  position: absolute;
  margin-right: auto;
  top: calc(300px + 30px); /* DateContainer 높이 + padding */
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: end;
  pointer-events: ${(props) =>
    props.isLocked ? "none" : "auto"}; /* 잠금 상태에 따른 포인터 이벤트 */
  opacity: ${(props) =>
    props.isLocked ? 0.5 : 1}; /* 잠금 상태에 따른 투명도 */
`;

const PartContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PartLabel = styled.div`
  margin-right: 20px; /* 텍스트와 폼 간의 간격 */
  font-size: 14px;
`;

const FormTitle = styled.div`
  width: 330px;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const FormBlock = styled.div`
  border-top: 1px solid #444444;
  margin: 20px auto;
  margin-top: 10px;
  width: 300px;
`;

const RatingFormContainer = ({ onRatingChange, isLocked }) => {
  return (
    <DailyPageContainer isLocked={isLocked}>
      <FormTitle>오늘의 만족도를 표현해보세요!</FormTitle>
      <FormBlock />
      {Object.entries(parts).map(([part, color]) => (
        <PartContainer key={part}>
          <PartLabel>{part}</PartLabel>
          <RatingForm
            part={part}
            selectedColor={color}
            onRatingChange={onRatingChange}
          />
        </PartContainer>
      ))}
    </DailyPageContainer>
  );
};

export default RatingFormContainer;
