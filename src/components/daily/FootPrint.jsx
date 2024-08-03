import React, { useState, useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 1128px;
  height: 220px;
  position: absolute;
  left: 500px;
`;

const JandiContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`;

const Contribution = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const Satisfaction = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
  font-size: 13px;
  color: #6a6d72;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const SatisfactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TooltipContainer = styled.div`
  background: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const data = [
  { day: "2024-01-01", value: 1 },
  { day: "2024-01-02", value: 3 },
  { day: "2024-01-03", value: 5 },
  { day: "2024-01-04", value: 7 },
  { day: "2024-01-05", value: 9 },
  { day: "2024-07-05", value: 9 },
  { day: "2024-06-15", value: 3 },
  { day: "2024-08-03", value: 3 },
];

const colorScale = (value) => {
  let color;
  switch (value) {
    case 1:
      color = "#DADBFF";
      break;
    case 3:
      color = "#C0C2F7";
      break;
    case 5:
      color = "#A5A8F0";
      break;
    case 7:
      color = "#969AEB";
      break;
    case 9:
      color = "#7A7EE3";
      break;
    default:
      color = "#eeeeee";
  }
  return color;
};

const customTooltip = ({ day, value }) => (
  <TooltipContainer>
    {day}: {value}
  </TooltipContainer>
);
const WeekdayLabels = styled.div`
  position: absolute;
  left: 0;
  top: 65px; /* 조정할 수 있는 위치 */
  width: 50px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #333;
`;

const countFilledCellsForYear = (data) => {
  const filteredData = data.filter((item) => item.day);
  return filteredData.length;
};

const FootPrint = ({ onDateSelect }) => {
  const colors = [
    colorScale(1),
    colorScale(3),
    colorScale(5),
    colorScale(7),
    colorScale(9),
  ];
  // 연도 레전드 숨기기
  const yearLegend = (year) => "";

  const [filledCells, setFilledCells] = useState(0);

  useEffect(() => {
    const count = countFilledCellsForYear(data);
    setFilledCells(count);
  }, []);

  const handleDayClick = (day) => {
    onDateSelect(day);
  };

  return (
    <CalendarContainer>
      <Contribution>{filledCells}개의 발자국을 남겼어요</Contribution>
      <JandiContainer>
        <WeekdayLabels>
          <div>월</div>
          <div>수</div>
          <div>금</div>
        </WeekdayLabels>

        <ResponsiveCalendar
          data={data}
          from="2024-01-01"
          to="2024-12-31"
          emptyColor="#eeeeee"
          colors={colors}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          tooltip={customTooltip}
          yearLegend={yearLegend}
          onClick={(day) => handleDayClick(day.day)}
        />
        <Satisfaction>
          Less
          <SatisfactionItem>
            <div
              style={{ backgroundColor: colorScale(1), width: 16, height: 16 }}
            ></div>
            <div
              style={{ backgroundColor: colorScale(3), width: 16, height: 16 }}
            ></div>
            <div
              style={{ backgroundColor: colorScale(5), width: 16, height: 16 }}
            ></div>
            <div
              style={{ backgroundColor: colorScale(7), width: 16, height: 16 }}
            ></div>
            <div
              style={{ backgroundColor: colorScale(9), width: 16, height: 16 }}
            ></div>
          </SatisfactionItem>
          More
        </Satisfaction>
      </JandiContainer>
    </CalendarContainer>
  );
};

export default FootPrint;
