import React, {useState} from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import TimeSlider from "./TimeSlider";

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
  width: 50rem;
  height: 65rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  font-size: 3rem;
  color: #6ad4dd;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #6ad4dd;
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
  gap: 15rem;
`;

const MiddleQuestionWrapper = styled.div`
display: flex;
flex-direction: column;
 
`;



const SleepPopup = ({ onClose, onSave, taskScore, onInputChange }) => {


  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  // TimeSlider
  const handleTimeSelect = (time) => {
    console.log('Selected time:', time);
  };

  

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#6AD4DD",
    "#6AD4DD",
    "#6AD4DD",
    "#6AD4DD",
  ];

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={handlePopupClick}>
        <PopupTitle>수면 데이터를 입력해주세요</PopupTitle>

        <TopQuestionWrapper>

        <MiddleQuestionWrapper>
          <Question
            title="근무일 수면 시간"
            description="근무일에는 몇시에 취침하고 몇시에 기상하시나요?"
          />
          <TimeSlider onSelect={handleTimeSelect}/>
          </MiddleQuestionWrapper>

        </TopQuestionWrapper>

        <TopQuestionWrapper>
         
         <MiddleQuestionWrapper>
          <Question
            title="휴무일 수면 시간"
            description="휴무일에는 몇시에 취침하고 몇시에 기상하시나요?"
          />
          <TimeSlider onSelect={handleTimeSelect}/>
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

<MiddleQuestionWrapper>
        <Question
          title="수면 만족도"
          description="수면의 질에 대한 만족도를 나타내주세요."
        />

        <SelectButtons
          value={taskScore}
          onChange={onInputChange}
          buttonColors={colors}
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

export default SleepPopup;
