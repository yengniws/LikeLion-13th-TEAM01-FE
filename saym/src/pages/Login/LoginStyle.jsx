import styled from 'styled-components';

// 화면 전체를 감싸는 컨테이너
export const Container = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
   padding: 20px;
`;

// 프로필 이미지가 들어갈 원
export const LogoCircle = styled.div`
   margin-bottom: 150px;
   display: flex;
   justify-content: center;
`;

export const Logoimg = styled.img`
   width: 90%;
   height: 90%;
   border-radius: 50%;
   object-fit: contain;
`;

// 카카오 로그인 버튼 컴포넌트
export const KakaoButton = styled.div`
   background-color: #fee500;
   color: #000000;
   border: none;
   border-radius: 12px;
   padding: 15px 0;
   width: 90%;
   max-width: 400px;
   font-size: 16px;
   font-weight: bold;
   cursor: pointer;

   display: flex;
   justify-content: center;
   align-items: center;
   text-decoration: none; /* a 태그의 기본 밑줄 제거 */
   gap: 8px; /* 아이콘과 텍스트 사이 간격 */

   img {
      height: 20px; /* 아이콘 크기를 조절 */
      width: auto;
   }
`;
