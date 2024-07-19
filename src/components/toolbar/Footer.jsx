import React from "react";
import styled from "styled-components";
import MainLogo from "../logo/MainLogo";

const Footer = () => {
  return (
    <div>
      <FooterDiv>
        <Wrapper>
          <StyledMainLogo />
          <InnerWrapper>
            <InfoText>example-email@naver.com | instagram @standard</InfoText>
            <CopyRight>
              Copyright @ 2024 퇴근의정석 All rights reserved.
            </CopyRight>
          </InnerWrapper>
        </Wrapper>
      </FooterDiv>
    </div>
  );
};

export default Footer;

const FooterDiv = styled.div`
  border-top: 1px solid lightgray;
  width: 100%;
  margin-top: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

//이메일, 저작권 감싸는 div
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoText = styled.p`
  font-size: 2rem;
  color: lightgray;
  margin-left: 8rem;
  margin-top: 0;
`;

const CopyRight = styled.p`
  font-size: 2rem;
  color: lightgray;
  margin-top: 0;
  margin-left: 53rem;
`;

const StyledMainLogo = styled(MainLogo)`
  opacity: 30%;
  color: gray;
  margin-left: 3rem;
`;
