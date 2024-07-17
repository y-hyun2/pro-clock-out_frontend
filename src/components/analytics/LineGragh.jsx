// LineGraph.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import theme from "../../styles/theme";

const LineGraph = ({ data }) => {
  const CustomXAxisTick = ({ x, y, payload }) => {
    const isOddIndex =
      data.findIndex((item) => item.date === payload.value) % 2 === 0;
    return (
      <text x={x} y={y + 15} textAnchor="middle" fill="#666">
        {isOddIndex ? payload.value : ""}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={1500} height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" tick={<CustomXAxisTick />} />
        <YAxis ticks={[0, 50, 100]} />
        <Line
          type="linear"
          dataKey="value1"
          stroke={theme.colors["main-blue"]}
          strokeWidth={6}
        />
        <Line
          type="linear"
          dataKey="value2"
          stroke={theme.colors["main-light-green"]}
          strokeWidth={6}
        />
        <Line
          type="linear"
          dataKey="value3"
          stroke={theme.colors["main-light-purple"]}
          strokeWidth={6}
        />
        <Line
          type="linear"
          dataKey="value4"
          stroke={theme.colors["main-green"]}
          strokeWidth={6}
        />
        <Line
          type="linear"
          dataKey="value5"
          stroke={theme.colors["main-purple"]}
          strokeWidth={6}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
