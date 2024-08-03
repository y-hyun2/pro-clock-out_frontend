// src/components/AddGoalModal.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const AddGoalModal = ({
  onClose,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
  goal,
  mode,
}) => {
  const [category, setCategory] = useState(goal ? goal.category : "작업");
  const [content, setContent] = useState(goal ? goal.content : "");

  useEffect(() => {
    if (goal) {
      setCategory(goal.category);
      setContent(goal.content);
    }
  }, [goal]);

  const handleSubmit = () => {
    if (mode === "add") {
      onAddGoal({ category, content });
    } else if (mode === "edit") {
      onEditGoal({ ...goal, category, content });
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDeleteGoal) {
      onDeleteGoal(goal);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FormGroup>
        <Label>카테고리</Label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="작업">작업</option>
          <option value="휴식">휴식</option>
          <option value="개인생활">개인생활</option>
          <option value="수면">수면</option>
          <option value="건강">건강</option>
          <option value="기타">기타</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>내용</Label>
        <Input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={20}
        />
      </FormGroup>
      {mode === "add" ? (
        <Button onClick={handleSubmit}>추가</Button>
      ) : (
        <>
          <Button onClick={handleSubmit}>수정</Button>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </>
      )}
    </Modal>
  );
};

export default AddGoalModal;
