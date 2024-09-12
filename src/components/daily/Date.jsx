import React from "react";
import moment from "moment";
import "moment/locale/ko";
import styled from "styled-components";

const DateContainer = styled.div`
  width: 250px;
  height: 300px;
  position: absolute;
  left: 150px;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const YearContainer = styled.div`
  display: flex;
  align-items: start;
  font-size: 16px;
  font-weight: bold;
  color: #7a7ee3;
`;

const MonthContainer = styled.span`
  font-weight: bold;
  margin: 0 10px;
  font-size: 36px;
  font-weight: bold;
`;

const DayContainer = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #7a7ee3;
`;

const Date = ({ setDate }) => {
  const Year = moment().format("YYYY년");
  const Month = moment().format("MM월 DD일");
  const Day = moment().format("dddd");

  const handleDateChange = () => {
    const newDate = moment().format("YYYY-MM-DD"); 
    setDate(newDate); // 날짜를 상위 컴포넌트로 전달
  };

  return (
    <DateContainer onClick={handleDateChange}>
      <YearContainer> {Year} </YearContainer>

      <MonthContainer>{Month}</MonthContainer>

      <DayContainer>{Day}</DayContainer>
    </DateContainer>
  );
};
export default Date;
