// src/GoalListContainer.js
import React, { useState } from "react";
import styled from "styled-components";
import GoalList from "./GoalList";
import Modal from "./Modal";

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
  onEditGoal,
  onDeleteGoal,
  goals,
  isLocked,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 모달 모드

  const handleAddGoal = (newGoal) => {
    if (goals.length < 10) {
      onAddGoal(newGoal); // Add the new goal
    } else {
      alert("목표는 최대 10개까지 추가할 수 있습니다.");
    }
  };

  const handleEditGoal = (updatedGoal) => {
    onEditGoal(updatedGoal); // Update the goal
  };

  const handleDeleteGoal = (goalToDelete) => {
    onDeleteGoal(goalToDelete); // Delete the goal
    setEditingGoal(null); // Clear editing goal
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingGoal(null); // No goal being edited
    setModalOpen(true);
  };

  const openEditModal = (goal) => {
    setModalMode("edit");
    setEditingGoal(goal); // Set the goal to be edited
    setModalOpen(true);
  };

  return (
    <GoalContainer isLocked={isLocked}>
      <FormTitle>목표활동 기록하기</FormTitle>
      <FormBlock />
      <GoalList
        goals={goals}
        categoryColors={categoryColors}
        onCheckboxChange={onCheckboxChange}
        onEditGoal={openEditModal}
      />
      <AddButton onClick={openAddModal}>+추가하기</AddButton>
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onAddGoal={handleAddGoal}
          onDeleteGoal={handleDeleteGoal}
          goal={editingGoal}
          mode={modalMode}
        />
      )}
    </GoalContainer>
  );
};

export default GoalListContainer;
