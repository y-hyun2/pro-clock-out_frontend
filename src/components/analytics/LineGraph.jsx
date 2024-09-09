import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LineGraph({ data }) {
  const colors = ["#8884d8", "#c6e0ff", "#76e1e2", "#97efb6", "#FFFBD4"];

  const processData = (data) => {
    const categories = Object.keys(data);
    let result = [];
  
    // 모든 날짜 데이터 추출
    const dates = new Set();
    categories.forEach(category => {
      data[category].forEach(item => {
        Object.keys(item).forEach(date => dates.add(date));
      });
    });
  
    // 날짜 배열로 변환
    const sortedDates = Array.from(dates).sort((a, b) => new Date(a) - new Date(b));
  
    // 각 날짜에 대해 데이터 생성
    sortedDates.forEach((date) => {
      let newObj = { date: date };
      categories.forEach((category) => {
        const categoryData = data[category].find(item => item[date] !== undefined);
        newObj[category] = categoryData ? categoryData[date] : null;
      });
      result.push(newObj);
    });
  
    // 날짜 기준으로 데이터 오름차순 정렬
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    return result;
  };
  

  const formattedData = processData(data);

  return (
    <LineChart
      width={1750}
      height={400}
      data={formattedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data).map((key, index) => (
        <Line
          type="monotone"
          dataKey={key}
          stroke={colors[index % colors.length]}
          strokeWidth={2}
          activeDot={{ r: 5 }}
          key={key}
        />
      ))}
    </LineChart>
  );
}

export default LineGraph;
