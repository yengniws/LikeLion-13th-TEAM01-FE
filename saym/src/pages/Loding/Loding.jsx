// src/pages/Loading/Loading.jsx

import React from 'react';
// 1. styled-components와 애니메이션을 위한 keyframes를 불러옵니다.
import styled, { keyframes } from 'styled-components';
import logo from '../../assets/logo.png';

// 2. 통통 튀는 애니메이션 효과를 keyframes로 정의합니다.
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// 3. 스타일이 적용된 컴포넌트들을 만듭니다.
const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   background-color: #ffffff;
`;

const LogoImage = styled.img`
   width: 150px;
   /* 위에서 정의한 bounce 애니메이션을 적용합니다. */
   animation: ${bounce} 1.5s infinite;
`;

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
