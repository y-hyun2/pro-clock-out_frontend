import React, { useState } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import WorkoutCount from "./WorkoutCount";
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
  width: 53rem;
  height: 82rem;
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
  margin-top: 5rem;
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
  margin-left: 1rem;
`;

const MiddleQuestionWrapper2 = styled.div`
  justify-content: left;
  margin-left: 3.5rem;
  margin-top: 1.8rem;
`;

const HealthPopup = ({ onClose, onSave }) => {
  const [aerobicWorkoutCount, setAerobicWorkoutCount] = useState(null);
  const [aerobicWorkoutTime, setAerobicWorkoutTime] = useState("00:00");

  const [strengthWorkoutCount, setStrengthWorkoutCount] = useState(null);
  const [strengthWorkoutTime, setStrengthWorkoutTime] = useState("00:00");

  const [balancedMealScore, setBalancedMealScore] = useState(null);
  const [healthSatisfactionScore, setHealthSatisfactionScore] = useState(null);

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

  const convertTimeToDecimal = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const handleSelect = (option, type) => {
    if (type === "aerobic") {
      setAerobicWorkoutCount(option);
      console.log(`주 유산소 운동 횟수: ${option}`);
    } else if (type === "strength") {
      setStrengthWorkoutCount(option);
      console.log(`주 근력 운동 횟수: ${option}`);
    }
  };

  const handleTimeSelect = (time, type) => {
    if (type === "aerobic") {
      setAerobicWorkoutTime(time);
      console.log(`일 유산소 운동 시간: ${time}`);
    } else if (type === "strength") {
      setStrengthWorkoutTime(time);
      console.log(`일 근력 운동 시간: ${time}`);
    }
  };

  const validateForm = () => {
    if (aerobicWorkoutCount === null) {
      alert("주 유산소 운동 횟수를 입력해주세요.");
      return false;
    }

    if (strengthWorkoutCount === null) {
      alert("주 근력 운동 횟수를 입력해주세요.");
      return false;
    }

    if (balancedMealScore === null) {
      alert("균형 잡힌 식사에 대한 평가를 입력해주세요.");
      return false;
    }

    if (healthSatisfactionScore === null) {
      alert("건강 만족도 평가를 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
      const cardioTime = convertTimeToDecimal(aerobicWorkoutTime);
      const strengthTime = convertTimeToDecimal(strengthWorkoutTime);

      const requestData = {
        cardio_frequency: aerobicWorkoutCount,
        cardio_time: cardioTime,
        strength_frequency: strengthWorkoutCount,
        strength_time: strengthTime,
        diet_quality: balancedMealScore,
        health_satisfaction: healthSatisfactionScore,
      };

      try {

        const response = await axios.put(
          "https://www.proclockout.com/api/v1/wolibals/health",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        console.log("Data saved successfully:", response.data);
        onSave(requestData);
        onClose();
      } catch (error) {
        console.error("Error while saving data:", error);
        alert("데이터를 저장하는 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>건강 데이터를 입력해주세요</PopupTitle>

        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="주 유산소 운동 횟수"
              description="일주일 평균 유산소 운동 횟수를 입력해주세요."
            />
            <WorkoutCount
              defaultOption={0}
              onSelect={(option) => handleSelect(option, "aerobic")}
            />
          </MiddleQuestionWrapper>

          <MiddleQuestionWrapper>
            <Question
              title="일 유산소 운동 시간"
              description="유산소 운동을 하는 날에 몇 시간 운동하시나요?"
            />
            <TimeSelector
              onSelect={(time) => handleTimeSelect(time, "aerobic")}
              defaultOption={aerobicWorkoutTime}
              interval={15}
              maxHours={2}
            />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="주 근력 운동 횟수"
              description="일주일 평균 근력 운동 횟수를 입력해주세요."
            />
            <WorkoutCount
              defaultOption={0}
              onSelect={(option) => handleSelect(option, "strength")}
            />
          </MiddleQuestionWrapper>

          <MiddleQuestionWrapper>
            <Question
              title="일 근력 운동 시간"
              description="근력 운동을 하는 날에 몇 시간 운동하시나요?"
            />
            <TimeSelector
              onSelect={(time) => handleTimeSelect(time, "strength")}
              defaultOption={strengthWorkoutTime}
              interval={15}
              maxHours={2}
            />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="균형 잡힌 식사"
              description="평소에 균형 잡힌 식사를 하고 계신가요?"
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            buttonColors={colors}
            value={balancedMealScore}
            onChange={(value) => {
              setBalancedMealScore(value);
              console.log(`균형 잡힌 식사 평가: ${value}`);
            }}
          />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
          <MiddleQuestionWrapper2>
            <Question
              title="건강 만족도"
              description="현재 건강 상태에 대한 만족도를 표시해주세요."
            />
          </MiddleQuestionWrapper2>
          <SelectButtons
            buttonColors={colors}
            value={healthSatisfactionScore}
            onChange={(value) => {
              setHealthSatisfactionScore(value);
              console.log(`건강 만족도 평가: ${value}`);
            }}
          />
        </MiddleQuestionWrapper>

        <PopupButton onClick={handleSaveClick}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default HealthPopup;
