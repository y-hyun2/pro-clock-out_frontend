import React, { useState } from 'react';
import styled from 'styled-components';

const TimeSlider = ({ onSelect }) => {
  const [startTime, setStartTime] = useState(null); // 시작 시간
  const [endTime, setEndTime] = useState(null); // 끝 시간

  // 12시부터 다음날 24시까지 30분 단위로 생성 (72개의 버튼)
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 12; h < 48; h += 0.5) {
      times.push(h);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // 선택된 범위에 따라 하이라이트된 시간 블록을 반환
  const getHighlightClass = (time) => {
    if (startTime !== null && endTime !== null) {
      if (
        time >= Math.min(startTime, endTime) &&
        time <= Math.max(startTime, endTime)
      ) {
        return 'highlight';
      }
    } else if (startTime !== null) {
      // 시작 시간이 설정된 경우 하이라이트 추가
      if (time === startTime) {
        return 'selected';
      }
    }
    return '';
  };

  const handleSelectTime = (time) => {
    if (startTime === null) {
      setStartTime(time);
      setEndTime(null); // 새로운 시작 시간 선택 시 끝 시간 초기화
    } else if (endTime === null) {
      if (time > startTime) {
        setEndTime(time);
        onSelect({
          startTime: Math.floor(startTime * 2) / 2, // 30분 단위로 반올림
          endTime: Math.ceil(time * 2) / 2, // 30분 단위로 반올림
        });
      } else {
        // 시작 시간보다 작은 시간이 클릭되면 범위 초기화
        setStartTime(time);
        setEndTime(null);
      }
    } else {
      // 이미 범위가 설정된 상태에서 클릭하면 범위 초기화
      setStartTime(time);
      setEndTime(null);
    }
  };

  // 선택된 시간 범위를 "n시간 n분" 형식으로 변환
  const getDurationText = () => {
    if (startTime !== null && endTime !== null) {
      const durationMinutes = Math.abs((endTime - startTime + 0.5) * 60);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `총 수면 시간 : ${hours}시간 ${minutes}분`;
    }
    return '범위를 선택하세요';
  };

  // 시간을 "오후/AM HH시" 형식으로 변환
  const formatTime = (time) => {
    const isNextDay = time >= 24;
    const hours = Math.floor(time % 24);
    const minutes = (time % 1) * 60;
    const formattedMinutes = minutes > 0 ? `${minutes}분` : '';
    const displayTime = isNextDay
      ? `다음날 ${hours}시 ${formattedMinutes}`
      : `${hours}시 ${formattedMinutes}`;
    return displayTime.trim();
  };

  return (
    <SliderContainer>
      <TimeBar>
        {timeOptions.map((time) => (
          <TimeBlock
            key={time}
            className={getHighlightClass(time)}
            onClick={() => handleSelectTime(time)}
          />
        ))}
      </TimeBar>
      
      <SelectedTimeDisplay>
        <SliderTimeTextWrapper>
      <SliderTimeText>12</SliderTimeText>
      <SliderTimeText>18</SliderTimeText>
      <SliderTimeText>00</SliderTimeText>
      <SliderTimeText>06</SliderTimeText>
      <SliderTimeText>12</SliderTimeText>
      <SliderTimeText>18</SliderTimeText>
      <SliderTimeText>24</SliderTimeText>
      </SliderTimeTextWrapper>
        <TimeRangeText>
          {startTime !== null && endTime !== null
            ? `${formatTime(startTime)} ~ ${formatTime(endTime + 0.5)}`
            : '취침 시간 ~ 기상 시간'}
        </TimeRangeText>
        <DurationText>
          {getDurationText()}
        </DurationText>
      </SelectedTimeDisplay>
    </SliderContainer>
  );
};

// Styled Components

const SliderContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 99.8%;
  height: 1.5rem;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #6ad4dd;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TimeBlock = styled.div`
  width: 10.6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s;
  font-weight: bold;

  &:nth-child(2n) {
    border-right: 1px solid #6ad4dd;
  }

  &.highlight {
    background-color: #ccfffb;
    color: white;
  }

  &.selected {
    background-color: #b3e5fc;
    color: #000;
  }

  &:hover {
    background-color: #ccfffb;
    color: white;
  }

  &:last-child {
    border-right: none;
  }
`;

const SelectedTimeDisplay = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #bdbdbd;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

const DurationText = styled.div`
  margin-bottom: 5px;
  font-weight: lighter;
`;

const TimeRangeText = styled.div`
  font-size: 1.5rem;
  color: #6ad4dd;
`;

const SliderTimeTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6.6rem;
    margin-top: -0.3rem;
`;
const SliderTimeText = styled.p`
  font-size: 1rem;
  color: lightgray;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export default TimeSlider;
