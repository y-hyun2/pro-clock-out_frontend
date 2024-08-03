import React from 'react';

// 날짜 셀 내용을 커스터마이즈하는 함수
// 날짜 셀에 표시할 텍스트 (예: "1" -> "1일")
export const customDayCellContent = ({ date }) => {
  const dayNumberText = date.getDate().toString();
  return <div>{dayNumberText}</div>;
};

// 주간 캘린더 제목을 커스터마이즈하는 함수: titleFormat 옵션을 사용
//현재 주의 정보를 계산하여 제목에 추가
export const customTitle = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = Math.ceil(date.getDate() / 7);
  return `${year}년 ${month}월 ${week}주차`;
};

//주간 캘린더 제목을 설정하는 함수
export const customTitleRender = ({date}) => customTitle(date);