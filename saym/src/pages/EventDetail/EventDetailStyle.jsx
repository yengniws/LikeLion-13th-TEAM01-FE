import styled from 'styled-components';

// 전체 페이지의 기본 틀을 잡습니다.
export const PageContainer = styled.div`
   width: 100%;
   height: 100dvh;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   position: relative;
   padding-top: 75px;
`;

// 헤더를 제외한 실제 콘텐츠 영역을 감싸며, 여백을 담당합니다.
export const ContentWrapper = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   overflow-y: auto; /* 세로 스크롤은 여기서 담당 */
   padding: 25px; /* 고정 헤더 높이만큼 추가 여백 */
`;

// --- 상단 (이미지, 제목, 날짜) ---
export const EventHeaderContainer = styled.div`
   display: flex;
   gap: 16px;
   margin-bottom: 16px;
`;

export const EventImagePlaceholder = styled.div`
   width: 100px;
   height: 100px;
   background-color: #f0f0f0;
   border-radius: 8px;
   flex-shrink: 0;
`;

export const EventInfoWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding-top: 4px;
`;

export const TitleWrapper = styled.div`
   display: flex;
   /* justify-content: space-between; */ /* <- 이 줄을 삭제하거나 주석 처리하세요 */
   align-items: center;
   margin-bottom: 8px;
   gap: 8px; /* <- 제목과 아이콘 사이의 간격을 위해 이 줄을 추가하세요 */
`;

export const EventTitle = styled.h1`
   font-size: 22px;
   font-weight: bold;
   margin: 0;
`;
// 북마크 아이콘을 위한 새로운 스타일 컴포넌트
export const BookmarkWrapper = styled.div`
   cursor: pointer;
   display: flex; // 아이콘의 정렬을 위해 추가
   align-items: center; // 아이콘의 정렬을 위해 추가
`;

export const EventDate = styled.p`
   font-size: 14px;
   color: #888;
   margin: 4px 0 0;
   padding-top: 40px;
`;

// --- 중간 (자세한 내용, 길찾기) ---
export const ContentSection = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 16px 0;
   color: #000000;
   font-size: 16px;
   line-height: 1.6;
   min-height: 150px;
`;

export const DescriptionText = styled.p`
   margin: 10px;
   text-align: left;
`;

export const FindRoute = styled.p`
   background: none;
   border: none;
   color: #4daeff;
   font-size: 16px;
   font-weight: 500;
   padding: 0;
   text-align: center;
   margin-top: 16px;
`;

// --- 하단 (근처 맛집) ---
export const Divider = styled.hr`
   border: none;
   border-top: 1px solid #4daeff;
   margin: 24px 0;
`;

export const NearbySection = styled.div`
   margin-bottom: 15px;
`;

export const SectionTitle = styled.h3`
   font-size: 18px;
   font-weight: 600;
   margin: 0 0 23px 5px;
`;

export const PlaceList = styled.div`
   display: flex;
   overflow-x: auto;
   gap: 12px;

   /* 기본 스크롤바 숨기기 (useHorizontalScroll 훅 사용 시 더 깔끔해 보임) */
   -ms-overflow-style: none;
   scrollbar-width: none;
   &::-webkit-scrollbar {
      display: none;
   }
`;

export const PlaceCard = styled.div`
   width: 105px;
   height: 105px;
   background-color: #f0f0f0;
   border-radius: 8px;
   flex-shrink: 0; /* 아이템 크기가 줄어들지 않도록 설정 */

   /* 카드 내 텍스트 스타일 (예시) */
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
`;

export const DotIndicatorContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 8px;
   margin-top: 20px;
`;
