import React, { useState } from 'react';
import styled from 'styled-components';
import { MAIN_DATA } from '../data/Maindata.js';
// import { Main, Analytics, Calendar, Daily, Recommend, Mypage } from './';
import Main from '../pages/Main.js';
import Analytics from '../pages/Analytics.js';
import Calendar from '../pages/Calendar.js';
import Daily from '../pages/Daily.js';
import Recommend from '../pages/Recommend.js';
import Mypage from '../pages/Mypage.js';

const Navbar = () => {
  const [content, setContent] = useState(null); // 초기 값은 null로 설정

  const handleClickButton = (e) => {
    const { name } = e.target;
    setContent(name); // 클릭된 버튼의 name을 content 상태로 설정
  };

  const selectComponent = {
    mainpage: <Main />,
    analytics: <Analytics />,
    calendar: <Calendar />,
    daily: <Daily />,
    recommend: <Recommend/>,
    mypage: <Mypage />,
  };

  return (
    <div>
      <Container>
        {MAIN_DATA.map((data) => (
          <Button onClick={handleClickButton} name={data.name} key={data.id}>
            {data.text}
          </Button>
        ))}
      </Container>
      {content && (
        <Content>
          {selectComponent[content]} {/* content에 따라 해당 페이지 컴포넌트 렌더링 */}
        </Content>
      )}
    </div>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin-right: 1rem;
  color: #111111;
  background-color: #eeeeee;
  border-radius: 2rem;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
