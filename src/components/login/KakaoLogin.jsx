import React from "react";
import styled from "styled-components";
import kakaoLogin from "../../img/kakao_login.png";

const KakaoLogin = () => {
return (<div><KakaoLoginStyle src={kakaoLogin} /></div>)
};

export default KakaoLogin;

const KakaoLoginStyle = styled.img`
  margin-top: 2rem;
  width: 46rem;
`;