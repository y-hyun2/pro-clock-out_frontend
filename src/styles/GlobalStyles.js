// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
