import styled, { keyframes } from 'styled-components';

// 화면 전체를 감싸는 컨테이너
export const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100dvh;
   padding: 20px;
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

// 프로필 이미지가 들어갈 원
export const LogoCircle = styled.div`
   margin-bottom: 100px;
   display: flex;
   justify-content: center;
   width: 350px;
   animation: ${moveUpDown} 2.5s ease-in-out infinite alternate;
`;

export const Logoimg = styled.img`
   width: 90%;
   height: 90%;
   border-radius: 50%;
   object-fit: contain;
`;

export const KakaoImg = styled.img`
   width: 90%;
   max-width: 400px;
   cursor: pointer;
   object-fit: contain;
`;
