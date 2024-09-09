import React from "react";
import Category from "../components/analytics/Category";

function PersonalCategory({ data, onClick, isDataComplete }) {
  const categoryData = {
    title: "개인생활",
    data: [
      { name: "개인생활", score: data.personal_score, fill: "#97efb6" },
      { name: "평균", score: data.personal_avg, fill: "#DADBFF" },
    ],
    score: data.personal_score,
    percentage: isDataComplete ? ((data.personal_score / (data.personal_score + data.personal_avg)) * 100).toFixed(1) : 0,
    fill: "#97efb6"
  };

  return <Category categoryData={categoryData} />;
}

export default PersonalCategory;
