import React, { useState } from "react";
import FootPrint from "../components/daily/FootPrint";
import Date from "../components/daily/Date";
import styled from "styled-components";
import RatingFormContainer from "../components/daily/RatingFormContainer";
import Diary from "../components/daily/Diary";
import GoalListContainer from "../components/daily/GoalListContainer";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  padding: 20px;
  padding-right: 80px;
  padding-left: 80px;
  position: relative; /* 필요 시 상대 위치 설정 */
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  pointer-events: ${(props) => (props.isLocked ? "none" : "auto")};
`;

const SaveButton = styled.button`
  z-index: 1;
  margin-top: 13rem;
  margin-left: 88.3rem;
  padding: 10px 20px;
  height: 40px;
  width: 140px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isLocked ? "not-allowed" : "pointer")};
  background-color: ${(props) =>
    props.isLocked
      ? "#cccccc"
      : props.isEditing
      ? "#7a7ee3"
      : "#cccccc"}; /* isLocked에 따라 회색 또는 보라색으로 설정 */
  pointer-events: auto; /* 항상 클릭 가능 */

  &:hover {
    background-color: ${(props) =>
      props.isLocked ? "#cccccc" : props.isEditing ? "#6a6fc3" : "#696969"};
  }

  &:active {
    background-color: ${(props) =>
      props.isLocked ? "#cccccc" : props.isEditing ? "#5a5fc3" : "#696969"};
  }
`;

const categoryColors = {
  작업: "#7AA2E3",
  휴식: "#A2A6FF",
  개인생활: "#97E7E1",
  수면: "#6AD4DD",
  건강: "#F2E88E",
  기타: "#696969",
};

const Daily = () => {
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [savedData, setSavedData] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryImage, setDiaryImage] = useState("");
  const [ratings, setRatings] = useState({
    작업: null,
    휴식: null,
    개인생활: null,
    수면: null,
    건강: null,
  });
  const [goals, setGoals] = useState([]);
  const [isLocked, setIsLocked] = useState(false); // 화면 잠금을 위한 상태
  const [isEditing, setIsEditing] = useState(true); // 수정 모드 상태

  const handleCheckboxChange = (goal) => {
    if (!isLocked) {
      setCheckedGoals((prevGoals) =>
        prevGoals.includes(goal)
          ? prevGoals.filter((g) => g !== goal)
          : [...prevGoals, goal]
      );
    }
  };
  const handleRatingChange = (part, rating) => {
    if (!isLocked) {
      setRatings((prevRatings) => ({ ...prevRatings, [part]: rating }));
    }
  };

  const handleSave = async () => {
    const dataToSave = {
      request: {
        date: currentDate,
        workSatisfaction: ratings["작업"],
        restSatisfaction: ratings["휴식"],
        sleepSatisfaction: ratings["수면"],
        personalSatisfaction: ratings["개인생활"],
        healthSatisfaction: ratings["건강"],
        content: diaryContent,
        image_url: diaryImage,
        completed_goals: checkedGoals,
      },
    };

    try {
      const response = await axios.post(
        "https://www.proclockout.com/api/v1/daily",
        dataToSave,
        {
          headers: {
            authorization: localStorage.getItem("authorization"), // 토큰 추가
          },
        }
      );
      if (response.status === 200) {
        setSavedData((prevData) => ({
          ...prevData,
          [currentDate]: dataToSave.request,
        }));
        setIsLocked(true); // 저장 후 화면 잠금
        setIsEditing(false); // 저장 후 수정 모드 해제
        alert("저장되었습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleEdit = async (dailyId) => {
    const dataToEdit = {
      date: currentDate,
      workSatisfaction: ratings["작업"],
      restSatisfaction: ratings["휴식"],
      sleepSatisfaction: ratings["수면"],
      personalSatisfaction: ratings["개인생활"],
      healthSatisfaction: ratings["건강"],
      content: diaryContent,
      image_url: diaryImage,
      completed_goals: checkedGoals,
    };

    try {
      const response = await axios.put(
        `https://www.proclockout.com/api/v1/daily/${dailyId}`,
        dataToEdit,
        {
          headers: {
            authorization: localStorage.getItem("authorization"), // 토큰 추가
          },
        }
      );
      if (response.status === 200) {
        setSavedData((prevData) => ({
          ...prevData,
          [currentDate]: dataToEdit,
        }));
        setIsLocked(false); // 수정 시작
        setIsEditing(true); // 수정 모드로 전환
        alert("수정되었습니다.");
      }
    } catch (error) {
      console.error("수정 중 오류가 발생했습니다:", error);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDateSelect = (date) => {
    if (savedData[date]) {
      const data = savedData[date];
      setCurrentDate(date);
      setDiaryContent(data.content);
      setDiaryImage(data.image_url);
      setCheckedGoals(data.completed_goals);
      setRatings({
        작업: data.workSatisfaction,
        휴식: data.restSatisfaction,
        개인생활: data.personalSatisfaction,
        수면: data.sleepSatisfaction,
        건강: data.healthSatisfaction,
      });
      setIsLocked(true); // 데이터가 있는 경우 화면 잠금
      setIsEditing(false); // 수정 모드 해제
    } else {
      setCurrentDate(date);
      setDiaryContent("");
      setDiaryImage("");
      setCheckedGoals([]);
      setRatings({
        작업: null,
        휴식: null,
        개인생활: null,
        수면: null,
        건강: null,
      });
      setIsLocked(false); // 새로운 날짜 선택 시 화면 잠금 해제
      setIsEditing(false); // 수정 모드 해제
    }
  };

  const handleAddGoal = (newGoal) => {
    if (!isLocked) {
      setGoals((prevGoals) => [...prevGoals, newGoal]);
    }
  };

  const handleEditGoal = (updatedGoal) => {
    if (!isLocked) {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal === updatedGoal ? updatedGoal : goal))
      );
    }
  };

  const handleDeleteGoal = (goalToDelete) => {
    if (!isLocked) {
      setGoals((prevGoals) =>
        prevGoals.filter((goal) => goal !== goalToDelete)
      );
      setCheckedGoals((prevCheckedGoals) =>
        prevCheckedGoals.filter((goal) => goal !== goalToDelete)
      );
    }
  };

  return (
    <PageContainer>
      <FootPrint onDateSelect={handleDateSelect} />
      <RightContainer isLocked={isLocked}>
        <Diary
          checkedGoals={checkedGoals}
          goals={checkedGoals}
          categoryColors={categoryColors}
          content={diaryContent}
          setContent={setDiaryContent}
          image={diaryImage}
          setImage={setDiaryImage}
        />
        <SaveButton
          onClick={isEditing ? handleSave : handleEdit}
          isEditing={isEditing}
        >
          {isLocked ? "수정" : "저장"}
        </SaveButton>
      </RightContainer>

      <Date setDate={setCurrentDate} />
      <RatingFormContainer
        onRatingChange={handleRatingChange}
        isLocked={isLocked}
      />
      <GoalListContainer
        categoryColors={categoryColors}
        onCheckboxChange={handleCheckboxChange}
        onAddGoal={handleAddGoal}
        onEditGoal={handleEditGoal}
        onDeleteGoal={handleDeleteGoal}
        goals={goals}
        isLocked={isLocked}
      />
    </PageContainer>
  );
};

export default Daily;
