import React from "react";
import Category from "../components/analytics/Category";

function SleepCategory({ data, onClick, isDataComplete }) {
  const categoryData = {
    title: "수면",
    data: [
      { name: "수면", score: data.sleep_score, fill: "#76e1e2" },
      { name: "평균", score: data.sleep_avg, fill: "#DADBFF" },
    ],
    score: data.sleep_score,
    percentage: isDataComplete
      ? (
          (data.sleep_score / (data.sleep_score + data.sleep_avg)) *
          100
        ).toFixed(1)
      : 0,
    fill: "#76e1e2",
  };

  return <Category categoryData={categoryData} />;
}

export default SleepCategory;
