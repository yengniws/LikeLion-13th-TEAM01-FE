// 로그인 스타일 페이지
// src/loginstyle.jsx

import styled from 'styled-components';

// 화면 전체를 감싸는 컨테이너
export const Container = styled.div`
   display: flex;
   flex-direction: column; /* 아이템을 세로로 정렬 */
   justify-content: center; /* 세로 중앙 정렬 */
   align-items: center; /* 가로 중앙 정렬 */
   height: 100vh;
   padding: 20px;
`;

// 프로필 이미지가 들어갈 원
export const LogoCircle = styled.div`
   margin-bottom: 150px; /* 아래 버튼과의 간격 */
   display: flex;
   justify-content: center; /* 가로 가운데 */
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
