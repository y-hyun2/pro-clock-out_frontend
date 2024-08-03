import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 

const MiniCalendar = () => {
  const prevMonthImage = process.env.PUBLIC_URL + '/image/prevMonth.png';
  const nextMonthImage = process.env.PUBLIC_URL + '/image/nextMonth.png';
  const fcCalendarRef = React.useRef(null); // FullCalendar 인스턴스를 참조할 Ref

  const customButtons = {
 
    customPrev: {
      icon: prevMonthImage,
      click: function() {
        fcCalendarRef.current.getApi().prev();
      }
    },
    customNext: {
      icon: nextMonthImage,
      click: function() {
        fcCalendarRef.current.getApi().next();
      }
    },

  };

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        customButtons={customButtons}
        ref={fcCalendarRef}
        // 기타 FullCalendar 설정
      />
    </div>
  );
};

export default MiniCalendar;
