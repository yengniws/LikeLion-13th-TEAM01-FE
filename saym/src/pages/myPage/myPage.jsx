import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Header_customer from '../../components/Header/Header_ customer/Header_ customer';
import * as S from './myPageStyle';

const events = [
   { id: 1, name: '행사 1' },
   { id: 2, name: '행사 2' },
   { id: 3, name: '행사 3' },
   { id: 4, name: '행사 4' },
   { id: 5, name: '행사 5' },
];

const MyPage = () => {
   const [isEditingName, setIsEditingName] = useState(false);
   const [userName, setUserName] = useState('이름');
   const [tempUserName, setTempUserName] = useState(userName);

   const handleEditName = () => {
      setIsEditingName(true);
   };

   const handleSaveName = () => {
      setUserName(tempUserName);
      setIsEditingName(false);
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSaveName();
      }
   };

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

               <S.UseHistoryButton>이용객</S.UseHistoryButton>
            </S.ProfileSection>

            <S.Divider />

            <S.SavedEventsSection>
               <S.SectionTitle>저장한 행사</S.SectionTitle>
               <S.EventsList>
                  {events.map((event) => (
                     <S.EventItem key={event.id}>
                        <S.EventImage />
                        <S.EventName>{event.name}</S.EventName>
                     </S.EventItem>
                  ))}
               </S.EventsList>
            </S.SavedEventsSection>

            <S.ButtonSection>
               <S.ActionButton>가맹점주로 변경</S.ActionButton>
               <S.ActionButton>행사 주최자로 변경</S.ActionButton>
            </S.ButtonSection>

            <S.Footer>
               <S.FooterLink>로그아웃</S.FooterLink>
               <S.FooterLink>회원 탈퇴</S.FooterLink>
            </S.Footer>
         </S.ContentContainer>
      </S.MyPageContainer>
   );
};

export default MyPage;
