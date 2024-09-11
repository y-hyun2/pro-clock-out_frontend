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
  const maxwdth = 1900;

  // CustomLabel component for displaying percentage labels
  const CustomLabel = ({ x, y, value }) => {
    return (
      <Text
        x={x + maxwdth - 400}
        y={y + 22}
        textAnchor="start"
        fill="#000"
        fontWeight={800}
        fontSize={20}
      >
        {`${value}%`}
      </Text>
    );
  };

  return (
    <BarChart
      width={maxwdth - 190}
      height={400}
      data={data}
      layout="vertical"
      margin={{ top: 10, right: 50, left: 30, bottom: 20 }}
    >
      <XAxis
        type="number"
        domain={[0, 106]}
        axisLine={false}
        tickLine={false}
        hide={true}
      />
      <YAxis
        type="category"
        dataKey="name"
        axisLine={false}
        tickLine={false}
        fontWeight={800}
        fontSize={23}
      />
      <Bar
        dataKey="score"
        isAnimationActive={true}
        label={<CustomLabel />}
        barSize={30}
        maxBarSize={40}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default HorizontalBarChart;
