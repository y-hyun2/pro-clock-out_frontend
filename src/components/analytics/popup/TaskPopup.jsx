import React, {useState} from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import TimeSelector from "./TimeSelector";
import WorkoutCount from "./WorkoutCount";

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
  color: #7aa2e3;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #7aa2e3;
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
  gap: 8rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
`;

const SideWrapper = styled.div`
   display: flex;
   flex-direction: column;

`;

const TaskPopup = ({ onClose, onSave, taskScore, onInputChange }) => {
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#7AA2E3",
    "#7AA2E3",
    "#7AA2E3",
    "#7AA2E3",
  ];


  const [selectedTime, setSelectedTime] = useState('08:00');

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log('Selected Time:', time);
  };
  
    //출근 횟수
    const handleSelect = (option) => {
      console.log('Selected:', option);
    };


  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={handlePopupClick}>
        <PopupTitle>작업 데이터를 입력해주세요</PopupTitle>
        <TopQuestionWrapper>
          <SideWrapper>
          <Question
            title="일 근무 시간"
            description="하루 평균적인 근무 시간을 입력해주세요."
          />
          <TimeSelector
          onSelect={handleTimeSelect} 
            defaultOption={selectedTime} 
          />
          </SideWrapper>

         <MiddleQuestionWrapper>
          <Question
            title="주 출근 횟수"
            description="일주일 평균적인 출근 횟수를 입력해주세요."
          />
          <WorkoutCount defaultOption={0} onSelect={handleSelect}/>
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>
        <MiddleQuestionWrapper>
          <Question
            title="업무 스트레스"
            description="업무를 하며 받는 스트레스 정도를 표현해주세요."
          />
          <SelectButtons
            value={taskScore}
            onChange={onInputChange}
            buttonColors={colors}
          />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
          <Question
            title="업무 만족도"
            description="본인 업무의 환경, 사람, 적성 등에 대한 만족도를 표현해주세요."
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

export default TaskPopup;
