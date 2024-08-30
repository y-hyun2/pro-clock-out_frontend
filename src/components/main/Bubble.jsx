import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { colors } from '../../styles/theme';

// 애니메이션 키프레임 설정
const bounce = keyframes`
  0%, 20%, 50%, 75%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// 스타일 컴포넌트 설정
const BubbleStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  margin-left: 10px;
  color: ${colors.white};
  border-radius: 15px;
  background-color: ${colors.main};
  font-size: 32px;
  font-weight: bold;
  width: 60vw;
  height: auto;
  box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
  position: relative; /* 말풍선 꼬리 위치 설정에 필요 */

  /* 애니메이션 적용 */
  animation: ${bounce} 2s infinite;

  /* 말풍선 꼬리 */
  &:after {
    content: "";
    position: absolute;
    top: 21px;
    left: -30px;
    border-right: 30px solid ${colors.main};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
`;

const Bubble = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "20자 이내의 랜덤 응원 메시지를 작성해줘." }],
          max_tokens: 60,
          temperature: 0.7
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
    
        const aiMessage = response.data.choices[0].message.content.trim();
        setMessage(aiMessage);
      } catch (error) {
        console.error('에러 패칭 메시지:', error);
        setMessage('응원 메시지를 가져오지 못했습니다.');
      }
    };

    fetchMessage();
  }, []);
  
  return <BubbleStyles>{message || '로딩중...'}</BubbleStyles>;
};

export default Bubble;