// src/components/GoalBox.js
import React from "react";
import styled from "styled-components";

const GoalBoxContainer = styled.div`
  width: 1128px;
  background-color: #dadbff;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: calc(160px + 30px);
  padding: 10px;
  gap: 10px;
  margin-top: 20px;
  border: 1px solid #7a7ee3;
  border-radius: 8px;
  margin-left: 30.5rem;
  margin-top: 10rem;
  right: 65px;
`;

const GoalBoxItem = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ColorDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 8px;
`;

const Content = styled.span`
  flex-grow: 1;
  margin-right: 8px;
`;

const GoalBox = ({ goals, categoryColors }) => {
  return (
    <GoalBoxContainer>
      {goals.map((goal, index) => (
        <GoalBoxItem key={index}>
          <ColorDot color={categoryColors[goal.category]} />
          <Content>{goal.content}</Content>
        </GoalBoxItem>
      ))}
    </GoalBoxContainer>
  );
};

export default GoalBox;
