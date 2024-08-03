import styled from "styled-components";
// export const MiniCalendarContainer = styled.div`
//   position: relative; /* 부모 컨테이너와의 상대 위치 설정 */
//   width: 100%; /* 전체 너비를 채우도록 설정 */
//   height: 100%; /* 전체 높이를 채우도록 설정 */

// `

export const CalendarContainer = styled.div`
  position: relative; /* 부모 컨테이너와의 상대 위치 설정 */
  flex-basis: 1100px;
  width: 100%; /* 전체 너비를 채우도록 설정 */
  height: 100%; /* 전체 높이를 채우도록 설정 */
`;

export const FullCalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  color: black !important;

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 100%;
  }

  //toolbar 정렬
  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    position: relative; // 상대 위치 설정
  }

  // toolbar 버튼
  .fc .fc-button{
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0;
    color: #000;

    span {
      font-weight: 500;
      font-size: 28px;
    }

    :hover {
      background-color: none;
      border: none; /* 기본 border 제거 */
    }
  }

  /* 포커스 및 클릭 시 기본 스타일 제거 */
  .fc .fc-button:focus {
    outline: none; /* 기본 포커스 외곽선 제거 */
    box-shadow: none; /* 기본 포커스 그림자 제거 */
  }
  
  /* 버튼 클릭 시 기본 배경색 제거 */
  .fc .fc-button:active {
    border: 1px solid #7a7ee3;
      background-color: #7a7ee3; /* 클릭 시 배경색 유지 */
  }
  

    // 버튼 숨기기
  .fc--button {
    display: none;
  }


  // 주간 캘린더 전체 border 제거
  .fc-scrollgrid.fc-scrollgrid-liquid {
    border: none;
  }
  .fc-theme-standard th {
    border: none;
  }
/* 월간 달력에서 오늘 날짜 배경색 변경 */
.fc .fc-day-today {
  background-color: #E7E7E7; 
}

  /* 주간 달력에서 오늘 날짜 배경색 변경 */
.fc .fc-timegrid-col.fc-day-today {
  background-color: #E7E7E7; 
}

   // 주간 캘린더 오늘 날짜 하이라이트 커스텀
.fc-day-today .fc-col-header-cell-cushion {
  position: relative;
}
.fc-day-today .fc-col-header-cell-cushion .highlight-circle {
  display: inline-block;
  background-color: #7a7ee3;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-left: 5px;
}
  /* 요일 헤더 셀 스타일링 */
  .fc-theme-standard .fc-col-header-cell {
    border: none; /* 각 셀의 border 제거 */
  }
  /* 주간 캘린더 요일 헤더 스타일링 */
  .fc-theme-standard .fc-col-header-cell-cushion {
    color: #000; /* 글자 색을 검정색으로 변경 */
    font- size: 40px;
    font-weight: 600;
    text-decoration-line: none;
  }

  .fc .fc-col-header-cell-cushion {
    padding: 10px 10px 20px 10px;
  }
  /* 주간 캘린더 상단 이상한 숫자 없애기 */
.fc-timegrid-col-misc {
  display: none;
}

  // 월간 캘린더 글자색 변경
  .fc .fc-daygrid-event, 
.fc .fc-daygrid-day-number, 
.fc .fc-daygrid-day-top {
  color: black;        /* 모든 글자색을 검정색으로 변경 */
  text-decoration-line: none ;  /* 모든 글자의 밑줄 제거 */
}
  // customTodayButton 스타일 추가
  .fc .fc-customTodayButton-button {
    width: 85px;
    padding: 14px 10px;
    margin: 0 auto;
    border: 1px solid #000;
    border-radius: 10px;
    background: var(--white);
    line-height: 15px;
    cursor: pointer;
    position: relative;
    text-align: center;
    color: #000;
  }

  .dropdown-wrapper {
    position: absolute;
    right: 10px;
  }
`;

export const Title = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  width: 100%;
  flex-shrink: 0;
`;
