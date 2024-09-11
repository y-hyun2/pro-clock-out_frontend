import React, { useState } from "react";
import styled from "styled-components";

function SelectButtons({ buttonColors = [], value, onChange }) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(value);

  const handleClick = (index) => {
    const newIndex = selectedButtonIndex === index ? null : index;
    setSelectedButtonIndex(newIndex);

    if (newIndex !== null) {
      const score = newIndex + 1;
      console.log(`Selected score: ${score}`);
      onChange(score); // 선택된 점수를 부모 컴포넌트로 전달
    } else {
      console.log("Deselected button");
      onChange(null); // 선택이 해제되면 null을 전달
    }
  };

  // 버튼 크기 설정
  const buttonSizes = [
    "100px",
    "80px",
    "60px",
    "40px",
    "30px",
    "40px",
    "60px",
    "80px",
    "100px",
  ];

  return (
    <Container>
      {buttonSizes.map((size, index) => (
        <StyledButton
          key={index}
          onClick={() => handleClick(index)}
          selected={selectedButtonIndex === index}
          size={size}
          color={buttonColors[index]}
        >
          {selectedButtonIndex === index && (
            <CheckIcon size={size}>✓</CheckIcon>
          )}
        </StyledButton>
      ))}
      <SatisfactionWrapper>
        <SatisfactionText>매우 불만족</SatisfactionText>
        <SatisfactionText>매우 만족</SatisfactionText>
      </SatisfactionWrapper>
    </Container>
  );
}

export default SelectButtons;

// Styled Components

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 6.5rem;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;

const StyledButton = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: 3px solid ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ color }) => color};
  }

  background-color: ${({ selected, color }) =>
    selected ? color : "transparent"};
`;

const CheckIcon = styled.div`
  font-size: ${({ size }) => `calc(${size} / 2.5)`};
  color: #ffffff;
  transition: color 0.3s ease-in-out;
  font-weight: bold;
`;

const SatisfactionWrapper = styled.div`
  gap: 29.5rem;
  display: flex;
  flex-direction: row;
`;

const SatisfactionText = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;
