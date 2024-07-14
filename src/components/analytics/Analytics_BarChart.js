import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

function Analytics_BarChart({ data }) {
  const [chartData, setChartData] = useState([
    { name: "나의 점수", score: 82, fill: "#7AA2E3" },
    { name: "평균 점수", score: 71, fill: "#C9DDFD" },
  ]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const renderCustomBarLabel = ({ x, y, width, value, fill }) => {
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill={fill}
        textAnchor="middle"
        fontSize="10px"
        fontWeight={800}
      >
        {`${value}점`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={150} height={100}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: "10px" }}
          fontWeight={800}
        />
        <Bar
          dataKey="score"
          barSize={30}
          radius={[7, 7, 0, 0]}
          label={({ x, y, width, value, fill }) =>
            renderCustomBarLabel({ x, y, width, value, fill })
          }
          fill={({ payload }) => payload.fill} // 각 바의 fill 속성을 데이터에 맞춰 설정
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Analytics_BarChart;
