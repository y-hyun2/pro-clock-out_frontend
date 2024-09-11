// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('/fonts/NotoSansKR-VariableFont_wght.ttf') format('truetype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Gmarket Sans Bold';
    src: url('/fonts/GmarketSansTTFBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gmarket Sans Medium';
    src: url('/fonts/GmarketSansTTFMedium.ttf') format('truetype');
    font-weight: medium;
    font-style: normal;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  main {
    flex: 1;
  }
`;
