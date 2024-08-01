import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function LineGraph({ data }) {
  const colors = ["#8884d8", "#c6e0ff", "#76e1e2", "#97efb6", "#FFFBD4"];

  const processData = (data) => {
    const categories = Object.keys(data); // data의 키 (total, work, rest 등) 가져오기
    let result = [];

    // 모든 날짜 데이터 추출
    const dates = Object.keys(
      data[categories[0]].reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {})
    );

    // 각 날짜에 대해 데이터 생성
    dates.forEach((date) => {
      let newObj = { date: date };
      categories.forEach((category) => {
        const categoryData = data[category].find(
          (item) => item[date] !== undefined
        );
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
    <ResponsiveContainer width={1750} height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" interval={1} />
        {/*tickFormatter={(tickItem) => format(new Date(tickItem), "MM/dd")}를 추가하면 표시방법 변경가능 : import 해야함. */}
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data).map((key, index) => (
          <Line
            type="linear"
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={5}
            activeDot={{ r: 8 }}
            key={key}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
