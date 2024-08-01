import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Category from "../components/analytics/Category";
import styled from "styled-components";
import Analytics_BarChart from "../components/analytics/Analytics_BarChart";
import HorizontalBarChart from "../components/analytics/HorizontalBarChart";
import LineGraph from "../components/analytics/LineGraph";
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
  height: 30rem;
  width: 100%;
  padding-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
`;

const BottomCategoryContainer = styled.div`
  padding-left: 2%;
  display: flex;
  gap: 100px;
  width: 100%;
  height: 35rem;
  margin-left: 14rem;
  margin-top: 4rem;
`;

const SynthesisScoreBox = styled.div`
  width: 600px;
`;

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

const InfoButton = styled.button`
  width: 90%;
  height: 50px;
  background-color: lightgray;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: 2.8rem;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

//정보 입력 팝업
const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 60rem;
  height: 40rem;
`;

const PopupTitle = styled.h3`
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const PopupButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.colors["main-purple"]};
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

// Main component
function Analytics() {
  const [chartdata, setChartdata] = useState({
    work_score: null,
    rest_score: null,
    sleep_score: null,
    personal_score: null,
    health_score: null,
  });

  const [period, setPeriod] = useState("일간");
  const [showOptions, setShowOptions] = useState(false);
  const [showLineGraph, setShowLineGraph] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupCategory, setPopupCategory] = useState(null);

  const handleInputChange = (e) => {
    setChartdata({
      ...chartdata,
      [popupCategory]: Number(e.target.value),
    });
  };

  const handlePopupSubmit = () => {
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

  const isDataComplete = Object.values(chartdata).every(value => value !== null);

  const categories = [
    { title: "작업", key: "work_score", color: "#7AA2E3" },
    { title: "휴식", key: "rest_score", color: "#A2A6FF" },
    { title: "수면", key: "sleep_score", color: "#76e1e2" },
    { title: "개인 생활", key: "personal_score", color: "#97efb6" },
    { title: "건강", key: "health_score", color: "#FFFBD4" }
  ];

  const total_my_score = Object.values(chartdata).reduce((sum, score) => sum + (score || 0), 0);

  const horizondata = [
    { name: "작업", score: Number(((chartdata.work_score / total_my_score) * 100).toFixed(1)), fill: "#7AA2E3" },
    { name: "휴식", score: Number(((chartdata.rest_score / total_my_score) * 100).toFixed(1)), fill: "#A2A6FF" },
    { name: "수면", score: Number(((chartdata.sleep_score / total_my_score) * 100).toFixed(1)), fill: "#76e1e2" },
    { name: "개인생활", score: Number(((chartdata.personal_score / total_my_score) * 100).toFixed(1)), fill: "#97efb6" },
    { name: "건강", score: Number(((chartdata.health_score / total_my_score) * 100).toFixed(1)), fill: "#FFFBD4" },
  ];

  const linedata = {
    // Example data
    total: [{ "2024-07-08": 8 }, { "2024-07-01": 7 }, { "2024-06-24": 6 }, { "2024-06-17": 5 }, { "2024-06-10": 6 }],
    work: [{ "2024-07-08": 88 }, { "2024-07-01": 68 }, { "2024-06-24": 65 }, { "2024-06-17": 25 }, { "2024-06-10": 46 }],
    rest: [{ "2024-07-08": 20 }, { "2024-07-01": 72 }, { "2024-06-24": 21 }, { "2024-06-17": 55 }, { "2024-06-10": 56 }],
    sleep: [{ "2024-07-08": 40 }, { "2024-07-01": 74 }, { "2024-06-24": 64 }, { "2024-06-17": 45 }, { "2024-06-10": 66 }],
    personal: [{ "2024-07-08": 82 }, { "2024-07-01": 28 }, { "2024-06-24": 61 }, { "2024-06-17": 75 }, { "2024-06-10": 62 }],
    health: [{ "2024-07-08": 20 }, { "2024-07-01": 55 }, { "2024-06-24": 41 }, { "2024-06-17": 35 }, { "2024-06-10": 46 }],
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
            <DropdownOption onClick={() => handleOptionClick("일간")}>일간</DropdownOption>
            <DropdownOption onClick={() => handleOptionClick("주간")}>주간</DropdownOption>
            <DropdownOption onClick={() => handleOptionClick("월간")}>월간</DropdownOption>
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
                  { name: "나의 점수", score: chartdata[category.key] || 0, fill: category.color },
                  { name: "평균 점수", score: chartdata[category.key] || 0, fill: "#C9DDFD" },
                ],
              }}
            />
            {chartdata[category.key] === null && (
              <InfoButton onClick={() => { setPopupCategory(category.key); setShowPopup(true); }}>
                정보를 입력해주세요
              </InfoButton>
            )}
          </div>
        ))}
      </TopCategoryContainer>

      <BottomCategoryContainer>
        <SynthesisScoreBox>
          <Title>종합 워라벨 점수</Title>
          {isDataComplete ? (
            <SynthesisScore>
              <Score>{total_my_score}점</Score>
              <Percentage>상위 {Math.floor(Math.random() * 100)}%</Percentage>
              <Analytics_BarChart data={[
                { name: "나의 점수", score: total_my_score, fill: "#7A7EE3" },
                { name: "평균 점수", score: 50, fill: "#DADBFF" },
              ]} />
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

      {showPopup && (
        <PopupContainer>
          <Popup>
            <PopupTitle>데이터를 입력해주세요</PopupTitle>
            <Input type="number" min="0" max="100" onChange={handleInputChange} />
            <PopupButton onClick={handlePopupSubmit}>제출</PopupButton>
          </Popup>
        </PopupContainer>
      )}
    </Container>
  );
}

export default Analytics;
