import React from "react";
import Category from "../components/analytics/Category";

function RestCategory({ data, onClick, isDataComplete }) {
  const categoryData = {
    title: "휴식",
    data: [
      { name: "휴식", score: data.rest_score, fill: "#A2A6FF" },
      { name: "평균", score: data.rest_avg, fill: "#DADBFF" },
    ],
    score: data.rest_score,
    percentage: isDataComplete
      ? ((data.rest_score / (data.rest_score + data.rest_avg)) * 100).toFixed(1)
      : 0,
    fill: "#A2A6FF",
  };

  return <Category categoryData={categoryData} />;
}

export default RestCategory;
