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
import MainSpinner from "../components/analytics/Spinner";
import theme from "../styles/theme";
import axios from "axios";

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
  gap: 1.5rem;
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
  font-size: ${(props) => props.fontSize || "7rem"};
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
  width: 89.9%;
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

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 27.3rem;
`;

const MainSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

  // Popup에서 저장할 때 데이터를 서버에 저장한 후, 최신 데이터를 다시 불러와 반영
  const handlePopupSave = async (score) => {
    setChartdata((prevData) => ({
      ...prevData,
      [popupCategory]: Number(score),
    }));

    // 점수 업데이트 후 서버에 저장하는 API 요청
    try {
      // 서버에서 업데이트된 데이터를 다시 불러옴
      const response = await axios.get(
        "https://www.proclockout.com/api/v1/wolibals/all",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authorization"),
          },
        }
      );

      setData(response.data); // 최신 데이터로 업데이트
    } catch (error) {
      console.error("Error updating score:", error);
    }
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

  const categories = [
    { title: "작업", key: "work_score", avgKey: "work_avg", color: "#7AA2E3" },
    { title: "휴식", key: "rest_score", avgKey: "rest_avg", color: "#A2A6FF" },
    {
      title: "수면",
      key: "sleep_score",
      avgKey: "sleep_avg",
      color: "#76e1e2",
    },
    {
      title: "개인 생활",
      key: "personal_score",
      avgKey: "personal_avg",
      color: "#97efb6",
    },
    {
      title: "건강",
      key: "health_score",
      avgKey: "health_avg",
      color: "#FFFBD4",
    },
  ];

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 API 호출
  // 종합 및 항목별 워라밸 점수 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.proclockout.com/api/v1/wolibals/all",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );
        setData(response.data);
        console.log("데이터 요청 성공!", response);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  //꺾은선그래프 데이터
  const [linedata, setLinedata] = useState({
    total: [],
    work: [],
    rest: [],
    sleep: [],
    personal: [],
    health: [],
  });
  const transformLineData = (data) => {
    return data.map((item) => ({
      date: item.date,
      score: item.score,
    }));
  };

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const response = await axios.get(
          "https://www.proclockout.com/api/v1/wolibals/transitions",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        console.log("꺾은선그래프 데이터 요청 성공!", response);
  
        const transitionData = response.data || {};
  
        // 기존 데이터와 새로운 데이터를 비교
        const newLineData = {
          total: transformLineData(transitionData.total || []),
          work: transformLineData(transitionData.work || []),
          rest: transformLineData(transitionData.rest || []),
          sleep: transformLineData(transitionData.sleep || []),
          personal: transformLineData(transitionData.personal || []),
          health: transformLineData(transitionData.health || []),
        };
  
        // 데이터가 변경되었을 때만 업데이트
        if (JSON.stringify(newLineData) !== JSON.stringify(linedata)) {
          setLinedata(newLineData);
        }
      } catch (err) {
        console.error("Error fetching line data:", err);
        setError(err);
      }
    };
  
    // 데이터 실시간 업데이트를 위한 주기적인 요청
    const intervalId = setInterval(fetchLineData, 1000);
  
    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(intervalId);
  }, [linedata]);  // linedata가 변경될 때마다 실행
  
  if (error) return <div>Error: {error.message}</div>;
  if (!data)
    return (
      <MainSpinnerContainer>
        <MainSpinner />
      </MainSpinnerContainer>
    );

  const workScore = data.work?.score || 0;
  const restScore = data.rest?.score || 0;
  const sleepScore = data.sleep?.score || 0;
  const personalScore = data.personal?.score || 0;
  const healthScore = data.health?.score || 0;

  const highestScore = Math.max(
    workScore,
    restScore,
    sleepScore,
    personalScore,
    healthScore
  );

  // 만약 모든 점수가 0일 경우 대비
  const noScoresEntered = isNaN(highestScore) || highestScore === 0;

  // 항목별 분포도 그래프 데이터
  const horizondata = [
    {
      name: "작업",
      score: noScoresEntered
        ? 0
        : ((workScore / highestScore) * 100).toFixed(1),
      value: 40,
      fill: "#7AA2E3",
    },
    {
      name: "휴식",
      score: noScoresEntered
        ? 0
        : ((restScore / highestScore) * 100).toFixed(1),
      fill: "#A2A6FF",
    },
    {
      name: "수면",
      score: noScoresEntered
        ? 0
        : ((sleepScore / highestScore) * 100).toFixed(1),
      fill: "#76e1e2",
    },
    {
      name: "개인생활",
      score: noScoresEntered
        ? 0
        : ((personalScore / highestScore) * 100).toFixed(1),
      fill: "#97efb6",
    },
    {
      name: "건강",
      score: noScoresEntered
        ? 0
        : ((healthScore / highestScore) * 100).toFixed(1),
      fill: "#FFFBD4",
    },
  ];

  return (
    <Container>
      {/* <DropdownContainer>
        <DropdownWrapper onClick={toggleOptions}>
          <DropdownText>{period}</DropdownText>
          <DropdownIcon>
            <AiFillCaretDown size={24} color="#FFFBD4" />
          </DropdownIcon>
        </DropdownWrapper>
      </DropdownContainer> */}

      <Title>항목별 워라밸 점수</Title>
      <TopCategoryContainer>
        <CategoryWrapper>
          <Category
            categoryData={{
              title: "작업",
              score: data.work?.score,
              percentage: data.work.avg || 0,
              fill: categories[0].color,
              data: [
                {
                  name: "나의 점수",
                  score: data.work.score || 0,
                  fill: categories[0].color,
                },
                {
                  name: "평균 점수",
                  score: data.work.avg || 0,
                  fill: "#C9DDFD",
                },
              ],
            }}
          />
          <InfoButton
            onClick={() => {
              setPopupCategory("work_score");
              setShowPopup(true);
            }}
          >
            정보를 입력해주세요
          </InfoButton>
        </CategoryWrapper>
        <CategoryWrapper>
          <Category
            categoryData={{
              title: "휴식",
              score: data.rest.score || 0,
              percentage: data.rest.avg || 0,
              fill: categories[1].color,
              data: [
                {
                  name: "나의 점수",
                  score: data.rest.score || 0,
                  fill: categories[1].color,
                },
                {
                  name: "평균 점수",
                  score: data.rest.avg || 0,
                  fill: "#C9DDFD",
                },
              ],
            }}
          />
          <InfoButton
            onClick={() => {
              setPopupCategory("rest_score");
              setShowPopup(true);
            }}
          >
            정보를 입력해주세요
          </InfoButton>
        </CategoryWrapper>
        <CategoryWrapper>
          <Category
            categoryData={{
              title: "수면",
              score: data.sleep.score || 0,
              percentage: data.sleep.avg || 0,
              fill: categories[2].color,
              data: [
                {
                  name: "나의 점수",
                  score: data.sleep.score || 0,
                  fill: categories[2].color,
                },
                {
                  name: "평균 점수",
                  score: data.sleep.avg || 0,
                  fill: "#C9DDFD",
                },
              ],
            }}
          />
          <InfoButton
            onClick={() => {
              setPopupCategory("sleep_score");
              setShowPopup(true);
            }}
          >
            정보를 입력해주세요
          </InfoButton>
        </CategoryWrapper>
        <CategoryWrapper>
          <Category
            categoryData={{
              title: "개인생활",
              score: data.personal.score || 0,
              percentage: data.personal.avg || 0,
              fill: categories[3].color,
              data: [
                {
                  name: "나의 점수",
                  score: data.personal.score || 0,
                  fill: categories[3].color,
                },
                {
                  name: "평균 점수",
                  score: data.personal.avg || 0,
                  fill: "#C9DDFD",
                },
              ],
            }}
          />
          <InfoButton
            onClick={() => {
              setPopupCategory("personal_score");
              setShowPopup(true);
            }}
          >
            정보를 입력해주세요
          </InfoButton>
        </CategoryWrapper>
        <CategoryWrapper>
          <Category
            categoryData={{
              title: "건강",
              score: data.health.score || 0,
              percentage: data.health.avg || 0,
              fill: categories[4].color,
              data: [
                {
                  name: "나의 점수",
                  score: data.health.score || 0,
                  fill: categories[4].color,
                },
                {
                  name: "평균 점수",
                  score: data.health.avg || 0,
                  fill: "#C9DDFD",
                },
              ],
            }}
          />
          <InfoButton
            onClick={() => {
              setPopupCategory("health_score");
              setShowPopup(true);
            }}
          >
            정보를 입력해주세요
          </InfoButton>
        </CategoryWrapper>
      </TopCategoryContainer>

      <BottomCategoryContainer>
        <SynthesisScoreBox>
          <Title>종합 워라밸 점수</Title>
          <SynthesisScore>
            {noScoresEntered ? (
              <Score fontSize="3rem">데이터를 입력해주세요</Score>
            ) : (
              <>
                <Score fontSize="7rem">{data.total.score}점</Score>
                <Percentage>상위 {data.total.rank}등</Percentage>
                <Analytics_BarChart
                  data={[
                    {
                      name: "나의 점수",
                      score: data.total.score,
                      fill: "#7A7EE3",
                    },
                    {
                      name: "평균 점수",
                      score: data.total.avg,
                      fill: "#DADBFF",
                    },
                  ]}
                />
              </>
            )}
          </SynthesisScore>
        </SynthesisScoreBox>

        {!noScoresEntered && (
          <DistributionBox>
            <SwitchBox>
              <Title>{showLineGraph ? "워라밸 차트" : "항목 별 분포도"}</Title>
              <SwitchButton onClick={() => setShowLineGraph(!showLineGraph)}>
                변경
              </SwitchButton>
            </SwitchBox>
            {showLineGraph ? (
              <LinegraphBox>
                <LineGraph data={linedata} />
              </LinegraphBox>
            ) : (
              <HorizontalBarChart data={horizondata} />
            )}
          </DistributionBox>
        )}
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
