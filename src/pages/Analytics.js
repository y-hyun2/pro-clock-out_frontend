import React, { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Category from "../components/analytics/Category";
import styled from "styled-components";
import Analytics_BarChart from "../components/analytics/Analytics_BarChart";
import HorizontalBarChart from "../components/analytics/HorizontalBarChart";
import LineGraph from "../components/analytics/LineGraph";
import TaskPopup from "../components/analytics/popup/TaskPopup";
import RestPopup from "../components/analytics/popup/RestPopup";
import SleepPopup from "../components/analytics/popup/SleepPopup";
import PersonalPopup from "../components/analytics/popup/PersonalPopup";
import HealthPopup from "../components/analytics/popup/HealthPopup";
import theme from "../styles/theme";

const Container = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  min-height: 100vh;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  position: relative;
`;

//일간, 주간, 월간 Selector Wrapper
const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 7.7rem;
  height: 40px;
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #7a7ee3;
  color: #fff;
  cursor: pointer;
  position: relative;
`;

const DropdownText = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: bold;
`;

const DropdownIcon = styled.div`
  margin-left: 12px;
`;

const DropdownOptions = styled.div`
  width: 4rem;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 140px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  z-index: 10;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownOption = styled.div`
  padding: 10px;
  text-align: center;
  background-color: ${theme.colors["main-purple"]};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #6a92c3;
  }
`;

const Title = styled.p`
  margin: 20px 0;
  font-weight: bold;
  color: black;
  font-size: 40px;
`;

const TopCategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding-bottom: 60px;
`;

const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  height: 40rem;
  margin-top: 5rem;
`;

const SynthesisScoreBox = styled.div`
  width: 700px;
`;

const SynthesisScore = styled.div`
  width: 500px;
  height: 400px;
  border: 1px gray solid;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Score = styled.div`
  font-size: 120px;
  font-weight: bold;
  margin: 10px 0 5px 0;
`;

const Percentage = styled.div`
  color: ${theme.colors["main-purple"]};
  font-size: 36px;
  margin: 0;
`;

const SwitchBox = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  padding-bottom: 15px;
`;

const SwitchButton = styled.button`
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 12px;
  background-color: ${theme.colors["main-purple"]};
  color: white;
  font-weight: bold;
  font-size: 28px;
  cursor: pointer;
`;

const DistributionBox = styled.div``;

const LinegraphBox = styled.div`
  border: 1px gray solid;
`;

const InfoButton = styled.button`
  width: 90%;
  height: 60px;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

// Main component
function Analytics() {
  const [chartdata, setChartdata] = useState({
    work_score: null,
    work_avg: null,
    rest_score: null,
    rest_avg: null,
    sleep_score: null,
    sleep_avg: null,
    personal_score: null,
    personal_avg: null,
    health_score: null,
    health_avg: null,
  });

  const [period, setPeriod] = useState("일간");
  const [showOptions, setShowOptions] = useState(false);
  const [showLineGraph, setShowLineGraph] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupCategory, setPopupCategory] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proclockout.web.app/analytics"
        );
        const data = await response.json();
        setChartdata({
          work_score: data.work_score,
          work_avg: data.work_avg,
          rest_score: data.rest_score,
          rest_avg: data.rest_avg,
          sleep_score: data.sleep_score,
          sleep_avg: data.sleep_avg,
          personal_score: data.personal_score,
          personal_avg: data.personal_avg,
          health_score: data.health_score,
          health_avg: data.health_avg,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  const handlePopupSave = (score) => {
    setChartdata((prevData) => ({
      ...prevData,
      [popupCategory]: Number(score),
    }));
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

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

  const isDataComplete = Object.values(chartdata).every(
    (value) => value !== null
  );

  const categories = [
    { title: "작업", key: "work_score", avgKey: "work_avg", color: "#7AA2E3" },
    { title: "휴식", key: "rest_score", avgKey: "rest_avg", color: "#A2A6FF" },
    { title: "수면", key: "sleep_score", avgKey: "sleep_avg", color: "#76e1e2" },
    {
      title: "개인 생활",
      key: "personal_score",
      avgKey: "personal_avg",
      color: "#97efb6",
    },
    { title: "건강", key: "health_score", avgKey: "health_avg", color: "#FFFBD4" },
  ];

  const total_my_score = Object.values(chartdata).reduce(
    (sum, score) => sum + (score || 0),
    0
  );

  const horizondata = [
    {
      name: "작업",
      score: Number(((chartdata.work_score / total_my_score) * 100).toFixed(1)),
      fill: "#7AA2E3",
    },
    {
      name: "휴식",
      score: Number(((chartdata.rest_score / total_my_score) * 100).toFixed(1)),
      fill: "#A2A6FF",
    },
    {
      name: "수면",
      score: Number(((chartdata.sleep_score / total_my_score) * 100).toFixed(1)),
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

  const linedata = {
    // Example data
    total: [
      { "2024-07-08": 8 },
      { "2024-07-01": 7 },
      { "2024-06-24": 6 },
      { "2024-06-17": 5 },
      { "2024-06-10": 6 },
    ],
    work: [
      { "2024-07-08": 88 },
      { "2024-07-01": 68 },
      { "2024-06-24": 65 },
      { "2024-06-17": 25 },
      { "2024-06-10": 46 },
    ],
    rest: [
      { "2024-07-08": 20 },
      { "2024-07-01": 72 },
      { "2024-06-24": 21 },
      { "2024-06-17": 55 },
      { "2024-06-10": 56 },
    ],
    sleep: [
      { "2024-07-08": 40 },
      { "2024-07-01": 74 },
      { "2024-06-24": 64 },
      { "2024-06-17": 45 },
      { "2024-06-10": 66 },
    ],
    personal: [
      { "2024-07-08": 82 },
      { "2024-07-01": 28 },
      { "2024-06-24": 61 },
      { "2024-06-17": 75 },
      { "2024-06-10": 62 },
    ],
    health: [
      { "2024-07-08": 20 },
      { "2024-07-01": 55 },
      { "2024-06-24": 41 },
      { "2024-06-17": 35 },
      { "2024-06-10": 46 },
    ],
  };

  return (
    <Container>
      <DropdownContainer>
        <DropdownWrapper onClick={toggleOptions}>
          <DropdownText>{period}</DropdownText>
          <DropdownIcon>
            <AiFillCaretDown size={24} color="#FFFBD4" />
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

      <Title>항목별 워라벨 점수</Title>
      <TopCategoryContainer>
        {categories.map((category) => (
          <div key={category.key}>
            <Category
              categoryData={{
                title: category.title,
                score: chartdata[category.key] || 0,
                percentage: chartdata[category.key] || 0,
                fill: category.color,
                data: [
                  {
                    name: "나의 점수",
                    score: chartdata[category.key] || 0,
                    fill: category.color,
                  },
                  {
                    name: "평균 점수",
                    score: chartdata[category.avgKey] || 0,
                    fill: "#C9DDFD",
                  },
                ],
              }}
            />
            <InfoButton
              onClick={() => {
                setPopupCategory(category.key);
                setShowPopup(true);
              }}
            >
              {isDataComplete ? "정보 수정하기" : "정보를 입력해주세요"}
            </InfoButton>
          </div>
        ))}
      </TopCategoryContainer>

      <BottomCategoryContainer>
        <SynthesisScoreBox>
          <Title>종합 워라밸 점수</Title>
          {isDataComplete ? (
            <SynthesisScore>
              <Score>{total_my_score}점</Score>
              <Percentage>상위 {Math.floor(Math.random() * 100)}%</Percentage>
              <Analytics_BarChart
                data={[
                  { name: "나의 점수", score: total_my_score, fill: "#7A7EE3" },
                  { name: "평균 점수", score: 50, fill: "#DADBFF" },
                ]}
              />
            </SynthesisScore>
          ) : (
            <Title>모든 항목의 데이터를 입력해주세요</Title>
          )}
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

      {showPopup && popupCategory === "work_score" && (
        <TaskPopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
      {showPopup && popupCategory === "rest_score" && (
        <RestPopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
      {showPopup && popupCategory === "sleep_score" && (
        <SleepPopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
      {showPopup && popupCategory === "personal_score" && (
        <PersonalPopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
      {showPopup && popupCategory === "health_score" && (
        <HealthPopup onClose={handlePopupClose} onSave={handlePopupSave} />
      )}
    </Container>
  );
}

export default Analytics;
