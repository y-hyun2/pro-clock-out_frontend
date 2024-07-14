import React, { useState, useEffect } from "react";
import Category from "../components/analytics/Category";
import styled from "styled-components";
import Analytics_BarChart from "../components/analytics/Analytics_BarChart";
import HorizontalBarChart from "../components/analytics/HorizontalBarChart";
import LineGraph from "../components/analytics/LineGragh";
import theme from "../styles/theme";
const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 5px;
  position: relative;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: left;
  width: 60px;
  height: 17px;
  margin-left: 2%;
  padding: 7px 20px 10px 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: #7a7ee3;
  color: #fff;
  cursor: pointer;
`;

const WhiteCircle = styled.div`
  width: 17px;
  height: 17px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 5px;
`;

const DropdownText = styled.div`
  flex: 1;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 35px;
  margin-left: 2.25%;
  width: 90px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
`;

const DropdownOption = styled.div`
  padding: 3px;
  text-align: center;
  background-color: ${theme.colors["main-purple"]};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #6a92c3;
  }
`;

const Title = styled.p`
  margin-left: 2%;
  font-weight: bold;
  color: black;
  font-size: 15px;
`;

const TopCategoryContainer = styled.div`
  display: flex;
`;
const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const SynthesisScoreBox = styled.div``;
const SynthesisScore = styled.div`
  width: 320px;
  height: 230px;
  border: 1px gray solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Score = styled.div`
  margin: auto;
  font-size: 50px;
  font-weight: bold;
  margin: 10px 0;
`;
const Percentage = styled.div`
  color: ${theme.colors["main-purple"]};
  font-size: 14px;
`;
const SwitchBox = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;
const SwitchButton = styled.button`
  justify-content: center;
  height: 25px;
  width: 45px;
  border: none;
  border-radius: 7px;
  background-color: ${theme.colors["main-purple"]};
  color: white;
  font-weight: bold;
`;
const DistributionBox = styled.div``;
const LinegraphBox = styled.div`
  border: 0.5px gray solid;
`;

const Analytics = () => {
  const [allChartData, setAllChartData] = useState([]);
  const [period, setPeriod] = useState("주간");
  const [showOptions, setShowOptions] = useState(false);
  const [synthesisdata, setSynthesisdata] = useState([
    { name: "나의 점수", score: 82, fill: "#7A7EE3" },
    { name: "평균 점수", score: 71, fill: "#DADBFF" },
  ]);
  const [horizondata, setHorizondata] = useState([
    { name: "작업", score: 26.7, fill: "#8884d8" },
    { name: "휴식", score: 19.9, fill: "#c6e0ff" },
    { name: "수면", score: 13.0, fill: "#76e1e2" },
    { name: "개인생활", score: 31.2, fill: "#97efb6" },
    { name: "건강", score: 9.12, fill: "#7AA2E3" },
  ]);
  const [linedata, setLinedata] = useState([
    {
      date: "24.03.08",
      value1: 65,
      value2: 35,
      value3: 45,
      value4: 55,
      value5: 60,
    },
    {
      date: "24.03.23",
      value1: 70,
      value2: 38,
      value3: 50,
      value4: 58,
      value5: 65,
    },
    {
      date: "24.04.08",
      value1: 59,
      value2: 48,
      value3: 50,
      value4: 60,
      value5: 55,
    },
    {
      date: "24.04.23",
      value1: 63,
      value2: 45,
      value3: 55,
      value4: 62,
      value5: 58,
    },
    {
      date: "24.05.08",
      value1: 80,
      value2: 40,
      value3: 55,
      value4: 65,
      value5: 70,
    },
    {
      date: "24.05.23",
      value1: 75,
      value2: 50,
      value3: 60,
      value4: 68,
      value5: 75,
    },
    {
      date: "24.06.08",
      value1: 81,
      value2: 56,
      value3: 60,
      value4: 70,
      value5: 78,
    },
    {
      date: "24.06.23",
      value1: 85,
      value2: 60,
      value3: 65,
      value4: 72,
      value5: 80,
    },
    {
      date: "24.07.08",
      value1: 56,
      value2: 68,
      value3: 65,
      value4: 75,
      value5: 85,
    },
  ]);
  const categories = [
    {
      title: "작업",
      score: 82,
      percentage: 17,
      fill: allChartData[0]?.fill,
      data: allChartData.slice(0, 2),
    },
    {
      title: "휴식",
      score: 61,
      percentage: 41,
      fill: allChartData[2]?.fill,
      data: allChartData.slice(2, 4),
    },
    {
      title: "수면",
      score: 40,
      percentage: 63,
      fill: allChartData[4]?.fill,
      data: allChartData.slice(4, 6),
    },
    {
      title: "개인 생활",
      score: 96,
      percentage: 3,
      fill: allChartData[6]?.fill,
      data: allChartData.slice(6, 8),
    },
    {
      title: "건강",
      score: 28,
      percentage: 52,
      fill: allChartData[8]?.fill,
      data: allChartData.slice(8, 10),
    },
  ];
  const [showLineGraph, setShowLineGraph] = useState(false);

  useEffect(() => {
    const data = [
      { name: "나의 점수", score: 90, fill: "#7AA2E3" },
      { name: "평균 점수", score: 75, fill: "#C9DDFD" },
      { name: "나의 점수", score: 61, fill: "#A2A6FF" },
      { name: "평균 점수", score: 50, fill: "#EEEFFF" },
      { name: "나의 점수", score: 40, fill: "#6AD4DD" },
      { name: "평균 점수", score: 72, fill: "#B4F9FF" },
      { name: "나의 점수", score: 96, fill: "#97E7E1" },
      { name: "평균 점수", score: 71, fill: "#CCFFFB" },
      { name: "나의 점수", score: 28, fill: "#F8F6E3" },
      { name: "평균 점수", score: 84, fill: "#FFFEF0" },
    ];
    setAllChartData(data);
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setPeriod(option);
    setShowOptions(false);
  };

  const toggleChart = () => {
    setShowLineGraph(!showLineGraph);
  };

  return (
    <Container>
      <DropdownContainer>
        <DropdownWrapper onClick={toggleOptions}>
          <WhiteCircle />
          <DropdownText>{period}</DropdownText>
        </DropdownWrapper>
        {showOptions && (
          <DropdownOptions>
            <DropdownOption onClick={() => handleOptionClick("일간")}>
              일간
            </DropdownOption>
            <DropdownOption onClick={() => handleOptionClick("주간")}>
              주간
            </DropdownOption>
            <DropdownOption onClick={() => handleOptionClick("월간")}>
              월간
            </DropdownOption>
          </DropdownOptions>
        )}
      </DropdownContainer>
      <Title>항목 별 워라벨 점수</Title>
      <TopCategoryContainer>
        {categories.map((category, index) => (
          <Category key={index} categoryData={category} />
        ))}
      </TopCategoryContainer>

      <BottomCategoryContainer>
        <SynthesisScoreBox>
          <Title>종합 워라벨 점수</Title>
          <SynthesisScore>
            <Score>76점</Score>
            <Percentage>상위 22%</Percentage>
            <Analytics_BarChart data={synthesisdata} />
          </SynthesisScore>
        </SynthesisScoreBox>
        <DistributionBox>
          <SwitchBox>
            <Title>{showLineGraph ? "워라밸 분포" : "항목 별 분포도"}</Title>
            <SwitchButton onClick={toggleChart}>변경</SwitchButton>
          </SwitchBox>
          {showLineGraph ? (
            <LinegraphBox>
              <LineGraph data={linedata} />
            </LinegraphBox>
          ) : (
            <HorizontalBarChart data={horizondata} />
          )}
        </DistributionBox>
      </BottomCategoryContainer>
    </Container>
  );
};

export default Analytics;
