import React, { useState } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import TimeSelector from "./TimeSelector";
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
  width: 50rem;
  height: 45rem;
  position: relative;
`;

const PopupTitle = styled.h3`
  margin-top: 3rem;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
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
  gap: 4rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
  margin-top: 3rem;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiddleQuestionWrapper2 = styled.div`
  justify-content: left;
  margin-left: 1.3rem;
`;

const RestPopup = ({ onClose, onSave, initialRestScore, title }) => {
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

  // 기본값을 0시간으로 설정하고, 선택 여부를 추적하기 위한 상태 추가
  const [workdayRest, setWorkdayRest] = useState("00:00");
  const [dayoffRest, setDayoffRest] = useState("00:00");
  const [restScore, setRestScore] = useState(initialRestScore || null);

  const [isWorkdayRestSelected, setIsWorkdayRestSelected] = useState(false);
  const [isDayoffRestSelected, setIsDayoffRestSelected] = useState(false);

  const handleTimeSelectChange = (time) => {
    setWorkdayRest(time);
    setIsWorkdayRestSelected(true);
    console.log("근무일 휴식 시간:", time);
  };

  const handleTimeSelectChange2 = (time2) => {
    setDayoffRest(time2);
    setIsDayoffRestSelected(true);
    console.log("휴무일 휴식 시간:", time2);
  };

  // 선택되지 않았을 때, 기본값을 0으로 간주하고 선택했는지 확인
  const isRestFormValid = () => {
    return isWorkdayRestSelected && isDayoffRestSelected && restScore !== null;
  };

  const handleRestScoreChange = (score) => {
    setRestScore(score);
    console.log("휴식 만족도 점수:", score);
  };

  const handleSaveClick = async () => {
    if (isRestFormValid()) {
      try {
        // 시간 계산 로직에서 NaN 방지
        const workdayRestHours =
          parseFloat(workdayRest.split(":")[0]) +
          parseFloat(workdayRest.split(":")[1]) / 60;
        const dayoffRestHours =
          parseFloat(dayoffRest.split(":")[0]) +
          parseFloat(dayoffRest.split(":")[1]) / 60;

        const response = await axios.post(
          "https://www.proclockout.com/api/v1/members/me/wolibals/rest",
          {
            workday_rest: workdayRestHours,
            dayoff_rest: dayoffRestHours,
            rest_satisfaction: restScore,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        console.log("Data saved successfully:", response);
        onSave({
          workdayRest,
          dayoffRest,
          restScore,
        });
        onClose();
      } catch (error) {
        console.error("Error while saving data:", error);
        alert("데이터를 저장하는 중 오류가 발생했습니다.");
      }
    } else {
      // Alert 메시지 추가: 선택하지 않았을 때만
      if (!isWorkdayRestSelected) {
        alert("근무일 휴식 시간을 선택해주세요.");
      }
      if (!isDayoffRestSelected) {
        alert("휴무일 휴식 시간을 선택해주세요.");
      }
      if (restScore === null) {
        alert("휴식 만족도를 입력해주세요.");
      }
    }
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
              onSelect={handleTimeSelectChange}
              defaultOption={workdayRest}
            />
          </SideWrapper>
          <SideWrapper>
            <Question
              title="휴무일 휴식 시간"
              description="휴무일 기준 평균적인 휴식 시간을 입력해주세요."
            />
            <TimeSelector
              onSelect={handleTimeSelectChange2}
              defaultOption={dayoffRest}
            />
          </SideWrapper>
        </TopQuestionWrapper>
        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="휴식 만족도"
              description="하루 휴식 시간에 대한 만족도를 나타내주세요."
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            value={restScore}
            onChange={handleRestScoreChange}
            buttonColors={colors}
          />
        </MiddleQuestionWrapper>
        <PopupButton onClick={handleSaveClick}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default RestPopup;
