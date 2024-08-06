import axios from "axios";

const fetchGoals = async () => {
  try {
    const response = await axios.get(
      "https://www.proclockout.com/api/v1/daily/goals",
      {
        headers: {
          authorization: localStorage.getItem("authorization"), // 토큰 추가
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data.goals; // 목표활동 데이터 반환
    }
  } catch (error) {
    console.error("목표활동을 조회하는 중 오류가 발생했습니다:", error);
    throw new Error("목표활동을 조회하는 중 오류가 발생했습니다.");
  }
};

export default fetchGoals;
