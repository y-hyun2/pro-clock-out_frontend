// src/components/GoalList.js
import React from "react";
import styled from "styled-components";
const ListContainer = styled.div`
  padding: 0px 15px;
`;
const GoalItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer; /* 클릭 가능하게 스타일 변경 */
`;

const ColorDot = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`;

const Content = styled.span`
  flex-grow: 1;
`;

// visually hidden
const Checkbox = styled.input`
  margin-left: 10px;
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;

  &:checked + label::after {
    opacity: 1;
  }
`;
const StyledCheckbox = styled.label`
  // StyledCheckbox 스타일
  position: relative;
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:before {
    content: "✓";
    color: gray;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background-color: white;
    border: 1px solid gray;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:after {
    opacity: 0;
    content: "✓";
    color: white;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 2px solid ${(props) => props.color};
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const GoalList = ({ goals, categorycategorys, onCheckboxChange, onEditGoal }) => {
  //   console.log(goals[0].name);
  return (
    <ListContainer>
      {goals &&
        goals.map((goal, index) => {
          console.log("카테고리 컬러:", categorycategorys[goal.category]); // 콘솔에 출력
          return(
          <GoalItem key={index}>
            <ColorDot
              color={categorycategorys[goal.category]}
              onClick={() => onEditGoal(goal)}
            />
            <Content onClick={() => onGoalClick(goal)}>{goal.content}</Content>
            <Checkbox
              type="checkbox"
              id={`checkbox-${index}`}
              onChange={() => onCheckboxChange(goal)}
            />
            <StyledCheckbox
              color={categorycategorys[goal.category]}
              htmlFor={`checkbox-${index}`}
            />
          </GoalItem>
          );
})}
    </ListContainer>
  );
};

export default GoalList;
