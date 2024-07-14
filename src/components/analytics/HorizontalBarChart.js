// HorizontalBarChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Text,
} from "recharts";

const HorizontalBarChart = ({ data }) => {
  // 가장 큰 값을 가진 막대의 길이를 기준으로 함
  const maxwdth = 1000;
  const CustomLabel = ({ x, y, value }) => {
    return (
      <Text x={x + maxwdth - 430} y={y + 12} textAnchor="start" fill="#000">
        {`${value}%`}
      </Text>
    );
  };

  return (
    <BarChart
      width={maxwdth - 300}
      height={230}
      data={data}
      layout="vertical"
      margin={{ top: 10, right: 50, left: 20, bottom: 20 }}
    >
      <XAxis type="number" axisLine={false} tickLine={false} hide={true} />
      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
      <Bar
        dataKey="score"
        isAnimationActive={true}
        label={<CustomLabel />}
        barSize={20}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default HorizontalBarChart;
