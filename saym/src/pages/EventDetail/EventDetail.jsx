import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './EventDetailStyle';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'; // 1. 커스텀 훅 import

const dummyEvents = [
   {
      id: 1,
      title: '행사 1',
      date: '2025/07/31~2025/09/25',
      description: '자세한 내용. 지도 첨부파일이 있을시 보여주기.',
   },
   {
      id: 2,
      title: '행사 2',
      date: '2025/08/15~2025/08/20',
      description: '자세한 내용. 지도 첨부파일이 있을시 보여주기.',
   },
   {
      id: 3,
      title: '행사 3',
      date: '2025/08/15~2025/08/20',
      description: '자세한 내용. 지도 첨부파일이 있을시 보여주기.',
   },
   {
      id: 4,
      title: '행사 4',
      date: '2025/08/15~2025/08/20',
      description: '자세한 내용. 지도 첨부파일이 있을시 보여주기.',
   },
   {
      id: 5,
      title: '행사 5',
      date: '2025/08/15~2025/08/20',
      description: '자세한 내용. 지도 첨부파일이 있을시 보여주기.',
   },
   {
      id: 6,
      title: '행사 6',
      date: '2025/08/15~2025/08/20',
      description: '행사 2의 상세 내용입니다.',
   },
];
const dummyRestaurants = [
   { id: 1, name: '맛집 1' },
   { id: 2, name: '맛집 2' },
   { id: 3, name: '맛집 3' },
   { id: 4, name: '맛집 4' },
   { id: 5, name: '맛집 5' },
   { id: 6, name: '맛집 6' },
   { id: 7, name: '맛집 7' },
   { id: 8, name: '맛집 8' },
];

const EventDetail = () => {
   // 2. 훅은 반드시 컴포넌트 함수 안 최상단에서 호출해야 합니다.
   const scrollRef = useHorizontalScroll();

   const { id } = useParams();
   const event = dummyEvents.find((e) => e.id === parseInt(id));
   const [isBookmarked, setIsBookmarked] = useState(false);

   // Dot 인디케이터는 일단 시각적으로만 표시합니다.
   const dots = Array.from({ length: Math.ceil(dummyRestaurants.length / 3) });
   const [activeDotIndex, setActiveDotIndex] = useState(0);

   if (!event) {
      return <div>이벤트 정보를 찾을 수 없습니다.</div>;
   }

   return (
      <S.PageContainer>
         <Header />
         <S.ContentWrapper>
            {/* 상단 섹션 */}
            <S.EventHeaderContainer>
               <S.EventImagePlaceholder />
               <S.EventInfoWrapper>
                  <S.TitleWrapper>
                     <S.EventTitle>{event.title}</S.EventTitle>
                     <S.BookmarkWrapper
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        style={{ cursor: 'pointer' }}
                     >
                        {isBookmarked ? (
                           <FaBookmark size={24} color="#4daeff" />
                        ) : (
                           <FaRegBookmark size={24} color="#4daeff" />
                        )}
                     </S.BookmarkWrapper>
                  </S.TitleWrapper>
                  <S.EventDate>{event.date}</S.EventDate>
               </S.EventInfoWrapper>
            </S.EventHeaderContainer>

            {/* 중간 콘텐츠 섹션 */}
            <S.ContentSection>
               <S.DescriptionText>
                  {event.description}
                  <br />
                  지도 첨부파일이 있을시 보여주기.
               </S.DescriptionText>
               <S.FindRoute>+ 주소, 주차장, 대중교통 이용안내</S.FindRoute>
            </S.ContentSection>

            <S.Divider />

            {/* 하단 '근처 맛집' 섹션 */}
            <S.NearbySection>
               <S.SectionTitle>근처 맛집</S.SectionTitle>

               {/* 3. 훅이 반환한 ref를 스크롤할 요소에 연결합니다. */}
               <S.PlaceList ref={scrollRef}>
                  {dummyRestaurants.map((restaurant) => (
                     <S.PlaceCard key={restaurant.id}>
                        {restaurant.name}
                     </S.PlaceCard>
                  ))}
               </S.PlaceList>
            </S.NearbySection>
         </S.ContentWrapper>
      </S.PageContainer>
   );
};

export default EventDetail;
