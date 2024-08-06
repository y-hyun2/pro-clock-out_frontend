import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainLogo from "../logo/MainLogo";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // assuming logout is provided by useAuth

  const goToAnalytics = () => {
    navigate("/analytics");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToCalander = () => {
    navigate("/calander");
  };

  const goToDaily = () => {
    navigate("/daily");
  };

  const goToRecommend = () => {
    navigate("/recommend");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authorization");
      logout();
      console.log(isLoggedIn);
      alert("로그아웃 되었습니다.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div>
      <Container>
        <MainLogo></MainLogo>
        {isLoggedIn && (
          <ButtonWrapper>
            <Button onClick={goToAnalytics}>워라밸 분석</Button>
            <Button onClick={goToCalander}>캘린더</Button>
            <Button onClick={goToDaily}>데일리</Button>
            <Button onClick={goToRecommend}>추천활동</Button>
            <Button onClick={goToMypage}>마이페이지</Button>
          </ButtonWrapper>
        )}
        <LoginButton onClick={isLoggedIn ? handleLogout : goToLogin}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </LoginButton>
      </Container>
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
  margin-bottom: 0;
  border-bottom: 1px solid lightgray;
`;

const ButtonBase = styled.button`
  padding: 10px;
  margin-right: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

//마이페이지(임시) 때문에 약간 비좁아보일 수 있음. 추후 간격 조정할것임.
const Button = styled(ButtonBase)`
  background-color: white;
  margin-right: 8rem;
  font-size: 2.5rem;
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
