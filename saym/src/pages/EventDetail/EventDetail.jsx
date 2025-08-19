import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as S from './EventDetailStyle';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import axiosInstance from '../../api/AxiosInstance';
import LoadingPage from '../../components/Loading/Loding';

const EventDetail = () => {
   const { id } = useParams();
   const eventId = Number(id);
   const scrollRef = useHorizontalScroll();

   const [event, setEvent] = useState(null);
   const [restaurants, setRestaurants] = useState([]);
   const [isBookmarked, setIsBookmarked] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const startTime = Date.now();

         try {
            // 행사 상세 조회
            const eventRes = await axiosInstance.get(
               `/api/v1/event/detail/${id}`,
            );
            // console.log(eventRes.data);
            if (eventRes.data.statusCode === 200) {
               setEvent(eventRes.data.data);
            }

            // 근처 맛집 조회
            const restaurantRes = await axiosInstance.get(
               `/api/v1/event/detail/store/${eventId}`,
            );
            console.log('근처 맛집 응답:', restaurantRes.data);

            if (
               Array.isArray(restaurantRes.data) &&
               restaurantRes.data.length > 0
            ) {
               setRestaurants(restaurantRes.data.slice(0, 3));
            } else {
               console.warn('맛집 데이터 없음:', restaurantRes.data);
            }

            // 북마크 목록 조회 -> 현재 이벤트가 포함되어 있는지 확인
            const bookmarkRes = await axiosInstance.get(
               `/api/v1/event/bookmark`,
            );
            const bookmarkedEvents = bookmarkRes.data?.data || [];
            const isBookmarkedEvent = bookmarkedEvents.some(
               (e) => e.eventId === Number(id),
            );
            setIsBookmarked(isBookmarkedEvent);
         } catch (error) {
            console.error('데이터 조회 실패:', error);
         } finally {
            // 최소 2초 로딩
            const elapsed = Date.now() - startTime;
            const remainingTime = 2000 - elapsed;
            if (remainingTime > 0) {
               setTimeout(() => setLoading(false), remainingTime);
            } else {
               setLoading(false);
            }
         }
      };

      fetchData();
   }, [id]);

   // 북마크 토글 (추가만 가능)
   const handleBookmark = async () => {
      try {
         const res = await axiosInstance.post(`/api/v1/event/bookmark/${id}`);
         if (res.data.statusCode === 200) {
            setIsBookmarked(true); // 해제 API 없으므로 true만 설정
         }
      } catch (error) {
         console.error('북마크 저장 실패:', error);
      }
   };

   if (loading) return <LoadingPage />;
   if (!event) return <div>이벤트 정보를 찾을 수 없습니다.</div>;

   return (
      <S.PageContainer>
         <Header />
         <S.ContentWrapper>
            <S.EventHeaderContainer>
               {event.pictureUrl ? (
                  <img
                     src={event.pictureUrl}
                     alt={event.eventName}
                     style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '12px',
                     }}
                  />
               ) : (
                  <S.EventImagePlaceholder />
               )}
               <S.EventInfoWrapper>
                  <S.TitleWrapper>
                     <S.EventTitle>{event.eventName}</S.EventTitle>
                     <S.BookmarkWrapper
                        onClick={handleBookmark}
                        style={{ cursor: 'pointer' }}
                     >
                        {isBookmarked ? (
                           <FaBookmark size={24} color="#4daeff" />
                        ) : (
                           <FaRegBookmark size={24} color="#4daeff" />
                        )}
                     </S.BookmarkWrapper>
                  </S.TitleWrapper>
                  <S.EventDate>
                     {event.eventStartDate} ~ {event.eventEndDate}
                  </S.EventDate>
               </S.EventInfoWrapper>
            </S.EventHeaderContainer>

            <S.ContentSection>
               <S.DescriptionText>
                  {event.content}
                  <br />
               </S.DescriptionText>
               <S.FindRoute>주소 : {event.addless || '정보 없음'}</S.FindRoute>
            </S.ContentSection>

            <S.Divider />

            <S.NearbySection>
               <S.SectionTitle>근처 맛집</S.SectionTitle>
               <S.PlaceList ref={scrollRef}>
                  {restaurants.map((restaurant) => (
                     <Link
                        to={`/store/${restaurant.id}`}
                        key={restaurant.id}
                        style={{ textDecoration: 'none' }}
                     >
                        <S.PlaceCard>
                           <S.PlaceImageWrapper>
                              {restaurant.pictureUrl ? (
                                 <img
                                    src={restaurant.pictureUrl}
                                    alt={restaurant.name}
                                    style={{
                                       width: '100%',
                                       height: '100%',
                                       objectFit: 'cover',
                                    }}
                                 />
                              ) : (
                                 <div
                                    style={{
                                       width: '100%',
                                       height: '100%',
                                       backgroundColor: '#ddd',
                                    }}
                                 />
                              )}
                           </S.PlaceImageWrapper>
                           <S.PlaceName>{restaurant.name}</S.PlaceName>
                        </S.PlaceCard>
                     </Link>
                  ))}
               </S.PlaceList>
            </S.NearbySection>
         </S.ContentWrapper>
      </S.PageContainer>
   );
};

export default EventDetail;
