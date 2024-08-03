import React, { useState } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import WorkoutCount from "./WorkoutCount";
import TimeSelector from "./TimeSelector";


const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 1.5rem;
  width: 45rem;
  height: 65rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  font-size: 3rem;
  color: #f2e88e;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #f2e88e;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
`;

const TopQuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  gap: 5rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
`;

const HealthPopup = ({ onClose, onSave, taskScore, onInputChange }) => {
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  //운동 횟수
  const handleSelect = (option) => {
    console.log("Selected:", option);
  };

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#F2E88E",
    "#F2E88E",
    "#F2E88E",
    "#F2E88E",
  ];

  const [selectedTime, setSelectedTime] = useState("00:00");

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log("Selected Time:", time);
  };

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={handlePopupClick}>
        <PopupTitle>건강 데이터를 입력해주세요</PopupTitle>
        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="주 유산소 운동 횟수"
              description="일주일 평균 유산소 운동 횟수를 입력해주세요."
            />
            <WorkoutCount defaultOption={0} onSelect={handleSelect} />
          </MiddleQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="일 유산소 운동 시간"
              description="유산소 운동을 하는 날에 몇 시간 운동하시나요?"
            />
            <TimeSelector
              onSelect={handleTimeSelect}
              defaultOption={selectedTime}
              interval={15}
            />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>
        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="주 근력 운동 횟수"
              description="일주일 평균 근력 운동 횟수를 입력해주세요."
            />
            <WorkoutCount defaultOption={0} onSelect={handleSelect} />
          </MiddleQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="일 근력 운동 시간"
              description="근력 운동을 하는 날에 몇 시간 운동하시나요?"
            />
            <TimeSelector
              onSelect={handleTimeSelect}
              defaultOption={selectedTime}
              interval={15}
            />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

        <MiddleQuestionWrapper>
          <Question
            title="균형 잡힌 식사"
            description="평소에 균형 잡힌 식사를 하고 계신가요?"
          />
          <SelectButtons
            buttonColors={colors}
            value={taskScore}
            onChange={onInputChange}
          />
        </MiddleQuestionWrapper>
        <MiddleQuestionWrapper>
          <Question
            title="건강 만족도"
            description="현재 건강 상태에 대한 만족도를 표시해주세요."
          />
          <SelectButtons
            buttonColors={colors}
            value={taskScore}
            onChange={onInputChange}
          />
        </MiddleQuestionWrapper>
        <PopupButton
          onClick={() => {
            onSave();
            onClose();
          }}
        >
          저장
        </PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default HealthPopup;
