import axios from "axios";

const DeleteGoal = async (goalId) => {
  try {
    const response = await axios.delete(
      `https://www.proclockout.com/api/v1/daily/goals/${goalId}`,
      {
        data: {
          goal_id: goalId,
        },
        headers: {
          Authorization: localStorage.getItem("authorization"), // 토큰 추가
        },
      }
    );

    if (response.status === 200) {
      return response.data; // 삭제된 목표활동 데이터 반환
    }
  } catch (error) {
    console.error("목표활동을 삭제하는 중 오류가 발생했습니다:", error);
    throw new Error("목표활동을 삭제하는 중 오류가 발생했습니다.");
  }
};

export default DeleteGoal;
