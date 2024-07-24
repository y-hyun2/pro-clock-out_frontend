import React, { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
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
  width: 80px;
  height: 30px;
  margin-top: 2%;
  margin-left: 2%;
  padding: 5px 15px 10px 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #7a7ee3;
  color: #fff;
  cursor: pointer;
`;

const DropdownText = styled.div`
  flex: 1;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  margin-top: 2px;
`;
const DropdownIcon = styled.div`
  flex: 0.5;
  margin-top: 8px;
  margin-left: 10px;
`;
const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  margin-left: 1.8%;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 120px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1;
  font-size: 30px;
`;

const DropdownOption = styled.div`
  padding: 5px;
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
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TopCategoryContainer = styled.div`
  display: flex;
  padding-bottom: 50px;
`;
const BottomCategoryContainer = styled.div`
  padding-left: 2%;
  display: flex;
  gap: 100px;
  padding-bottom: 50px;
`;
const SynthesisScoreBox = styled.div``;
const SynthesisScore = styled.div`
  width: 450px;
  height: 370px;
  border: 1px gray solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Score = styled.div`
  margin: auto;
  font-size: 110px;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
`;
const Percentage = styled.div`
  color: ${theme.colors["main-purple"]};
  font-size: 35px;
  margin: 0;
`;
const SwitchBox = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  padding-bottom: 10px;
`;
const SwitchButton = styled.button`
  justify-content: center;
  height: 45px;
  width: 80px;
  border: none;
  border-radius: 10px;
  background-color: ${theme.colors["main-purple"]};
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
const DistributionBox = styled.div``;
const LinegraphBox = styled.div`
  border: 0.5px gray solid;
`;

function Analytics() {
  const [chartdata, setChartdata] = useState({
    member_id: 1,
    work_score: 82,
    work_rank: 17,
    work_avg: 71,
    rest_score: 61,
    rest_rank: 41,
    rest_avg: 50,
    sleep_score: 40,
    sleep_rank: 63,
    sleep_avg: 72,
    personal_score: 96,
    personal_rank: 3,
    personal_avg: 71,
    health_score: 28,
    health_rank: 52,
    health_avg: 84,
  });

  const [period, setPeriod] = useState("주간");
  const [showOptions, setShowOptions] = useState(false);

  const categories = [
    {
      title: "작업",
      score: chartdata.work_score,
      percentage: chartdata.work_rank,
      fill: "#7AA2E3",
      data: [
        { name: "나의 점수", score: chartdata.work_score, fill: "#7AA2E3" },
        { name: "평균 점수", score: chartdata.work_avg, fill: "#C9DDFD" },
      ],
    },

    {
      title: "휴식",
      score: chartdata.rest_score,
      percentage: chartdata.rest_rank,
      fill: "#A2A6FF",
      data: [
        { name: "나의 점수", score: chartdata.rest_score, fill: "#A2A6FF" },
        { name: "평균 점수", score: chartdata.rest_avg, fill: "#EEEFFF" },
      ],
    },
    {
      title: "수면",
      score: chartdata.sleep_score,
      percentage: chartdata.sleep_rank,
      fill: "#6AD4DD",
      data: [
        { name: "나의 점수", score: chartdata.sleep_score, fill: "#6AD4DD" },
        { name: "평균 점수", score: chartdata.sleep_avg, fill: "#B4F9FF" },
      ],
    },
    {
      title: "개인 생활",
      score: chartdata.personal_score,
      percentage: chartdata.personal_rank,
      fill: "#97E7E1",
      data: [
        { name: "나의 점수", score: chartdata.personal_score, fill: "#97E7E1" },
        { name: "평균 점수", score: chartdata.personal_avg, fill: "#CCFFFB" },
      ],
    },
    {
      title: "건강",
      score: chartdata.health_score,
      percentage: chartdata.health_rank,
      fill: "#F8F6E3",
      data: [
        { name: "나의 점수", score: chartdata.health_score, fill: "#F8F6E3" },
        { name: "평균 점수", score: chartdata.health_avg, fill: "#FFFEF0" },
      ],
    },
  ];
  const total_my_score =
    chartdata.work_score +
    chartdata.rest_score +
    chartdata.sleep_score +
    chartdata.personal_score +
    chartdata.health_score;

  const [synthesisdata, setSynthesisdata] = useState([
    {
      name: "나의 점수",
      score: Math.round(total_my_score / 5),
      fill: "#7A7EE3",
    },
    { name: "평균 점수", score: 71, fill: "#DADBFF" },
  ]);

  const horizondata = [
    {
      name: "작업",
      score: Number(((chartdata.work_score / total_my_score) * 100).toFixed(1)),
      fill: "#8884d8",
    },
    {
      name: "휴식",
      score: Number(((chartdata.rest_score / total_my_score) * 100).toFixed(1)),
      fill: "#c6e0ff",
    },
    {
      name: "수면",
      score: Number(
        ((chartdata.sleep_score / total_my_score) * 100).toFixed(1)
      ),
      fill: "#76e1e2",
    },
    {
      name: "개인생활",
      score: Number(
        ((chartdata.personal_score / total_my_score) * 100).toFixed(1)
      ),
      fill: "#97efb6",
    },
    {
      name: "건강",
      score: Number(
        ((chartdata.health_score / total_my_score) * 100).toFixed(1)
      ),
      fill: "#FFFBD4",
    },
  ];
  const [linedata, setLinedata] = useState({
    total: [
      { "2024-07-08": 8 },
      { "2024-07-01": 7 },
      { "2024-06-24": 6 },
      { "2024-06-17": 5 },
      { "2024-06-10": 6 },
      { "2024-06-03": 7 },
      { "2024-05-27": 8 },
      { "2024-05-20": 2 },
      { "2024-05-13": 3 },
      { "2024-05-06": 5 },
    ],
    work: [
      { "2024-07-08": 88 },
      { "2024-07-01": 68 },
      { "2024-06-24": 65 },
      { "2024-06-17": 25 },
      { "2024-06-10": 46 },
      { "2024-06-03": 72 },
      { "2024-05-27": 83 },
      { "2024-05-20": 92 },
      { "2024-05-13": 93 },
      { "2024-05-06": 70 },
    ],
    rest: [
      { "2024-07-08": 20 },
      { "2024-07-01": 72 },
      { "2024-06-24": 21 },
      { "2024-06-17": 55 },
      { "2024-06-10": 56 },
      { "2024-06-03": 72 },
      { "2024-05-27": 85 },
      { "2024-05-20": 52 },
      { "2024-05-13": 53 },
      { "2024-05-06": 55 },
    ],
    sleep: [
      { "2024-07-08": 40 },
      { "2024-07-01": 74 },
      { "2024-06-24": 64 },
      { "2024-06-17": 45 },
      { "2024-06-10": 66 },
      { "2024-06-03": 44 },
      { "2024-05-27": 84 },
      { "2024-05-20": 42 },
      { "2024-05-13": 93 },
      { "2024-05-06": 25 },
    ],
    personal: [
      { "2024-07-08": 82 },
      { "2024-07-01": 28 },
      { "2024-06-24": 61 },
      { "2024-06-17": 75 },
      { "2024-06-10": 62 },
      { "2024-06-03": 72 },
      { "2024-05-27": 87 },
      { "2024-05-20": 72 },
      { "2024-05-13": 73 },
      { "2024-05-06": 72 },
    ],
    health: [
      { "2024-07-08": 20 },
      { "2024-07-01": 55 },
      { "2024-06-24": 41 },
      { "2024-06-17": 35 },
      { "2024-06-10": 46 },
      { "2024-06-03": 32 },
      { "2024-05-27": 51 },
      { "2024-05-20": 32 },
      { "2024-05-13": 33 },
      { "2024-05-06": 55 },
    ],
  });
  const [showLineGraph, setShowLineGraph] = useState(false);

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
          <DropdownText>{period}</DropdownText>
          <DropdownIcon>
            <AiFillCaretDown size={20} color="#FFFBD4" />
          </DropdownIcon>
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
            <Score>{Math.round(total_my_score / 5)}점</Score>
            <Percentage>상위 22%</Percentage>
            <Analytics_BarChart data={synthesisdata} />
          </SynthesisScore>
        </SynthesisScoreBox>
        <DistributionBox>
          <SwitchBox>
            <Title>{showLineGraph ? "워라밸 차트" : "항목 별 분포도"}</Title>
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
}

export default Analytics;
