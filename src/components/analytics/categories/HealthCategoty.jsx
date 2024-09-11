import React from "react";
import Category from "../components/analytics/Category";

function HealthCategory({ data, onClick, isDataComplete }) {
  const categoryData = {
    title: "건강",
    data: [
      { name: "건강", score: data.health_score, fill: "#FFFBD4" },
      { name: "평균", score: data.health_avg, fill: "#DADBFF" },
    ],
    score: data.health_score,
    percentage: isDataComplete
      ? (
          (data.health_score / (data.health_score + data.health_avg)) *
          100
        ).toFixed(1)
      : 0,
    fill: "#FFFBD4",
  };

  return <Category categoryData={categoryData} />;
}

export default HealthCategory;
