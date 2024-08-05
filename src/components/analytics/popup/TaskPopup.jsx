import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectButtons from "../SelectButtons";
import Question from "../Question";
import TimeSelector from "./TimeSelector";
import WorkoutCount from "./WorkoutCount";
import axios from "axios";

// styled components
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
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
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
  margin-top: 4rem;
`;

const TopQuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
`;

const MiddleQuestionWrapper = styled.div`
  justify-content: left;
  margin-top: 2.5rem;
`;

const TaskPopup = ({ onClose, onSave, initialData = {} }) => {
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

  // Initialize states
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeInitial, setSelectedTimeInitial] = useState("08:00");
  const [workoutCount, setWorkoutCount] = useState(null);
  const [taskStressScore, setTaskStressScore] = useState(null);
  const [taskSatisfactionScore, setTaskSatisfactionScore] = useState(null);

  useEffect(() => {
    if (initialData.selectedTime) {
      setSelectedTime(initialData.selectedTime);
      setSelectedTimeInitial(initialData.selectedTime);
    }
    if (initialData.workoutCount !== undefined) setWorkoutCount(initialData.workoutCount);
    if (initialData.taskStressScore !== undefined) setTaskStressScore(initialData.taskStressScore);
    if (initialData.taskSatisfactionScore !== undefined) setTaskSatisfactionScore(initialData.taskSatisfactionScore);
  }, [initialData]);

  const handleTimeSelect = (time) => {
    console.log('Time selected:', time);
    setSelectedTime(time);
  };

  const handleSelectWorkoutCount = (count) => {
    console.log('주 출근 횟수:', count);
    setWorkoutCount(count);
  };

  const handleTaskStressChange = (score) => {
    console.log('업무 스트레스 점수:', score);
    setTaskStressScore(score);
  };

  const handleTaskSatisfactionChange = (score) => {
    console.log('업무 만족도 점수:', score);
    setTaskSatisfactionScore(score);
  };

  const isFormValid = () => {
    return (
      selectedTime !== null &&
      workoutCount !== null &&
      workoutCount >= 0 &&
      taskStressScore !== null &&
      taskSatisfactionScore !== null
    );
  };

  const handleSaveClick = async () => {
    if (!isFormValid()) {
      alert('모든 값을 올바르게 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem("Authorization");

      const response = await axios.post('https://www.proclockout.com/api/v1/members/me/wolibals/work', {
        day_working_hours: parseFloat(selectedTime.split(':')[0]) + parseFloat(selectedTime.split(':')[1]) / 60,
        week_working_days: workoutCount,
        work_stress: taskStressScore,
        work_satisfaction: taskSatisfactionScore,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : '', // Use token from local storage
        }
      });

      console.log('Data saved successfully:', response.data);
      onSave({
        selectedTime,
        workoutCount,
        taskStressScore,
        taskSatisfactionScore,
      });
      onClose();
    } catch (error) {
      console.error('Error while saving data:', error);
      alert('데이터를 저장하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <PopupContainer onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>작업 데이터를 입력해주세요</PopupTitle>
        <TopQuestionWrapper>
          <MiddleQuestionWrapper>
            <Question
              title="일 근무 시간"
              description="하루 평균적인 근무 시간을 입력해주세요."
            />
            <TimeSelector
              onSelect={handleTimeSelect}
              defaultOption={selectedTime || "08:00"}
            />
          </MiddleQuestionWrapper>

          <MiddleQuestionWrapper>
            <Question
              title="주 출근 횟수"
              description="일주일 평균적인 출근 횟수를 입력해주세요."
            />
            <WorkoutCount
              defaultOption={workoutCount || 0}
              onSelect={handleSelectWorkoutCount}
            />
          </MiddleQuestionWrapper>
        </TopQuestionWrapper>
        <MiddleQuestionWrapper>
          <Question
            title="업무 스트레스"
            description="업무를 하며 받는 스트레스 정도를 표현해주세요."
          />
          <SelectButtons
            value={taskStressScore}
            onChange={handleTaskStressChange}
            buttonColors={colors}
          />
        </MiddleQuestionWrapper>

        <MiddleQuestionWrapper>
          <Question
            title="업무 만족도"
            description="본인 업무의 환경, 사람, 적성 등에 대한 만족도를 표현해주세요."
          />
          <SelectButtons
            value={taskSatisfactionScore}
            onChange={handleTaskSatisfactionChange}
            buttonColors={colors}
          />
        </MiddleQuestionWrapper>

        <PopupButton onClick={handleSaveClick}>저장</PopupButton>
      </Popup>
    </PopupContainer>
  );
};

export default TaskPopup;
