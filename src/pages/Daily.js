import React, { useState, useEffect } from "react";
import FootPrint from "../components/daily/FootPrint";
import Date from "../components/daily/Date";
import styled from "styled-components";
import RatingFormContainer from "../components/daily/RatingFormContainer";
import Diary from "../components/daily/Diary";
import GoalListContainer from "../components/daily/GoalListContainer";
import axios from "axios";
import fetchGoals from "../components/daily/api/fetchGoals";

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
  category: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isLocked ? "not-allowed" : "pointer")};
  background-category: ${(props) =>
    props.isLocked
      ? "#cccccc"
      : props.isEditing
      ? "#7a7ee3"
      : "#cccccc"}; /* isLocked에 따라 회색 또는 보라색으로 설정 */
  pointer-events: auto; /* 항상 클릭 가능 */

  &:hover {
    background-category: ${(props) =>
      props.isLocked ? "#cccccc" : props.isEditing ? "#6a6fc3" : "#696969"};
  }

  &:active {
    background-category: ${(props) =>
      props.isLocked ? "#cccccc" : props.isEditing ? "#5a5fc3" : "#696969"};
  }
`;

const categorycategorys = {
  작업: "#7AA2E3",
  휴식: "#A2A6FF",
  개인생활: "#97E7E1",
  수면: "#6AD4DD",
  건강: "#F2E88E",
  기타: "#696969",
};
console.log(categorycategorys.작업);

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

  const loadGoals = async () => {
    try {
      const goalsData = await fetchGoals();
      setGoals(goalsData);
    } catch (error) {
      console.error("목표활동을 로드하는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

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
    try {
      // 이미지 업로드
      let imageUrl = null;
      if (diaryImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", diaryImage);

        const imageResponse = await axios.post(
          "https://www.proclockout.com//api/v1/daily/image", // 서버의 이미지 업로드 엔드포인트
          imageFormData,
          {
            headers: {
              Authorization: localStorage.getItem("authorization"),
              // Content-Type은 axios가 자동으로 설정합니다.
            },
          }
        );

        if (imageResponse.status === 200) {
          imageUrl = imageResponse.data.imageUrl; // 서버가 반환하는 이미지 URL에 맞춰 수정
        } else {
          throw new Error("이미지 업로드에 실패했습니다.");
        }
      }

      // JSON 데이터 업로드
      const jsonData = {
        date: currentDate,
        workSatisfaction: ratings["작업"],
        restSatisfaction: ratings["휴식"],
        sleepSatisfaction: ratings["수면"],
        personalSatisfaction: ratings["개인생활"],
        healthSatisfaction: ratings["건강"],
        content: diaryContent,
        completed_goals: checkedGoals,
      };

      const jsonResponse = await axios.post(
        "https://www.proclockout.com/api/v1/daily",
        { request: jsonData }, // JSON 데이터는 객체 형태로 감싸서 전송
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
            "Content-Type": "application/json",
          },
        }
      );

      if (jsonResponse.status === 200) {
        setSavedData((prevData) => ({
          ...prevData,
          [currentDate]: jsonData,
        }));
        setIsLocked(true);
        setIsEditing(false);
        alert("저장되었습니다.");
      } else {
        throw new Error("데이터 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류가 발생했습니다:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // const handleSave = () => {
  //   const dataToSave = {
  //     date: currentDate,
  //     workSatisfaction: ratings["작업"],
  //     restSatisfaction: ratings["휴식"],
  //     sleepSatisfaction: ratings["수면"],
  //     personalSatisfaction: ratings["개인생활"],
  //     healthSatisfaction: ratings["건강"],
  //     content: diaryContent,
  //     image_url: diaryImage,
  //     completed_goals: checkedGoals,
  //   };

  //   setSavedData((prevData) => ({ ...prevData, [currentDate]: dataToSave }));
  //   setIsLocked(true); // 저장 후 화면 잠금
  //   setIsEditing(false); // 저장 후 수정 모드 해제
  //   alert("저장되었습니다.");
  // };

  // const handleEdit = () => {
  //   setIsLocked(false); // 수정 시작
  //   setIsEditing(true); // 수정 모드로 전환
  // };

  // const handleSave = async () => {
  //   const formData = new FormData();

  //   const jsonRequest = JSON.stringify({
  //     date: currentDate,
  //     workSatisfaction: ratings["작업"],
  //     restSatisfaction: ratings["휴식"],
  //     sleepSatisfaction: ratings["수면"],
  //     personalSatisfaction: ratings["개인생활"],
  //     healthSatisfaction: ratings["건강"],
  //     content: diaryContent,
  //     completed_goals: checkedGoals,
  //   });

  //   formData.append("request", jsonRequest);

  //   if (diaryImage) {
  //     formData.append("file", diaryImage);
  //   }

  //   // FormData의 내용을 콘솔에 출력
  //   for (let pair of formData.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
  //   console.log(localStorage.getItem("authorization"));

  //   try {
  //     const response = await axios.post(
  //       "https://www.proclockout.com/api/v1/daily",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem("authorization")}`,
  //           // `Content-Type` 헤더는 설정하지 않음
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setSavedData((prevData) => ({
  //         ...prevData,
  //         [currentDate]: JSON.parse(jsonRequest),
  //       }));
  //       setIsLocked(true);
  //       setIsEditing(false);
  //       alert("저장되었습니다.");
  //     }
  //   } catch (error) {
  //     console.error("저장 중 오류가 발생했습니다:", error);
  //     alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };
  const handleEdit = async (dailyId) => {
    try {
      // // 이미지 업로드
      // let imageUrl = null;
      // if (diaryImage) {
      //   const imageFormData = new FormData();
      //   imageFormData.append("file", diaryImage);

      //   const imageResponse = await axios.put(
      //     `https://www.proclockout.com/api/v1/daily/image`, // 서버의 이미지 업로드 엔드포인트
      //     imageFormData,
      //     {
      //       headers: {
      //         Authorization: localStorage.getItem("authorization"),
      //         // Content-Type은 axios가 자동으로 설정합니다.
      //       },
      //     }
      //   );

      //   if (imageResponse.status === 200) {
      //     imageUrl = imageResponse.data.imageUrl; // 서버가 반환하는 이미지 URL에 맞춰 수정
      //   } else {
      //     throw new Error("이미지 업로드에 실패했습니다.");
      //   }
      // }

      // JSON 데이터 업로드
      const jsonData = {
        date: currentDate,
        workSatisfaction: ratings["작업"],
        restSatisfaction: ratings["휴식"],
        sleepSatisfaction: ratings["수면"],
        personalSatisfaction: ratings["개인생활"],
        healthSatisfaction: ratings["건강"],
        content: diaryContent,
        completed_goals: checkedGoals,
      };

      const jsonResponse = await axios.put(
        `https://www.proclockout.com/api/v1/daily/${dailyId}`,
        jsonData,
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("JSON Data:", jsonData); // JSON 데이터를 콘솔에 출력

      if (jsonResponse.status === 200) {
        setSavedData((prevData) => ({
          ...prevData,
          [currentDate]: jsonData,
        }));
        setIsLocked(false); // 수정 후 화면 잠금
        setIsEditing(true); // 수정 후 수정 모드 해제
        alert("수정되었습니다.");
      } else {
        throw new Error("데이터 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("수정 중 오류가 발생했습니다:", error);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  //   const formData = new FormData();

  //   // JSON 데이터 추가
  //   formData.append(
  //     "request",
  //     JSON.stringify({
  //       date: currentDate,
  //       workSatisfaction: ratings["작업"],
  //       restSatisfaction: ratings["휴식"],
  //       sleepSatisfaction: ratings["수면"],
  //       personalSatisfaction: ratings["개인생활"],
  //       healthSatisfaction: ratings["건강"],
  //       content: diaryContent,
  //       image_url: diaryImage, // 수정 시에는 파일을 직접 보내지 않고, URL을 추가할 수 있습니다.
  //       completed_goals: checkedGoals,
  //     })
  //   );

  //   // 이미지 파일 추가 (파일이 있을 경우)
  //   if (diaryImage) {
  //     formData.append("file", diaryImage); // 파일을 추가합니다
  //   }

  //   try {
  //     const response = await axios.put(
  //       `https://www.proclockout.com/api/v1/daily/${dailyId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${localStorage.getItem("authorization")}`, // 토큰 추가
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setSavedData((prevData) => ({
  //         ...prevData,
  //         [currentDate]: JSON.parse(formData.get("request")),
  //       }));
  //       setIsLocked(false); // 수정 후 화면 잠금
  //       setIsEditing(true); // 수정 후 수정 모드 해제
  //       alert("수정되었습니다.");
  //     }
  //   } catch (error) {
  //     console.error("수정 중 오류가 발생했습니다:", error);
  //     alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };

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

  const handleAddGoal = async (newGoal) => {
    console.log(newGoal);
    if (!isLocked) {
      try {
        const response = await axios.post(
          "https://www.proclockout.com/api/v1/daily/goals",
          {
            content: newGoal.content,
            category: newGoal.category,
          },
          {
            headers: {
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        const addedGoal = response.data;
        setGoals((prevGoals) => [...prevGoals, addedGoal]);
        await loadGoals(); // 추가 후 목표 목록 다시 불러오기
      } catch (error) {
        console.error("목표활동 추가 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!isLocked) {
      try {
        await axios.delete(
          `https://www.proclockout.com/api/v1/daily/goals/${goalId}`,
          {
            headers: {
              authorization: localStorage.getItem("authorization"),
            },
          }
        );

        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
        setCheckedGoals((prevCheckedGoals) =>
          prevCheckedGoals.filter((goal) => goal.id !== goalId)
        );
        await loadGoals(); // 삭제 후 목표 목록 다시 불러오기
      } catch (error) {
        console.error("목표활동 삭제 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <PageContainer>
      <FootPrint onDateSelect={handleDateSelect} />
      <RightContainer isLocked={isLocked}>
        <Diary
          checkedGoals={checkedGoals}
          goals={checkedGoals}
          categorycategorys={categorycategorys}
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
      {/* <GoalListContainer
        categorycategorys={categorycategorys}
        onCheckboxChange={handleCheckboxChange}
        onAddGoal={handleAddGoal}
        onDeleteGoal={handleDeleteGoal}
        goals={goals}
        isLocked={isLocked}
      /> */}
    </PageContainer>
  );
};

export default Daily;
