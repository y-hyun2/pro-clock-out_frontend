import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// 로고 이미지 import
import logoImage from "../img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

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

  return (
    <div>
      <Container>
        <LogoButton onClick={goToMain}>
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText>퇴근의 정석</LogoText>
        </LogoButton>
        <ButtonWrapper>
          <Button onClick={goToAnalytics}>워라밸 분석</Button>
          <Button onClick={goToCalander}>캘린더</Button>
          <Button onClick={goToDaily}>데일리</Button>
          <Button onClick={goToRecommend}>추천활동</Button>
        </ButtonWrapper>

        <LoginButton onClick={goToLogin}>로그인</LoginButton>
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
