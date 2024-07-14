import React from "react";
import Analytics_BarChart from "./Analytics_BarChart";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  border: 1px gray solid;
  border-radius: 10px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  margin: 10px;
`;

const Header = styled.div`
  background-color: ${(props) => props.fill};
  color: black;
  font-weight: 800;
  padding: 10px 0;
  font-size: 18px;
`;

const Score = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;
`;

const Percentage = styled.div`
  color: ${(props) => props.fill};
  font-size: 14px;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

function Category({ categoryData }) {
  const { title, data, score, percentage, fill } = categoryData;

  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 2));
  }

  return (
    <Container>
      <Header fill={fill}>{title}</Header>
      <Score>{score}점</Score>
      <Percentage fill={fill}>상위 {percentage}%</Percentage>
      <ChartsContainer>
        {chunkedData.map((dataSet, index) => (
          <Analytics_BarChart key={index} data={dataSet} />
        ))}
      </ChartsContainer>
    </Container>
  );
}

export default Category;
