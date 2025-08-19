import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   FaFilter,
   FaChevronDown,
   FaBookmark,
   FaRegBookmark,
} from 'react-icons/fa';

//필요한 모듈들을 가져옵니다.
import axiosInstance from '../../api/AxiosInstance'; // API 호출을 위한 axios 인스턴스
import * as S from './UserScreenStyle';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import FilterModal from './Filter/FilterModal';
import LoadingPage from '../../components/Loading/Loding'; // 로딩 컴포넌트

const UserScreen = () => {
   const navigate = useNavigate();

   //API로부터 받아온 데이터를 저장할 상태와 로딩, 에러 상태를 추가합니다.
   const [events, setEvents] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   // ✨ 1. 정렬 메뉴의 열림 상태와 정렬 기준 상태를 추가합니다.
   const [isSortOpen, setIsSortOpen] = useState(false);
   const [sortOrder, setSortOrder] = useState('date'); // 'date' 또는 'name'

   const [selectedAreas, setSelectedAreas] = useState([]);

   // 필터 조건 저장
   const [filters, setFilters] = useState({
      areas: [], // 선택된 지역 목록
      date: null, // 선택된 날짜 (YYYY-MM-DD 형식)
   });

   //컴포넌트가 처음 렌더링될 때 API를 호출하여 이벤트 목록을 가져옵니다.
   useEffect(() => {
      const fetchEvents = async () => {
         setLoading(true);
         setError(null);
         console.log('🚀 API 요청 시작. 필터 지역:', selectedAreas);

         try {
            let eventsRes;
            const hasFilters = selectedAreas.length > 0;

            if (hasFilters) {
               // 지역 필터가 있을 경우 filter API 호출
               const params = { areas: selectedAreas.join(',') }; // API 명세에 따라 콤마로 구분된 문자열로 전달
               console.log('🔍 필터 API 호출. 파라미터:', params);
               eventsRes = await axiosInstance.get('/api/v1/event/filter', {
                  params,
               });
            } else {
               // 필터가 없으면 전체 목록 API 호출
               console.log('📖 전체 목록 API 호출.');
               eventsRes = await axiosInstance.get('/api/v1/event');
            }

            // 북마크 목록은 항상 불러옵니다.
            const bookmarksRes = await axiosInstance.get(
               '/api/v1/event/bookmark',
            );

            // API 응답 데이터(res.data.data)를 화면에 맞는 형식으로 가공(mapping)합니다.
            const formattedData = eventsRes.data.data.map((item) => ({
               id: item.eventId,
               title: item.eventName,
               // 날짜 형식을 'YYYY/MM/DD~YYYY/MM/DD'로 변경합니다.
               date: `${item.eventStartDate.replaceAll('-', '/')}~${item.eventEndDate.replaceAll('-', '/')}`,
               imageUrl: item.pictureUrl || '/default-event-image.png', // 기본 이미지 설정
            }));

            const bookmarkedIds = bookmarksRes.data.data.map(
               (item) => item.eventId,
            );

            setEvents(formattedData); // 가공된 데이터를 state에 저장합니다.
            setBookmarkedEvents(bookmarkedIds);
         } catch (err) {
            console.error('❌ 이벤트 목록 로딩 실패:', err);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
         } finally {
            setLoading(false);
         }
      };

      fetchEvents();
   }, [selectedAreas]); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.

   // events나 sortOrder가 변경될 때만 재정렬을 수행하여 효율적입니다.
   const sortedEvents = useMemo(() => {
      // ... 정렬 로직 ...
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

   // ✨ 3. 필터 적용 핸들러가 지역 배열을 직접 받도록 수정합니다.
   const handleFilterApply = (appliedAreas) => {
      setSelectedAreas(appliedAreas); // 필터 상태 업데이트
      closeFilterModal();
   };

   // ✨ [핵심] 북마크 클릭 시 서버와 통신하는 로직으로 변경
   const handleBookmarkClick = async (e, eventId) => {
      e.stopPropagation(); // 카드 전체 클릭 방지

      // 현재 북마크 되어있는지 확인
      const isBookmarked = bookmarkedEvents.includes(eventId);

      // 먼저 화면을 즉시 업데이트하여 사용자 경험을 좋게 합니다 (Optimistic Update).
      const originalBookmarks = [...bookmarkedEvents]; // ✨ 만약의 경우를 대비해 원래 상태를 저장
      if (isBookmarked) {
         setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
      } else {
         setBookmarkedEvents((prev) => [...prev, eventId]);
      }

      try {
         if (isBookmarked) {
            // ✨ [확인 포인트 3] 어떤 요청을 보내는지 콘솔에 출력
            console.log(`🚀 ${eventId}번 이벤트 북마크 삭제 요청`);
            const res = await axiosInstance.delete(
               `/api/v1/event/bookmark/${eventId}`,
            );
            // ✨ [확인 포인트 4] 서버로부터 받은 응답을 콘솔에 출력
            console.log('✅ 북마크 삭제 성공 응답:', res);
         } else {
            console.log(`🚀 ${eventId}번 이벤트 북마크 추가 요청`);
            const res = await axiosInstance.post(
               `/api/v1/event/bookmark/${eventId}`,
            );
            console.log('✅ 북마크 추가 성공 응답:', res);
         }
      } catch (err) {
         // ✨ [확인 포인트 5] 에러 발생 시 콘솔에 출력
         console.error('❌ 북마크 처리 중 에러 발생:', err);
         alert('북마크 처리에 실패했습니다. 다시 시도해주세요.');
         setBookmarkedEvents(originalBookmarks);
      }
   };

   // 정렬 옵션 선택 시 처리할 함수
   const handleSortSelect = (order) => {
      setSortOrder(order);
      setIsSortOpen(false); // 옵션 선택 후 드롭다운 닫기
   };

   // 로딩 및 에러 상태에 따라 다른 UI를 보여줍니다.
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

         <S.EventList>
            {/* 5. 기존 dummyEvents 대신 API로 받아온 events 상태를 사용합니다. */}
            {sortedEvents.map((event) => {
               const isBookmarked = bookmarkedEvents.includes(event.id);
               return (
                  <S.EventCardContainer
                     key={event.id}
                     onClick={() => handleCardClick(event.id)}
                  >
                     {/* imageUrl을 props로 전달하여 이미지를 표시합니다. */}
                     <S.EventImage src={event.imageUrl} alt={event.title} />
                     <S.EventInfo>
                        <S.EventTitle>{event.title}</S.EventTitle>
                        <S.EventDate>{event.date}</S.EventDate>
                     </S.EventInfo>
                     <S.BookmarkIconWrapper
                        $isBookmarked={isBookmarked} // 👈 isBookmarked 앞에 '$' 추가
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
      </S.PageContainer>
   );
};

export default UserScreen;
