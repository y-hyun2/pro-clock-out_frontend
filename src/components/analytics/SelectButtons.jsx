import React, { useState } from 'react';
import styled from 'styled-components';

function SelectButtons({ buttonColors = [] }) {
  // 선택된 버튼의 인덱스를 저장하는 상태
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  // 버튼 클릭 시 호출되는 핸들러
  const handleClick = (index) => {
    // 선택된 버튼이 이미 선택된 상태일 경우 취소
    setSelectedButtonIndex(selectedButtonIndex === index ? null : index);
  };

  // 버튼 크기 설정
  const buttonSizes = ['100px', '80px', '60px', '40px', '30px', '40px', '60px', '80px', '100px'];

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
          {selectedButtonIndex === index && <CheckIcon size={size}>✓</CheckIcon>}
        </StyledButton>
      ))}
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
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ color }) => color};
  }

  background-color: ${({ selected, color }) => (selected ? color : 'transparent')};
`;

const CheckIcon = styled.div`
  font-size: ${({ size }) => `calc(${size} / 2.5)`};
  color: #ffffff;
  transition: color 0.3s ease-in-out;
  font-weight: bold;
`;
