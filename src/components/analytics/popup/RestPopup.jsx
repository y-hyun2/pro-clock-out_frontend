import React, {useState} from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
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
  height: 40rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  font-size: 3rem;
  color: #a2a6ff;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #a2a6ff;
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
  gap: 4.5rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
  margin-top: 3rem;
`;

const SideWrapper = styled.div`
   display: flex;
   flex-direction: column;

`;

// 컴포넌트 함수
const RestPopup = ({ onClose, onSave, taskScore, onInputChange, title }) => {
  // Prevent click events from bubbling up to the PopupContainer
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#A2A6FF",
    "#A2A6FF",
    "#A2A6FF",
    "#A2A6FF",
  ];

  const [selectedTime, setSelectedTime] = useState('00:00');

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log('Selected Time:', time);
  };

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={handlePopupClick}>
        <PopupTitle>{title || "휴식 데이터를 입력해주세요"}</PopupTitle>
        <TopQuestionWrapper>
          <SideWrapper>
          <Question
            title="근무일 휴식 시간"
            description="근무일 기준 평균적인 휴식 시간을 입력해주세요."
          />
          <TimeSelector
             onSelect={handleTimeSelect} 
             defaultOption={selectedTime} 
          />
          </SideWrapper>
          <SideWrapper>
          <Question
            title="휴무일 휴식 시간"
            description="휴무일 기준 평균적인 휴식 시간을 입력해주세요."
          />
          <TimeSelector
             onSelect={handleTimeSelect} 
             defaultOption={selectedTime} 
          />
          </SideWrapper>
        </TopQuestionWrapper>
        <MiddleQuestionWrapper>
          <Question
            title="휴식 만족도"
            description="하루 휴식 시간에 대한 만족도를 나타내주세요."
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

export default RestPopup;
