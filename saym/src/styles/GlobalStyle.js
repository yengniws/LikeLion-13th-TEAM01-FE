import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import PretendardRegular from '../assets/font/Pretendard-Light.otf';
import PretendardMedium from '../assets/font/Pretendard-Medium.otf';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url(${PretendardRegular}) format('opentype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url(${PretendardMedium}) format('opentype');
  }

  :root {
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    font-weight: var(--font-weight-regular);
    background-color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    width: 100%;
    max-width: 390px;
    min-height: 100svh;
    margin: 0 auto;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
  }
`;

export default GlobalStyle;
