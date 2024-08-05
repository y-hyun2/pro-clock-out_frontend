import React, { useState } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import axios from "axios";

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
  width: 53rem;
  height: 65rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
  color: #97e7e1;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #97e7e1;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 3.8rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
`;

const MiddleQuestionWrapper2 = styled.div`
  justify-content: left;
  margin-left: 3.5rem;
  padding-top: 2.5rem;
`;

const PersonalPopup = ({ onClose, onSave }) => {
  const [friendFamilyScore, setFriendFamilyScore] = useState(null);
  const [hobbyScore, setHobbyScore] = useState(null);
  const [personalLifeScore, setPersonalLifeScore] = useState(null);

  const colors = [
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#FF8A8A",
    "#CCCCCC",
    "#97E7E1",
    "#97E7E1",
    "#97E7E1",
    "#97E7E1",
  ];

  const isFormValid = () => {
    return (
      friendFamilyScore !== null &&
      hobbyScore !== null &&
      personalLifeScore !== null
    );
  };

  const handleSaveClick = async () => {
    if (isFormValid()) {
      try {
        const requestData = {
          together_time: friendFamilyScore,
          hobby_time: hobbyScore,
          personal_satisfaction: personalLifeScore,
        };

        const response = await axios.post(
          "https://www.proclockout.com/api/v1/members/me/wolibals/personal",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        console.log("Data saved successfully:", response);
        onSave(requestData);
        onClose();
      } catch (error) {
        console.error("Error while saving data:", error);
        alert("데이터를 저장하는 중 오류가 발생했습니다.");
      }
    } else {
      if (friendFamilyScore === null) {
        alert("친구 및 가족과의 시간 점수를 입력해주세요.");
      } else if (hobbyScore === null) {
        alert("취미 활동 시간 점수를 입력해주세요.");
      } else if (personalLifeScore === null) {
        alert("개인 생활 만족도 점수를 입력해주세요.");
      }
    }
  };

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>개인 생활 데이터를 입력해주세요</PopupTitle>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="친구 및 가족과의 시간"
              description="친구 및 가족과 충분히 많은 시간을 보내시나요?"
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            buttonColors={colors}
            value={friendFamilyScore}
            onChange={setFriendFamilyScore}
          />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="취미 활동 시간"
              description="평소에 취미 활동을 위한 시간을 충분히 내고 있나요?"
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            buttonColors={colors}
            value={hobbyScore}
            onChange={setHobbyScore}
          />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="개인 생활 만족도"
              description="주변 사람들과의 시간, 취미 활동 등 개인 생활의 질에 대한 만족도를 표시해주세요."
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            buttonColors={colors}
            value={personalLifeScore}
            onChange={setPersonalLifeScore}
          />
        </MiddleQuestionWrapper>

        <PopupButton onClick={handleSaveClick}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default PersonalPopup;
