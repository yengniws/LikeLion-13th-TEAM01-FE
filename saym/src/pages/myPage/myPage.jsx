import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header_customer from '../../components/Header/Header_ customer/Header_ customer';
import Header from '../../components/Header/Header';
import * as S from './myPageStyle';
import axiosInstance from '../../api/axiosInstance';

const MyPage = () => {
   const [isEditingName, setIsEditingName] = useState(false);
   const [userName, setUserName] = useState('');
   const [tempUserName, setTempUserName] = useState('');
   const [userType, setUserType] = useState(null);
   const [approvalStatus, setApprovalStatus] = useState(null);
   const [events, setEvents] = useState([]);
   const [profileImage, setProfileImage] = useState('');
   const [storeId, setStoreId] = useState(null);
   const navigate = useNavigate();

   const fetchUserInfo = async () => {
      try {
         const res = await axiosInstance.get('/api/v1/mypage');
         const { data } = res.data;
         setUserName(data.name);
         setTempUserName(data.name);
         setUserType(data.userType);
         setApprovalStatus(data.approvalStatus);
         setProfileImage(data.pictureUrl);

         if (data.userType === 'OWNER') {
            fetchStoreInfo();
         }
      } catch (err) {
         console.error('마이페이지 정보 불러오기 실패:', err);
      }
   };

   const fetchStoreInfo = async () => {
      try {
         const res = await axiosInstance.get('/api/v1/store/my');
         const { data } = res.data;
         if (data?.id) {
            setStoreId(data.id);
            localStorage.setItem('storeId', data.id);
         } else {
            setStoreId(null);
            localStorage.removeItem('storeId');
         }
      } catch (err) {
         console.error('가게 정보 불러오기 실패:', err);
         setStoreId(null);
         localStorage.removeItem('storeId');
      }
   };

   const fetchBookmarkedEvents = async () => {
      try {
         const res = await axiosInstance.get('/api/v1/event/bookmark');
         setEvents(res.data.data);
      } catch (err) {
         console.error('북마크 행사 불러오기 실패:', err);
      }
   };

   const updateUserName = async (newName) => {
      try {
         const res = await axiosInstance.put('/api/v1/mypage', {
            name: newName,
         });
         setUserName(res.data.data.name);
      } catch (err) {
         console.error('이름 수정 실패:', err);
      }
   };

   const handleEditName = () => setIsEditingName(true);

   const handleSaveName = () => {
      if (tempUserName !== userName) {
         updateUserName(tempUserName);
      }
      setIsEditingName(false);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleSaveName();
   };

   const renderUserTypeText = (type) => {
      if (type === null || type === 'GENERAL') return '이용객';
      if (type === 'OWNER') return '가맹점주';
      if (type === 'ORGANIZER') return '행사 주최자';
      return '';
   };

   const handleRoleChange = (role) => {
      // 이용객 버튼 -> 바로 이동
      if (role === 'GENERAL') {
         navigate('/userscreen');
         return;
      }

      // OWNER, ORGANIZER 선택 시 approvalStatus 확인
      if (approvalStatus === 'PENDING') {
         navigate('/auth', { state: { nextUserType: role } });
      } else if (approvalStatus === 'APPROVED') {
         if (role === 'ORGANIZER') {
            navigate('/organizer');
         } else if (role === 'OWNER') {
            navigate('/userscreen');
         }
      } else if (approvalStatus === 'REJECT') {
         toast.error('인증에 실패했습니다.');
         navigate('/auth');
      } else {
         console.warn('알 수 없는 approvalStatus:', approvalStatus);
         navigate('/login');
      }
   };

   const getActionButtons = () => {
      if (userType === null || userType === 'GENERAL') {
         return [
            { label: '가맹점주로 변경', role: 'OWNER' },
            { label: '행사 주최자로 변경', role: 'ORGANIZER' },
         ];
      }
      if (userType === 'OWNER') {
         return [
            { label: '이용객 페이지로 이동', role: 'GENERAL' },
            { label: '행사 주최자로 변경', role: 'ORGANIZER' },
         ];
      }
      if (userType === 'ORGANIZER') {
         return [
            { label: '이용객 페이지로 이동', role: 'GENERAL' },
            { label: '가맹점주로 변경', role: 'OWNER' },
         ];
      }
      return [];
   };

   const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
   };

   // 북마크한 행사 목록 클릭 시 이동하는 함수
   const handleEventClick = (eventId) => {
      navigate(`/event/${eventId}`);
   };

   useEffect(() => {
      fetchUserInfo();
      fetchBookmarkedEvents();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <S.MyPageContainer>
         {userType === 'ORGANIZER' ? <Header /> : <Header_customer />}
         <S.ContentContainer>
            <S.ProfileSection>
               <S.ProfileImage src={profileImage || null} />
               <S.NameSection>
                  {isEditingName ? (
                     <S.NameInput
                        type="text"
                        value={tempUserName}
                        onChange={(e) => setTempUserName(e.target.value)}
                        onBlur={handleSaveName}
                        onKeyDown={handleKeyDown}
                        autoFocus
                     />
                  ) : (
                     <S.ProfileName>{userName}</S.ProfileName>
                  )}
                  <S.EditIcon onClick={handleEditName}>
                     <FaPencilAlt />
                  </S.EditIcon>
               </S.NameSection>
               <S.UseHistoryButton>
                  {renderUserTypeText(userType)}
               </S.UseHistoryButton>
            </S.ProfileSection>

            <S.Divider />

            <S.SavedEventsSection>
               <S.SectionTitle>저장한 행사</S.SectionTitle>
               <S.EventsList>
                  {events.map((event) => (
                     <S.EventItem
                        key={event.eventId}
                        onClick={() => handleEventClick(event.eventId)}
                     >
                        <S.EventImage
                           src={event.pictureUrl}
                           alt={event.eventName}
                        />
                        <S.EventName>{event.eventName}</S.EventName>
                     </S.EventItem>
                  ))}
               </S.EventsList>
            </S.SavedEventsSection>

            <S.ButtonSection>
               {userType === 'OWNER' && (
                  <>
                     <S.ActionButtonStore
                        onClick={() => {
                           if (storeId) {
                              toast.error('하나의 가게만 등록 가능합니다');
                              return;
                           }
                           navigate('/store/register');
                        }}
                     >
                        가게 등록
                     </S.ActionButtonStore>
                     <S.ActionButtonStore
                        onClick={() =>
                           navigate(
                              `/store/edit/${storeId || localStorage.getItem('storeId')}`,
                           )
                        }
                        disabled={!storeId}
                     >
                        가게 수정
                     </S.ActionButtonStore>
                  </>
               )}
               {getActionButtons().map((btn, idx) => (
                  <S.ActionButton
                     key={idx}
                     onClick={() => handleRoleChange(btn.role)}
                  >
                     {btn.label}
                  </S.ActionButton>
               ))}
            </S.ButtonSection>

            <S.Footer>
               <S.FooterLink onClick={handleLogout}>로그아웃</S.FooterLink>
               <S.FooterLink onClick={handleLogout}>회원 탈퇴</S.FooterLink>
            </S.Footer>
         </S.ContentContainer>
      </S.MyPageContainer>
   );
};

export default MyPage;
