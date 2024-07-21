import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../img/logo.png";

const MainLogo = ({ className }) => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <LogoButton className={className} onClick={goToMain}>
      <LogoImage src={logoImage} alt="Logo" />
      <LogoText>퇴근의 정석</LogoText>
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
  height: 5rem;
  margin-left: 4rem;
`;

const LogoText = styled.span`
  font-size: 3rem;
  margin-left: 1rem;
`;
