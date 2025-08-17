import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header_customer from '../../components/Header/Header_ customer/Header_ customer';
import * as S from './myPageStyle';
import axiosInstance from '../../api/axiosInstance';

const MyPage = () => {
   const [isEditingName, setIsEditingName] = useState(false);
   const [userName, setUserName] = useState('');
   const [tempUserName, setTempUserName] = useState('');
   const [userType, setUserType] = useState(null); // 기본 null (이용객)
   const [events, setEvents] = useState([]);
   const navigate = useNavigate();

   const fetchUserInfo = async () => {
      try {
         const res = await axiosInstance.get('/api/v1/mypage');
         const { data } = res.data;
         setUserName(data.name);
         setTempUserName(data.name);
         setUserType(data.userType);
      } catch (err) {
         console.error('마이페이지 정보 불러오기 실패:', err);
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

   const handleEditName = () => {
      setIsEditingName(true);
   };

   const handleSaveName = () => {
      if (tempUserName !== userName) {
         updateUserName(tempUserName);
      }
      setIsEditingName(false);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSaveName();
      }
   };

   const renderUserTypeText = (type) => {
      if (type === null || type === 'GENERAL') return '이용객';
      if (type === 'OWNER') return '가맹점주';
      if (type === 'ORGANIZER') return '행사 주최자';
      return '';
   };

   const handleRoleChange = (newRole) => {
      if (newRole === null) {
         navigate('/userscreen', { state: { nextUserType: newRole } });
      } else {
         navigate('/auth', { state: { nextUserType: newRole } });
      }
   };

   const getActionButtons = () => {
      if (userType === null) {
         return [
            { label: '가맹점주로 변경', role: 'OWNER' },
            { label: '행사 주최자로 변경', role: 'ORGANIZER' },
         ];
      }
      if (userType === 'OWNER') {
         return [
            { label: '이용객으로 변경', role: null },
            { label: '행사 주최자로 변경', role: 'ORGANIZER' },
         ];
      }
      if (userType === 'ORGANIZER') {
         return [
            { label: '이용객으로 변경', role: null },
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

   useEffect(() => {
      fetchUserInfo();
      fetchBookmarkedEvents();
   }, []);

   return (
      <S.MyPageContainer>
         <Header_customer />
         <S.ContentContainer>
            <S.ProfileSection>
               <S.ProfileImage />
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
                     <S.EventItem key={event.eventId}>
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
