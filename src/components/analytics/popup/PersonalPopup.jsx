import React from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";

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
  color: #97E7E1;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #97E7E1;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
  margin-top: 3rem;
`;

const PersonalPopup = ({ onClose, onSave, taskScore, onInputChange }) => {
  // Prevent click events from bubbling up to the PopupContainer
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
  const colors = ['#FF8A8A', '#FF8A8A', '#FF8A8A', '#FF8A8A', '#CCCCCC', '#97E7E1', '#97E7E1', '#97E7E1', '#97E7E1'];

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={handlePopupClick}>
        <PopupTitle>개인 생활 데이터를 입력해주세요</PopupTitle>
        <MiddleQuestionWrapper>
        <Question
            title="친구 및 가족과의 시간"
            description="친구 및 가족과 충분히 많은 시간을 보내시나요?"
          />
          <SelectButtons
          buttonColors={colors}
          value={taskScore}
          onChange={onInputChange}
        />
        </MiddleQuestionWrapper>
        <MiddleQuestionWrapper>
          <Question
            title="취미 활동 시간"
            description="평소에 취미 활동을 위한 시간을 충분히 내고 있나요?"
          />
        <SelectButtons
        buttonColors={colors}
          value={taskScore}
          onChange={onInputChange}
        />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
        <Question
            title="개인 생활 만족도"
            description="주변 사람들과의 시간, 취미 활동 등 개인 생활의 질에 대한 만족도를 표시해주세요."
          />
        <SelectButtons
        buttonColors={colors}
          value={taskScore}
          onChange={onInputChange}
        />
        </MiddleQuestionWrapper>
        <PopupButton onClick={() => {
          onSave();
          onClose();
        }}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default PersonalPopup;
