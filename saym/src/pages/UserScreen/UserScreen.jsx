import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   FaFilter,
   FaChevronDown,
   FaBookmark,
   FaRegBookmark,
} from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

import axiosInstance from '../../api/AxiosInstance';
import * as S from './UserScreenStyle';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import FilterModal from './Filter/FilterModal';
import LoadingPage from '../../components/Loading/Loding';

const UserScreen = () => {
   const navigate = useNavigate();

   const [events, setEvents] = useState([]);
   const [loading, setLoading] = useState(true);
   const [filterLoading, setFilterLoading] = useState(false);
   const [error, setError] = useState(null);

   const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   const [isSortOpen, setIsSortOpen] = useState(false);
   const [sortOrder, setSortOrder] = useState('date');

   const [selectedAreas, setSelectedAreas] = useState([]);

   useEffect(() => {
      const fetchEvents = async () => {
         if (events.length === 0) {
            setLoading(true);
         } else {
            setFilterLoading(true);
         }

         setError(null);
         const startTime = Date.now();

         try {
            let eventsRes;
            const hasFilters = selectedAreas.length > 0;

            if (hasFilters) {
               const params = { areas: selectedAreas.join(',') };
               eventsRes = await axiosInstance.get('/api/v1/event/filter', {
                  params,
               });
            } else {
               eventsRes = await axiosInstance.get('/api/v1/event');
            }

            const bookmarksRes = await axiosInstance.get(
               '/api/v1/event/bookmark',
            );

            const formattedData = eventsRes.data.data.map((item) => ({
               id: item.eventId,
               title: item.eventName,
               date: `${item.eventStartDate.replaceAll('-', '/')}~${item.eventEndDate.replaceAll('-', '/')}`,
               imageUrl: item.pictureUrl || '/default-event-image.png',
            }));

            const bookmarkedIds = bookmarksRes.data.data.map(
               (item) => item.eventId,
            );

            setEvents(formattedData);
            setBookmarkedEvents(bookmarkedIds);
         } catch (err) {
            console.error('❌ 이벤트 목록 로딩 실패:', err);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
         } finally {
            const elapsed = Date.now() - startTime;
            const remaining = 2000 - elapsed;

            if (events.length === 0) {
               // 첫 로딩일 경우 전체 페이지 로딩
               if (remaining > 0) {
                  setTimeout(() => setLoading(false), remaining);
               } else {
                  setLoading(false);
               }
            } else {
               // 필터 재조회일 경우 스피너만
               if (remaining > 0) {
                  setTimeout(() => setFilterLoading(false), remaining);
               } else {
                  setFilterLoading(false);
               }
            }
         }
      };

      fetchEvents();
   }, [selectedAreas]);

   const sortedEvents = useMemo(() => {
      const sortableEvents = [...events];
      if (sortOrder === 'name') {
         return sortableEvents.sort((a, b) => a.title.localeCompare(b.title));
      }
      return sortableEvents.sort(
         (a, b) =>
            new Date(a.date.split('~')[0]) - new Date(b.date.split('~')[0]),
      );
   }, [events, sortOrder]);

   const openFilterModal = () => setIsFilterOpen(true);
   const closeFilterModal = () => setIsFilterOpen(false);
   const handleCardClick = (eventId) => navigate(`/event/${eventId}`);

   const handleFilterApply = (appliedAreas) => {
      setSelectedAreas(appliedAreas);
      closeFilterModal();
   };

   const handleBookmarkClick = async (e, eventId) => {
      e.stopPropagation();

      const isBookmarked = bookmarkedEvents.includes(eventId);

      try {
         if (isBookmarked) {
            setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
            await axiosInstance.delete(`/api/v1/event/bookmark/${eventId}`);
         } else {
            setBookmarkedEvents((prev) => [...prev, eventId]);
            await axiosInstance.post(`/api/v1/event/bookmark/${eventId}`);
         }
      } catch (err) {
         console.error('북마크 처리 중 에러 발생:', err);

         if (isBookmarked) {
            setBookmarkedEvents((prev) => [...prev, eventId]);
         } else {
            setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
         }
      }
   };

   const handleSortSelect = (order) => {
      setSortOrder(order);
      setIsSortOpen(false);
   };

   // 첫 진입 시 전체 로딩
   if (loading) return <LoadingPage />;
   if (error) return <div>{error}</div>;

   return (
      <S.PageContainer>
         <Header />

         <S.ControlsContainer>
            <S.FilterButton onClick={openFilterModal}>
               <FaFilter size={14} />
               <span>필터</span>
            </S.FilterButton>
            <S.SortButton onClick={() => setIsSortOpen((prev) => !prev)}>
               <span>정렬</span>
               <FaChevronDown size={14} />
            </S.SortButton>

            {isSortOpen && (
               <S.SortDropdownContainer>
                  <S.SortOptionButton onClick={() => handleSortSelect('name')}>
                     가나다순
                  </S.SortOptionButton>
                  <S.SortOptionButton onClick={() => handleSortSelect('date')}>
                     날짜 빠른 순
                  </S.SortOptionButton>
               </S.SortDropdownContainer>
            )}
         </S.ControlsContainer>

         {isFilterOpen && (
            <FilterModal
               onClose={closeFilterModal}
               onApply={handleFilterApply}
               initialAreas={selectedAreas}
            />
         )}

         {/* 필터 적용 시 스피너만 */}
         {filterLoading ? (
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  zIndex: 1000,
               }}
            >
               <ClipLoader size={35} color="#4daeff" />
            </div>
         ) : (
            <S.EventList>
               {sortedEvents.map((event) => {
                  const isBookmarked = bookmarkedEvents.includes(event.id);
                  return (
                     <S.EventCardContainer
                        key={event.id}
                        onClick={() => handleCardClick(event.id)}
                     >
                        <S.EventImage src={event.imageUrl} alt={event.title} />
                        <S.EventInfo>
                           <S.EventTitle>{event.title}</S.EventTitle>
                           <S.EventDate>{event.date}</S.EventDate>
                        </S.EventInfo>
                        <S.BookmarkIconWrapper
                           $isBookmarked={isBookmarked}
                           onClick={(e) => handleBookmarkClick(e, event.id)}
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
         )}
      </S.PageContainer>
   );
};

export default UserScreen;
