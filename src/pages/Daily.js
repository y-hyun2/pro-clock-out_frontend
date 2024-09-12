import React, { useState, useEffect } from "react";
import FootPrint from "../components/daily/FootPrint";
import Date from "../components/daily/Date";
import styled from "styled-components";
import RatingFormContainer from "../components/daily/RatingFormContainer";
import Diary from "../components/daily/Diary";
import GoalListContainer from "../components/daily/GoalListContainer";
import axios from "axios";
import fetchGoals from "../components/daily/api/fetchGoals";
import moment from "moment";
import "moment/locale/ko";


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

// console.log("카테고리작업컬러:", categorycategorys.작업);

const Daily = () => {
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [savedData, setSavedData] = useState({});
  const [dailyData, setDailyData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryImage, setDiaryImage] = useState("");
  const [showImg, setShowImg] = useState(null);
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

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setCurrentDate(today); // 초기 날짜 설정
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
      if (diaryImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", diaryImage);

        console.log(diaryImage);

        const imageResponse = await axios.post(
          "https://www.proclockout.com/api/v1/daily/image", // 서버의 이미지 업로드 엔드포인트
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: localStorage.getItem("authorization"),
              // Content-Type은 axios가 자동으로 설정합니다.
            },
          }
        );
        
        console.log(imageResponse.data);
      
        if (imageResponse.status === 200) {

        // completed_goals를 문자열 배열로 변환(기존엔 객체 형태로 반환하고 있었음)
        const goalContents = checkedGoals.map(goal => goal.content);

          // JSON 데이터 업로드
          const jsonData = {
            date: currentDate,
            workSatisfaction: ratings["작업"],
            restSatisfaction: ratings["휴식"],
            sleepSatisfaction: ratings["수면"],
            personalSatisfaction: ratings["개인생활"],
            healthSatisfaction: ratings["건강"],
            content: diaryContent,
            image_url:imageResponse.data,
            completed_goals: goalContents,
          };

          console.log("본문데이터", jsonData);

          const jsonResponse = await axios.post(
            "https://www.proclockout.com/api/v1/daily",
            jsonData, // JSON 데이터는 객체 형태로 감싸서 전송하면 안 됨(이미 객체형태이기 떄문)
            {
              headers: {
                authorization: localStorage.getItem("authorization"),
                "Content-Type": "application/json",
              },
            }
          );
          console.log("포스트",jsonResponse);

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
        } 
      }
 
} catch (error) {
console.error("저장 중 오류가 발생했습니다:", error);
alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
}
     
  };

  const handleEdit = async (date) => {
    
    console.log("date:", date);

    try {
       // 이미지 업로드
       if (diaryImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", diaryImage);

        console.log(diaryImage);

        const imageResponse = await axios.put(
          `https://www.proclockout.com/api/v1/daily/${date}`, // 서버의 이미지 업로드 엔드포인트
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: localStorage.getItem("authorization"),
              // Content-Type은 axios가 자동으로 설정합니다.
            },
          }
        );
        
        console.log('이미지 업로드 응답:',imageResponse.data);
  
        if (imageResponse.status === 200) {
      // completed_goals를 문자열 배열로 변환(기존엔 객체 형태로 반환하고 있었음)
        const goalContents = checkedGoals.map(goal => goal.content);
      // JSON 데이터 업로드
      const jsonData = {
        date: date,
        workSatisfaction: ratings["작업"],
        restSatisfaction: ratings["휴식"],
        sleepSatisfaction: ratings["수면"],
        personalSatisfaction: ratings["개인생활"],
        healthSatisfaction: ratings["건강"],
        content: diaryContent,
        image_url:imageResponse.data,
        completed_goals: goalContents,
      };

      console.log("본문데이터수정", jsonData);

      const jsonResponse = await axios.put(
        `https://www.proclockout.com/api/v1/daily/${date}`,
        jsonData,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("JSON Data:", jsonResponse); // JSON 데이터를 콘솔에 출력
    

      if (jsonResponse.status === 200) {
        setSavedData((prevData) => ({
          ...prevData,
          [date]: jsonData,
        }));
        setIsLocked(false); // 수정 후 화면 잠금
        setIsEditing(true); // 수정 후 수정 모드 해제
        alert("수정되었습니다.");
      } else {
        throw new Error("데이터 수정에 실패했습니다.");
      }
    } 
  } 
  
} catch (error) {
      console.error("수정 중 오류가 발생했습니다:", error);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };


  const fetchDailyIdFromDate = async (date) => {
    try {
      console.log(`요청하는 날짜: ${date}`); 
      const response = await axios.get(`https://www.proclockout.com/api/v1/daily/${date}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        }
      });
      console.log('응답 데이터:', response.data);
      return response.data;
    } catch (error) {
      console.error('데이터 요청 실패:', error);
      throw error;
    }
};

  
  const handleDateSelect = async (date) => {
    try {
      const dailyData = await fetchDailyIdFromDate(date);
      
      // 상태 업데이트
      setDailyData(dailyData);
      console.log('데이터 가져오기',dailyData)
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
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
      <Date setDate={setCurrentDate} />
      <FootPrint onDateSelect={handleDateSelect} />
      <RightContainer isLocked={isLocked}>
        <Diary
          checkedGoals={checkedGoals}
          goals={checkedGoals}
          categorycategorys={categorycategorys}
          content={diaryContent}
          setContent={setDiaryContent}
          image={showImg}
          setImage={setDiaryImage}
          setShowImg={setShowImg}
        />
        <SaveButton
          onClick={() => isEditing ? handleSave() : handleEdit((currentDate))}
          isEditing={isEditing}
        >
          {isLocked ? "수정" : "저장"}
        </SaveButton>
      </RightContainer>

      <RatingFormContainer
        onRatingChange={handleRatingChange}
        isLocked={isLocked}
      />
      <GoalListContainer
        categorycategorys={categorycategorys}
        onCheckboxChange={handleCheckboxChange}
        onAddGoal={handleAddGoal}
        onDeleteGoal={handleDeleteGoal}
        goals={goals}
        isLocked={isLocked}
      />
    </PageContainer>
  );
};

export default Daily;


