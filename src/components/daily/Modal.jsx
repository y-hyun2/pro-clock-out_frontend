// src/components/Modal.js
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  margin-top: auto;
  bottom: 100px;
  left: 400px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.5);
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

const Modal = ({ onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
        {/* 부모 컴포넌트에서 자식 컴포넌트로 전달되는 내용 */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
