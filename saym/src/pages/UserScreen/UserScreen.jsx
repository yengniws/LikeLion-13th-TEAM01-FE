// 1. 헤더에서 사용하던 FaUserCircle 아이콘은 이제 필요 없으므로 제거합니다.
import {
   FaFilter,
   FaChevronDown,
   FaBookmark,
   FaRegBookmark,
} from 'react-icons/fa';
import * as S from './UserScreenStyle';
// 2. 완성된 Header 컴포넌트를 가져옵니다. (경로는 실제 파일 위치에 맞게 조정해주세요)
import Header from '../../components/Header/Header_ customer/Header_ customer';
import React, { useState } from 'react';
import FilterModal from './Filter/FilterModal';

const dummyEvents = [
   { id: 1, title: '행사 1', date: '2025/07/31~2025/09/25', imageUrl: '' },
   { id: 2, title: '행사 2', date: '2025/08/15~2025/08/20', imageUrl: '' },
   { id: 3, title: '행사 3', date: '2025/09/01~2025/09/30', imageUrl: '' },
   { id: 4, title: '행사 4', date: '2025/09/01~2025/09/30', imageUrl: '' },
   { id: 5, title: '행사 5', date: '2025/09/01~2025/09/30', imageUrl: '' },
];

const UserScreen = () => {
   // useState를 사용해 북마크된 이벤트의 id를 배열로 관리합니다.
   const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

   // 👇 2. 필터 모달의 열림/닫힘 상태를 관리할 useState를 추가합니다.
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   // 👇 3. 필터 모달을 여는 함수
   const openFilterModal = () => {
      setIsFilterOpen(true);
   };

   // 👇 4. 필터 모달을 닫는 함수
   const closeFilterModal = () => {
      setIsFilterOpen(false);
   };

   // 북마크 아이콘 클릭 시 호출될 함수
   const handleBookmarkClick = (eventId) => {
      // 이미 북마크된 이벤트인지 확인합니다.
      if (bookmarkedEvents.includes(eventId)) {
         // 이미 있다면, 해당 id를 배열에서 제거합니다 (북마크 취소).
         setBookmarkedEvents(bookmarkedEvents.filter((id) => id !== eventId));
      } else {
         // 없다면, 배열에 새로 추가합니다 (북마크).
         setBookmarkedEvents([...bookmarkedEvents, eventId]);
      }
   };
   return (
      <S.PageContainer>
         <Header />

         <S.ControlsContainer>
            <S.FilterButton onClick={openFilterModal}>
               <FaFilter size={14} />
               <span>필터</span>
            </S.FilterButton>
            <S.SortButton>
               <span>정렬</span>
               <FaChevronDown size={14} />
            </S.SortButton>
         </S.ControlsContainer>
         {isFilterOpen && <FilterModal onClose={closeFilterModal} />}
         <S.EventList>
            {dummyEvents.map((event) => {
               // 현재 이벤트가 북마크되었는지 확인합니다.
               const isBookmarked = bookmarkedEvents.includes(event.id);

               return (
                  <S.EventCardContainer key={event.id}>
                     <S.EventImage />
                     <S.EventInfo>
                        <S.EventTitle>{event.title}</S.EventTitle>
                        <S.EventDate>{event.date}</S.EventDate>
                     </S.EventInfo>
                     {/* isBookmarked 값에 따라 스타일과 아이콘을 변경합니다. */}
                     <S.BookmarkIconWrapper
                        isBookmarked={isBookmarked} // 👈 스타일링을 위해 props 전달
                        onClick={() => handleBookmarkClick(event.id)} // 👈 클릭 시 함수 호출
                     >
                        {isBookmarked ? (
                           <FaBookmark size={22} />
                        ) : (
                           <FaRegBookmark size={22} />
                        )}
                     </S.BookmarkIconWrapper>
                  </S.EventCardContainer>
               );
            })}
         </S.EventList>
      </S.PageContainer>
   );
};

export default UserScreen;
