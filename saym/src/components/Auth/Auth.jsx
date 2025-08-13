import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './AuthStyle';
import cardImg from '../../assets/img/auth_card.png';
import chatMsg from '../../assets/img/auth_chat.png';

const AUTH_KEY = 'authPending';

const Auth = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const fileInputRef = useRef(null);
   const navigate = useNavigate();

   // 페이지 진입 -> 인증 진행 중이면 모달 띄움
   useEffect(() => {
      const authPending = localStorage.getItem(AUTH_KEY);
      if (authPending === 'true') {
         setShowModal(true);
      }
   }, []);

   const handleButtonClick = () => {
      if (selectedFile) {
         // 인증 로직 넣기

         localStorage.setItem(AUTH_KEY, 'true'); // 인증 진행 중 표시
         setShowModal(true);
      } else {
         fileInputRef.current?.click();
      }
   };

   const handleFileChange = (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
         if (file.type !== 'image/jpeg') {
            alert('JPG 형식만 업로드할 수 있습니다.');
            event.target.value = '';
            return;
         }
         setSelectedFile(file);
      }
   };

   const handleClearFile = () => {
      setSelectedFile(null);
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   const handleModalConfirm = () => {
      setShowModal(false);
      navigate('/login');
   };

   return (
      <S.AuthContainer>
         <S.AuthTxt>
            반가워요!
            <br />
            이벤토리 사용을 위해
            <br />
            인증이 필요해요
         </S.AuthTxt>

         <S.CardImage src={cardImg} alt="인증 안내" />

         {selectedFile ? (
            <S.UploadedFileDisplay>
               <S.FileName>{selectedFile.name}</S.FileName>
               <S.ClearButton onClick={handleClearFile}>&times;</S.ClearButton>
            </S.UploadedFileDisplay>
         ) : (
            <S.ChatMsg src={chatMsg} alt="말풍선" />
         )}

         <S.HiddenFileInput
            type="file"
            accept="image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
         />

         <S.UploadButton onClick={handleButtonClick}>
            {selectedFile ? '완료' : '이미지 업로드하기'}
         </S.UploadButton>

         {/* 모달 */}
         {showModal && (
            <S.ModalOverlay>
               <S.ModalContent>
                  <div>인증 중입니다! </div>
                  <div>인증에는 최대 이틀까지 소요돼요.</div>
                  <S.ModalButton onClick={handleModalConfirm}>
                     확인
                  </S.ModalButton>
               </S.ModalContent>
            </S.ModalOverlay>
         )}
      </S.AuthContainer>
   );
};

export default Auth;
