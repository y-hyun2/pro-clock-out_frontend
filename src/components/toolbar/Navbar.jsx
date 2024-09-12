import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainLogo from "../logo/MainLogo";
import { useAuth } from "../../AuthContext";
import { colors } from "../../styles/theme";

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
  display: flex;
  justify-content: space-between; /* 양쪽에 로고와 버튼 정렬 */
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${colors.white};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px solid ${colors.gray};

  @media (max-width: 768px) {
    flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
    padding: 1rem;
  }
`;

const ButtonBase = styled.button`
  padding: 10px;
  margin-right: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const Button = styled(ButtonBase)`
  background-color: white;
  margin-right: 2rem;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem; /* 작은 화면에서는 버튼 크기 축소 */
    margin-right: 1rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; /* 더 작은 화면에서는 더 축소 */
    margin-right: 0.5rem;
  }
`;

const LoginButton = styled(ButtonBase)`
  background-color: ${colors.main};
  font-size: 1.5rem;
  margin-right: 2rem;
  color: ${colors.white};
  border-radius: 10px;
  padding: 10px 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
    align-items: center;
    width: 100%;
  }
`;
