import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import MainCalendar from "../components/calendar/MainCalendar";
import EventCategories from "../components/calendar/EventCategories";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { startOfWeek, endOfWeek } from "date-fns"; // 날짜 포맷을 위한 라이브러리
import axios from "axios";
const categoryColors = {
  작업: "#7AA2E3",
  휴식: "#7A7EE3",
  수면: "#6AD4DD",
  개인생활: "#97E7E1",
  건강: "#FFFBD4",
  기타: "gray",
};

const Calendars = () => {
  const [events, setEvents] = useState([
    {
      calendar_id: "1",
      label: "작업",
      title: "제목",
      location: "한국외대 글로벌캠퍼스",
      start_time: "2024-07-12T16:07:39",
      end_time: "2024-07-12T20:10:39",
      notes: "오늘 재웅노바랑 카페에서 개발을 했다!",
    },
    {
      calendar_id: "2",
      label: "건강",
      title: "회의",
      location: "서울",
      start_time: "2024-07-15T10:00:00",
      end_time: "2024-07-15T12:00:00",
      notes: "건강검진 예약",
    },
  ]);
  const [selectedCategories, setSelectedCategories] = useState({
    작업: true,
    휴식: true,
    수면: true,
    개인생활: true,
    건강: true,
    기타: true,
  });

  const [selectedDate, setSelectedDate] = useState(new Date()); // 미니 캘린더에서 선택된 날짜

  const handleCategoryChange = (label, isChecked) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [label]: isChecked,
    }));
  };
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://www.proclockout.com/api/v1/calendars",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             authorization: localStorage.getItem("authorization"),
  //           },
  //         }
  //       );
  //       console.log(typeof response.data);
  //       // response.data가 null이거나 배열이 아닐 경우 빈 배열로 설정
  //       if (!response.data) {
  //         setEvents([]);
  //       } else if (Array.isArray(response.data)) {
  //         setEvents(response.data);
  //       } else {
  //         setEvents([response.data]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  // 필터링된 이벤트만 반환
  const filteredEvents = events.filter(
    (event) => selectedCategories[event.label]
  );

  // 미니 캘린더에서 날짜를 선택할 때 호출
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <CContainer>
      <CategoryContainer>
        <StyledCalendar
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={(locale, date) => moment(date).format("DD")}
        />
        <EventCategories
          events={events}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          categoryColors={categoryColors}
        />
      </CategoryContainer>
      <MainContainer>
        <MainCalendar
          events={filteredEvents}
          setEvents={setEvents}
          categoryColors={categoryColors}
          selectedDate={selectedDate} // 선택된 날짜를 MainCalendar에 전달
        />
      </MainContainer>
    </CContainer>
  );
};

export default Calendars;

const CContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 30px 30px 60px;
  align-items: flex-start;
`;

const MainContainer = styled.div`
  position: relative; /* 부모 컨테이너와의 상대 위치 설정 */
  width: 100%; /* 전체 너비를 채우도록 설정 */
  height: 100%; /* 전체 높이를 채우도록 설정 */
`;

const CategoryContainer = styled.div`
  width: 300px;
`;

const StyledCalendar = styled(Calendar)`
  width: 210px;
  max-width: 100%;
  background: white;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;

  .react-calendar__month-view__days__day--weekend {
    color: var(--festie-gray-800, #3a3a3a);
  }

  .react-calendar__navigation__label > span {
    // 달력 상단 년/월 글씨 커스텀
    color: var(--festie-gray-800, #7a7ee3);
    font-size: 13px;
    font-weight: bold;
    line-height: 140%;
  }
  .react-calendar__navigation button {
    color: var(--festie-gray-800, #7a7ee3);
    min-width: 30px;
    background: none;
  }

  // 날짜 원으로 바꾸기
  .react-calendar__month-view__days {
    align-items: center;
    text-align: center;
  }
  .react-calendar__tile {
    flex-basis: calc(100% / 7);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* 타일을 가운데로 정렬 */
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    //hover 했을 때 색상 변경
    background: var(--festie-gray-800, #7a7ee3);
    border-radius: 50%;
    position: relative;
    width: 40px;
    height: 30px;
  }
  .react-calendar__tile--now {
    // 오늘 날짜 하이라이트 커스텀
    background: white;
    color: var(--festie-gray-800, #7a7ee3);
    border-radius: 50%;
    position: relative;
  }
  .react-calendar__tile--active {
    background: var(--festie-gray-800, #7a7ee3);
    color: white;
    border-radius: 50%;
    display: flex;
    width: 40px;
    height: 30px;
    position: relative;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #7a7ee3;
  }
`;
