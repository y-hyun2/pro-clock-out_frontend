import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* 컬럼 방향으로 수정하여 제목과 설명을 위아래로 배치 */
`;

// 제목을 동적으로 설정
const QuestionTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

// 설명을 동적으로 설정
const QuestionDescribe = styled.p`
  font-size: 1rem;
  margin: 0; 
  color: gray;
`;

const Question = ({ title, description }) => {
  return (
    <Wrapper>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionDescribe>{description}</QuestionDescribe>
    </Wrapper>
  );
};

export default Question;
