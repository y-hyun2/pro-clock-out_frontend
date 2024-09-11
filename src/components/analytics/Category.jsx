import React from "react";
import Analytics_BarChart from "../analytics/Analytics_BarChart";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 0rem;
`;
const Container = styled.div`
  width: 395px;
  border: 1px gray solid;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
  margin-right: 2.4rem;
`;

const Header = styled.div`
  background-color: ${(props) => props.fill};
  color: white;
  font-weight: 800;
  font-size: 40px;
  text-shadow: 2px 3px 3px black;
  padding: 20px 0;
`;

const CategoryScore = styled.div`
  padding-top: 15px;
  font-size: 70px;
  font-weight: bold;
  margin: 10px 0;
`;

const Percentage = styled.div`
  color: ${(props) => props.fill};
  font-size: 25px;
  margin-bottom: 6%;
  text-shadow: 1px 1px 1px black;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20;
`;

function Category({ categoryData }) {
  const { title, data, score, percentage, fill } = categoryData;

  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 2));
  }

  return (
    <Wrapper>
      <Container>
        <Header fill={fill}>{title}</Header>
        <CategoryScore>{score}점</CategoryScore>
        <Percentage fill={fill}>상위 {percentage}%</Percentage>
        <ChartsContainer>
          {chunkedData.map((dataSet, index) => (
            <Analytics_BarChart key={index} data={dataSet} />
          ))}
        </ChartsContainer>
      </Container>
    </Wrapper>
  );
}

export default Category;
