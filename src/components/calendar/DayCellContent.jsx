import styled from 'styled-components';

const StyledDayCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .day-number {
    font-size: 18px;
    font-weight: bold;
  }
  .day-text {
    font-size: 14px;
    color: gray;
  }
`;

const DayCellContent = ({ dayNumber, dayText }) => {
  return (
    <StyledDayCell>
      <span className="day-number">{dayNumber}</span>
      <span className="day-text">{dayText}</span>
    </StyledDayCell>
  );
};

export default DayCellContent;
