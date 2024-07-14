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
    <ResponsiveContainer width={700} height={230}>
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
        <Line type="linear" dataKey="value1" stroke="#8884d8" strokeWidth={3} />
        <Line type="linear" dataKey="value2" stroke="#82ca9d" strokeWidth={3} />
        <Line type="linear" dataKey="value3" stroke="#8dd1e1" strokeWidth={3} />
        <Line type="linear" dataKey="value4" stroke="#ffc658" strokeWidth={3} />
        <Line type="linear" dataKey="value5" stroke="#ff8042" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
