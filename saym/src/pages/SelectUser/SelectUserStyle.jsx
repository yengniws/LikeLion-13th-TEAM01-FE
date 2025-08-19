import styled from 'styled-components';

// 화면 전체를 감싸는 컨테이너
export const Container = styled.div`
   display: flex;
   flex-direction: column; /* 아이템을 세로로 정렬 */
   justify-content: center; /* 세로 중앙 정렬 */
   align-items: center; /* 가로 중앙 정렬 */
   height: 100dvh;
   padding: 20px;
`;

// "유저 정보를 선택해주세요" 텍스트
export const Title = styled.h1`
   font-size: 1.5rem; // 24px
   font-weight: 800;
   margin-bottom: 30px;
   margin-top: 20px;
`;

// 프로필 이미지가 들어갈 원
export const LogoCircle = styled.div`
   margin-top: 20px;
   margin-bottom: 20px; /* 아래 버튼과의 간격 */
   display: flex;
   justify-content: center; /* 가로 가운데 */
`;

export const Logoimg = styled.img`
   width: 90%;
   height: 90%;
   border-radius: 50%;
   object-fit: contain;
`;

// 버튼 기본 스타일
export const StyledButton = styled.button`
   width: 100%;
   max-width: 300px; // 버튼의 최대 너비 제한
   padding: 15px;
   margin-bottom: 20px;
   border: none;
   border-radius: 12px;
   background-color: #4daeff; // 이미지의 버튼 색상
   color: white;
   font-size: 1rem; // 16px
   font-weight: bold;
   cursor: pointer;
   transition: background-color 0.2s;

   &:hover {
      background-color: #5a95f0; // 마우스를 올렸을 때 살짝 어둡게
   }
`;
