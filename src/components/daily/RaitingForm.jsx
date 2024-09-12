import React, { useState } from "react";
import styled from "styled-components";

// 스타일링된 컴포넌트 정의
const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  width: 250px;
  align-items: center;
`;

const RateContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const veryGood = process.env.PUBLIC_URL + "/image/veryGood.png";
const good = process.env.PUBLIC_URL + "/image/good.png";
const normal = process.env.PUBLIC_URL + "/image/normal.png";
const bad = process.env.PUBLIC_URL + "/image/bad.png";
const veryBad = process.env.PUBLIC_URL + "/image/veryBad.png";

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 70%;
  background-color: ${({ isSelected, selectedColor }) => {
    return isSelected ? selectedColor : "#ddd";
  }};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;

  &::before {
    content: "";
    display: block;
    width: 36px;
    height: 36px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &.rating-9::before {
    background-image: url(${veryGood});
  }

  &.rating-7::before {
    background-image: url(${good});
  }

  &.rating-5::before {
    background-image: url(${normal});
  }

  &.rating-3::before {
    background-image: url(${bad});
  }

  &.rating-1::before {
    background-image: url(${veryBad});
  }

  &:hover {
    background-color: ${({ isSelected, selectedColor }) =>
      isSelected ? selectedColor : "#aaa"};
  }

  &:hover::before {
    filter: brightness(1.1);
  }
`;

// 별점 컴포넌트
const RatingForm = ({ part, selectedColor, onRatingChange }) => {
  const [rating, setRating] = useState(null);

  const handleChange = (event) => {
    const newRating = parseInt(event.target.value, 10);

    setRating((prevRating) => (prevRating === newRating ? null : newRating));
    onRatingChange(part, newRating); // 부모 컴포넌트로 변경된 값 전달
  };

  return (
    <form>
      <Fieldset>
        {[
          { value: 1, label: "1점" },
          { value: 3, label: "3점" },
          { value: 5, label: "5점" },
          { value: 7, label: "7점" },
          { value: 9, label: "9점" },
        ].map(({ value, label }) => (
          <RateContainer key={value}>
            <HiddenCheckbox
              name={`${part}-rating`}
              value={value}
              id={`${part}-rating-${value}`}
              checked={rating === value}
              onChange={handleChange}
            />
            <StyledLabel
              htmlFor={`${part}-rating-${value}`}
              className={`rating-${value}`}
              title={label}
              isSelected={rating === value}
              selectedColor={selectedColor}
            />
          </RateContainer>
        ))}
      </Fieldset>
    </form>
  );
};

export default RatingForm;
