import styled from 'styled-components';

// 화면 전체를 덮는 컨테이너 스타일
export const LodingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 90vh;
`;

// 로고 이미지 스타일
export const LogoImage = styled.img`
   width: 250px;
   max-width: 100%;
   height: auto;
   /* 여기에 추가적인 애니메이션이나 다른 스타일을 적용할 수 있습니다 */
`;
