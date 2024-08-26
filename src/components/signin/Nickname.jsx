import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AccountTitle from "./AccountTitle";
import Titlediv from "./TitleDiv";
import LoginButton from "../login/LoginButton";
import NicknameButton from "./NicknameButton";
import { useNavigate } from "react-router-dom";
const Nickname = () => {
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();
  const handleNickname = async () => {
    try {
      const response = await axios.put(
        "https://www.proclockout.com/api/v1/members/me/profile/nickname",
        {
          nickname: nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authorization"),
          },
          withCredentials: true,
        }
      );
      //console.log(response);
      alert("닉네임이 수정되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error response:", error.response);
    }
  };

  return (
    <div>
      <Wrapper>
        <Titlediv />
        <NicknameWrapper>
          <AccountTitle>닉네임을 설정해주세요</AccountTitle>
          <NicknameButton placeholder="닉네임" setNickname={setNickname} />
          <StyledLoginButton>
            <LoginButton onClick={handleNickname}>설정 완료</LoginButton>
          </StyledLoginButton>
        </NicknameWrapper>
      </Wrapper>
    </div>
  );
};

export default Nickname;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NicknameWrapper = styled.div`
  margin-top: 14.3rem;
  display: flex;
  width: 35%;
  flex-direction: column;
  align-items: center;
`;

const StyledLoginButton = styled.div`
  margin-top: 0rem;
`;
