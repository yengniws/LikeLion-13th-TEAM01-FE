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

export const KakaoImg = styled.img`
   width: 90%;
   max-width: 400px;
   cursor: pointer;
   object-fit: contain;
`;
