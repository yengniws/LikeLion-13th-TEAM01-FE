import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle `
  /* 1. reset.css 적용 */
  ${reset}

  /* 2. 공통 폰트 및 전역 스타일 */
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;  /* 폰트 변경 필요 */
    background-color: #eee;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;

    /* 3. 화면 규격 사이즈 고정 (중앙 정렬) */
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  #root {
    /* 앱 화면 규격 (예: 모바일 앱 크기) */
    width: 100%;
    max-width: 390px;
    min-height: 100vh;

    /* 스크롤 시 iOS에서 부드럽게 */
    -webkit-overflow-scrolling: touch;
  }
`;

export default GlobalStyle;