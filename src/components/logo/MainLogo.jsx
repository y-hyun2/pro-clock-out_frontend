import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../img/logos/logo.png";
import logoText from "../../img/logos/logo_txt.png";

const MainLogo = ({ className }) => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <LogoButton className={className} onClick={goToMain}>
      <LogoImage src={logoImage} alt="Logo" />
      <LogoText src={logoText} alt="LogoText"></LogoText>
    </LogoButton>
  );
};

export default MainLogo;

const ButtonBase = styled.button`
  padding: 10px;
  margin-right: 1rem;
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
  height: 60px;
  margin-left: 4rem;
`;

const LogoText = styled.img`
  height: 50px;
  font-size: 3rem;
  margin-left: 1rem;
`;
