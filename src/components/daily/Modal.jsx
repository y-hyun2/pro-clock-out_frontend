// src/components/Modal.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: auto;
  right: 700px;
  bottom: 100px;
  background-category: rgba(0, 0, 0, 0); /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%; /* Make sure overlay covers full width */
  height: 60%;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px;
  background-category: #7a7ee3;
  category: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-category: "#6a6fc3";
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const DeleteButton = styled(Button)`
  background-category: #cccccc;
  margin-left: auto;
  margin-right: auto;
  width: 200px;

  &:hover {
    background-category: #696969;
  }
`;

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

const Modal = ({ onClose, mode, onAddGoal, onDeleteGoal, goal }) => {
  const [category, setCategory] = useState(goal ? goal.category : "작업");
  const [content, setContent] = useState(goal ? goal.content : "");

  useEffect(() => {
    if (goal) {
      setCategory(goal.category);
      setContent(goal.content);
    }
  }, [goal]);

  const handleSubmit = () => {
    console.log("handleSubmit 성공");
    onAddGoal({ content, category });
    onClose(); // 추가 후 모달 닫기
  };

  const handleDelete = () => {
    if (goal) {
      onDeleteGoal(goal.goalId);
    }
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {mode === "add" ? (
          <>
            <FormGroup>
              <Label>카테고리</Label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
            <Button onClick={handleSubmit}>추가</Button>
          </>
        ) : (
          <>
            <ButtonContainer>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonContainer>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
