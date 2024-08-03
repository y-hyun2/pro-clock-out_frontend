import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { format, isToday } from "date-fns";
import { ko as dateFnsKoLocale } from "date-fns/locale";

import { CalendarContainer, FullCalendarContainer } from "./CalendarStyles";
import { customDayCellContent } from "./CalendarUtils";
import EventModal from "./EventModal";
import Dropdown from "./Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

// Create unique event ID
const createEventId = () => String(Date.now());

const CategorytextColors = {
  작업: "white",
  휴식: "white",
  수면: "white",
  개인생활: "gray",
  건강: "gray",
  기타: "white",
};

const MainCalendar = ({
  events = [],
  setEvents,
  categoryColors,
  selectedDate,
}) => {
  const calendarRef = useRef();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 날짜 클릭 핸들러

  const handleDateSelect = (selectInfo) => {
    const newEvent = {
      calendar_id: createEventId(),
      label: "",
      title: "",
      location: "",
      start_time: selectInfo.startStr,
      end_time: selectInfo.endStr,
      notes: "",
    };

    setCurrentEvent(newEvent); //현재 이벤트 상태 업데이트
    openModal(); //모달 열기
  };

  //이벤트 클릭 핸들러

  const handleEventClick = (clickInfo) => {
    const event = {
      calendar_id: clickInfo.event.id,
      label: clickInfo.event.extendedProps.label,
      title: clickInfo.event.title,
      location: clickInfo.event.extendedProps.location,
      start_time: clickInfo.event.startStr,
      end_time: clickInfo.event.endStr,
      notes: clickInfo.event.extendedProps.notes,
    };
    setCurrentEvent(event); //현재 이벤트 상태 업데이트
    openModal(); //모달 열기
  };

  // 이벤트 저장 핸들러
  const saveEvent = (eventToSave) => {
    setEvents((prevEvents) => {
      const eventIndex = prevEvents.findIndex(
        (event) => event.calendar_id === eventToSave.calendar_id
      );
      if (eventIndex > -1) {
        // 기존 이벤트 수정
        prevEvents[eventIndex] = eventToSave;
        return [...prevEvents];
      } else {
        // 새로운 이벤트 추가
        return [...prevEvents, eventToSave];
      }
    });
    closeModal();
  };

  // 초기 뷰 설정
  const [currentView, setCurrentView] = useState("timeGridWeek");

  //현재 뷰 관리, 날짜 설정
  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi) {
      if (currentView) {
        calendarApi.changeView(currentView);
      }
      if (selectedDate) {
        calendarApi.gotoDate(selectedDate);
      }
    }
  }, [currentView, selectedDate]);

  //캘린더의 툴바를 구성, left: 제목, 이전, 다음 , 오늘, 월간 보기, 주간보기 버튼
  const headerToolbar = {
    left: "title prev,next",
    center: "",
    right: "customTodayButton",
  };

  // 캘린더가 렌더링된 후에 "오늘"버튼 이벤트를 설정
  const handleDatesSet = () => {
    const button = document.querySelector(".fc-customTodayButton-button");
    if (button) {
      button.addEventListener("click", () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView("timeGridDay");
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.event.title}</b>
        <br />
        <i>{eventInfo.timeText}</i>
        <br />
        <i>{eventInfo.event.extendedProps.location}</i>
      </>
    );
  };

  // 변환된 이벤트 데이터를 콘솔에 로그 출력
  const transformedEvents = events.map((event) => ({
    id: event.calendar_id,
    title: event.title,
    start: event.start_time,
    end: event.end_time,
    extendedProps: {
      label: event.label,
      location: event.location,
      notes: event.notes,
    },
    backgroundColor: categoryColors[event.label] || "gray",
    borderColor: categoryColors[event.label] || "gray",
    textColor: CategorytextColors[event.label],
  }));
  console.log(transformedEvents);

  const eventDidMount = (info) => {
    console.log("Event Element:", info.el);
    console.log("Event Info:", info.event);
    const color = info.event.backgroundColor;
    info.el.style.backgroundColor = color;
    console.log(`Event ID: ${info.event.id}, Background Color: ${color}`);
  };

  const renderDayHeaderContent = (args) => {
    const date = args.date;
    const day = format(date, "E", { locale: dateFnsKoLocale }); // '일'
    const dayNum = format(date, "d"); // '21'
    const today = isToday(date); // 오늘 날짜인지 확인
    const viewType = args.view.type; // 현재 뷰 타입을 가져옴

    return (
      <div>
        <span>{day}</span>
        <br />
        <br />
        {viewType !== "dayGridMonth" && (
          <span>
            {today ? (
              <span className="highlight-circle">{dayNum}</span>
            ) : (
              dayNum
            )}
          </span>
        )}
      </div>
    );
  };

  return (
    <CalendarContainer className="calendar-container">
      <FullCalendarContainer>
        <Dropdown setCurrentView={setCurrentView} />
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} //플러그인 설정
          locale={koLocale}
          editable={true} //이벤트의 드래그 앤 드롭, 리사이징, 이동을 허용
          droppable={true} //캘린더에 요소를 드롭하여 이벤트를 생성할 수 있도록 허용
          selectable={true} //사용자가 일정 범위를 선택하여 이벤트를 추가할 수 있도록 허용
          selectMirror={true} //이벤트를 추가할 때 선택한 영역을 표시
          initialView="timeGridWeek" //디폴트를 주간 달력으로
          dayHeaderContent={renderDayHeaderContent} // 커스텀 요일 포맷 적용
          events={transformedEvents}
          eventContent={renderEventContent}
          select={handleDateSelect}
          eventClick={handleEventClick}
          allDaySlot={false} //allDay 일정 표시를 비활성화
          nowIndicator={true} //현재 시간을 표시하는 인디케이터를 활성화
          dayMaxEvents={true} //이벤트가 오버되면 높이 제한
          allDay={false} //이벤트가 하루 종일인지 여부 설정
          timeZone="local" //이벤트의 시간대를 UTC로 설정
          fixedWeekCount={false}
          headerToolbar={headerToolbar}
          titleFormat={{
            year: "numeric",
            month: "short",
          }}
          customButtons={{
            customTodayButton: {
              text: "오늘",
            },
          }} //일 -> 오늘로 바꾸기
          dayCellContent={customDayCellContent} //월 달력의 한글 '일'없애기
          datesSet={handleDatesSet} // 캘린더가 렌더링된 후에 호출
          eventDidMount={eventDidMount}
        />
      </FullCalendarContainer>
      {showModal && (
        <EventModal
          show={showModal}
          handleClose={closeModal}
          handleSave={saveEvent}
          event={currentEvent}
        />
      )}
    </CalendarContainer>
  );
};
export default MainCalendar;
