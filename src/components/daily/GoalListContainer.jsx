// src/GoalListContainer.js
import React, { useState } from "react";
import styled from "styled-components";
import GoalList from "./GoalList";
import AddGoalModal from "./AddGoalModal";

const GoalContainer = styled.div`
  width: 350px;
  position: absolute;
  margin-right: auto;
  top: calc(
    630px + 30px
  ); /* DateContainer 높이 + FormContainer높이 + padding */
  display: flex;
  flex-direction: column;
  padding: 10px;
  pointer-events: ${(props) =>
    props.isLocked ? "none" : "auto"}; /* 잠금 상태에 따른 포인터 이벤트 */
  opacity: ${(props) =>
    props.isLocked ? 0.5 : 1}; /* 잠금 상태에 따른 투명도 */
`;

const AddButton = styled.button`
  position: relative;
  //   left: 20px;
  padding: 10px 20px;
  color: #9d9d9d;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: #7a7ee3;
  }
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

const GoalListContainer = ({
  categoryColors,
  onCheckboxChange,
  onAddGoal,
  isLocked,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleAddGoal = (goal) => {
    setGoals([...goals, goal]);
    onAddGoal(goal); // 상위 컴포넌트로 목표 전달
  };

  return (
    <GoalContainer isLocked={isLocked}>
      <FormTitle>목표활동 기록하기</FormTitle>
      <FormBlock />
      <GoalList
        goals={goals}
        categoryColors={categoryColors}
        onCheckboxChange={onCheckboxChange}
      />
      <AddButton onClick={() => setModalOpen(true)}>+추가하기</AddButton>
      {isModalOpen && (
        <AddGoalModal
          onClose={() => setModalOpen(false)}
          onAddGoal={handleAddGoal}
        />
      )}
    </GoalContainer>
  );
};

export default GoalListContainer;
