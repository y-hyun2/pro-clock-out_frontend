// Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { MAIN_DATA } from '../data/Maindata.js';
import Main from '../pages/Main.js';
import Analytics from '../pages/Analytics.js';
import Calendar from '../pages/Calendar.js';
import Daily from '../pages/Daily.js';
import Recommend from '../pages/Recommend.js';
import Mypage from '../pages/LoginPage.js';

// 로고 이미지 import
import logoImage from '../img/logo.png';

const Navbar = () => {
  const [content, setContent] = useState(null); // 초기 값 null로 설정

  const handleClickButton = (e) => {
    const { name } = e.target;
    if (name === 'mainpage') {
      setContent(null); // mainpage 버튼을 클릭하면 content를 null로 설정하여 Main 페이지가 렌더링되도록 함
    } else {
      setContent(name); // 그 외의 버튼 클릭 시 해당 페이지 이름으로 content 설정
    }
  };

  const selectComponent = {
    mainpage: <Main />,
    analytics: <Analytics />,
    calendar: <Calendar />,
    daily: <Daily />,
    recommend: <Recommend />,
    mypage: <Mypage />,
  };

  return (
    <div>
      <Container>
        <LogoButton onClick={handleClickButton} name={MAIN_DATA[0].name}>
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText>{MAIN_DATA[0].text}</LogoText>
        </LogoButton>
        <ButtonWrapper>
          {MAIN_DATA.slice(1, 5).map((data) => (
            <Button onClick={handleClickButton} name={data.name} key={data.id}>
              {data.text}
            </Button>
          ))}
        </ButtonWrapper>
        <LoginButton onClick={handleClickButton} name={MAIN_DATA[5].name}>
          {MAIN_DATA[5].text}
        </LoginButton>
      </Container>
      <Content>
        {content ? selectComponent[content] : <Main />} {/* content에 따라 선택된 컴포넌트 렌더링 */}
      </Content>
    </div>
  );
};

export default Navbar;

const Container = styled.div`
  padding-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  width: 100%;
  margin-bottom: 1vh;
  border-bottom: 1px solid gray;
`;

const ButtonBase = styled.button`
  padding: 10px;
  margin-right: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const LogoButton = styled(ButtonBase)`
  background-color: white;
  display: flex;
  align-items: center;
  margin-left: 3rem;
`;

const LogoImage = styled.img`
  height: 5rem; 
  margin-left: 4rem;
`;

const LogoText = styled.span`
  font-size: 3rem;
  margin-left: 3.5rem;
`;

const Button = styled(ButtonBase)`
  background-color: white;
  margin-right: 10rem;
  font-size: 35px;
`;

const LoginButton = styled(ButtonBase)`
  background-color: white;
  font-size: 30px;
  margin-right: 5rem;
  color: gray;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
