import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import PretendardRegular from '../assets/font/Pretendard-Light.otf';

const GlobalStyle = createGlobalStyle`
  /* 1. reset.css 적용 */
  ${reset}

  /* 2. 공통 폰트 및 전역 스타일 */
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url(${PretendardRegular}) format('truetype');
  }


  body {
    font-family: 'Pretendard', sans-serif;
    background-color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;

    /* 3. 화면 규격 사이즈 고정 (중앙 정렬) */
    height: 100%;
  }

  #root {
    /* 모바일 앱 화면 규격 */
    width: 100%;
    max-width: 390px;
    min-height: 100svh;
    margin: 0 auto;
    background-color: #fff;

    /* 스크롤 시 iOS에서 부드럽게 */
    -webkit-overflow-scrolling: touch;
  }
`;

export default GlobalStyle;
