import React from "react";
import styled from "styled-components";

const EventCategories = ({
  events,
  selectedCategories,
  onCategoryChange,
  categoryColors,
}) => {
  //   categories는 events 배열을 카테고리별로 분류하여 저장하는 객체
  const categories = events.reduce(
    (acc, event) => {
      const label = event.label;
      acc[label].push(event);
      return acc;
    },
    { 작업: [], 휴식: [], 수면: [], 개인생활: [], 건강: [], 기타: [] }
  );
  const handleCheckboxChange = (label) => (event) => {
    const isChecked = event.target.checked;
    onCategoryChange(label, isChecked);
  };

  return (
    <CategoriesContainer>
      <CategoriesHeader>일정</CategoriesHeader>
      {Object.keys(categories).map((label) => (
        <CategorySection key={label}>
          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              checked={selectedCategories[label] || false}
              onChange={handleCheckboxChange(label)}
              id={`checkbox-${label}`}
            />
            <CustomCheckbox
              color={categoryColors[label]}
              htmlFor={`checkbox-${label}`}
            />
            <Label htmlFor={`checkbox-${label}`}>{label}</Label>
          </CheckboxContainer>
          {/* <CategoryTitle>{label}</CategoryTitle> */}
        </CategorySection>
      ))}
    </CategoriesContainer>
  );
};

export default EventCategories;

// 스타일드 컴포넌트 정의
const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 40px;
`;

const CategoriesHeader = styled.h3`
  color: #7a7ee3;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const CategorySection = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = styled.label`
  position: relative;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.color};
  border-radius: 4px;
  cursor: pointer;

  ${HiddenCheckbox}:checked + &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.color};
    border-radius: 4px;
    transform: translate(-50%, -50%);
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    font-size: 18px;
    border-radius: 4px;
    transform: translate(-50%, -50%);
  }
`;

const Label = styled.label`
  font-size: 15px;
`;

const CategoryTitle = styled.h4`
  font-size: 15px;
`;
