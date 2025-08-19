import styled from 'styled-components';

// 전체 페이지를 감싸는 컨테이너
export const PageContainer = styled.div`
   width: 100%;
   height: 100dvh;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   padding: 30px;
   position: relative;
   padding-top: 75px;
`;

// 필터와 정렬 버튼을 감싸는 컨테이너
export const ControlsContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 30px;
   /* 헤더가 없어진 만큼 상단 여백 추가 */
   margin-top: 24px;
   position: relative;
`;

// 공통 버튼 스타일
const BaseButton = styled.button`
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 5px 15px;
   border-radius: 10px;
   border: none;
   background-color: #4daeff;
   font-size: 15px;
   color: white;
   cursor: pointer;

   &:hover {
      background-color: #13495b80;
   }
`;

// 필터 버튼
export const FilterButton = styled(BaseButton)``;

// 정렬 버튼
export const SortButton = styled(BaseButton)``;

// 이벤트 목록을 감싸는 리스트
export const EventList = styled.ul`
   list-style: none;
   padding: 0;
   margin: 0;
   flex: 1; /* 남은 공간을 모두 차지 */
   -ms-overflow-style: none; /* for Internet Explorer, Edge */
   scrollbar-width: none; /* for Firefox */
   overflow-y: scroll;
`;

// 각 이벤트 카드를 감싸는 컨테이너
export const EventCardContainer = styled.li`
   position: relative;
   display: flex;
   gap: 16px;
   cursor: pointer;
   padding-bottom: 30px;
   margin-bottom: 30px;
   border-bottom: 1px solid #f0f0f0;
`;

// 이벤트 이미지 (회색 네모)
export const EventImage = styled.img`
   width: 100px;
   height: 100px;
   background-color: #f0f0f0;
   border-radius: 8px;
   flex-shrink: 0;
`;

// 이벤트 정보 (제목, 날짜)
export const EventInfo = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

// 이벤트 제목
export const EventTitle = styled.h2`
   font-size: 16px;
   font-weight: 600;
   margin: 0 0 8px 0;
   color: #333;
`;

// 이벤트 날짜
export const EventDate = styled.p`
   font-size: 14px;
   color: #888;
   margin: 0;
`;

// 북마크 아이콘
export const BookmarkIconWrapper = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   cursor: pointer;
   color: #4daeff;
`;
export const SortDropdownContainer = styled.div`
   position: absolute;
   top: 40px; /* 정렬 버튼 바로 아래에 위치 */
   right: 0;
   width: 120px;
   background-color: white;
   border-radius: 8px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   z-index: 10;
   display: flex;
   flex-direction: column;
   overflow: hidden; /* border-radius 적용을 위해 */
`;

export const SortOptionButton = styled.button`
   width: 100%;
   padding: 10px 12px;
   border: none;
   background-color: white;
   text-align: left;
   font-size: 14px;
   color: #333;
   cursor: pointer;

   &:hover {
      background-color: #f5f5f5;
   }
`;
