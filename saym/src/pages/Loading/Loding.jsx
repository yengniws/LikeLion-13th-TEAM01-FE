// src/pages/Loading/Loading.jsx

import { LoadingContainer, LogoImage } from './LodingStyle';
import logo from './images/logo.png';

// 메인 로딩 화면 컴포넌트
const LoadingScreen = () => {
   return (
      // 4. className 대신 위에서 만든 스타일 컴포넌트를 태그처럼 사용합니다.
      <LoadingContainer>
         <LogoImage src={logo} alt="Loading Logo" />
      </LoadingContainer>
   );
};

export default LoadingScreen;
