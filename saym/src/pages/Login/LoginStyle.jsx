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

// '로그인' 텍스트
export const Title = styled.h1`
   font-size: 28px;
   font-weight: bold;
   margin-bottom: 80px; /* 아래 요소와의 간격 */
`;

// 프로필 이미지가 들어갈 원
export const LogoCircle = styled.div`
   margin-bottom: 100px; /* 아래 버튼과의 간격 */
   display: flex;
   justify-content: center; /* 가로 가운데 */
`;

// 카카오 로그인 버튼
export const KakaoButton = styled.button`
   background-color: #fee500; /* 카카오 공식 노란색 */
   color: #000000; /* 글자색 검정 */
   border: none;
   border-radius: 12px;
   padding: 15px 0; /* 세로 패딩 15px, 가로 패딩 0 */
   width: 90%; /* 화면 가로 너비의 90% */
   max-width: 400px; /* 최대 너비 제한 */
   font-size: 16px;
   font-weight: bold;
   cursor: pointer; /* 마우스를 올리면 손가락 모양으로 변경 */
   display: flex;
   justify-content: center;
   align-items: center;

   /* 아이콘과 텍스트 사이에 간격 추가 */
   span {
      margin-left: 8px;
   }
`;
