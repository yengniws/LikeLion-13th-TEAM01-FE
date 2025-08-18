import styled, { keyframes } from 'styled-components';

// 화면 전체를 덮는 컨테이너 스타일
export const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100dvh;
`;

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); 
  }
  100% {
    transform: translateY(0);
  }
`;

export const LogoImage = styled.img`
   width: 250px;
   max-width: 100%;
   height: auto;
   animation: ${moveUpDown} 2.5s ease-in-out infinite alternate;
`;
