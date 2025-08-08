import { useRef, useState } from 'react';
import * as S from './AuthStyle';
import cardImg from '../../assets/img/auth_card.png';
import chatMsg from '../../assets/img/auth_chat.png';

const Auth = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const fileInputRef = useRef(null);

   const handleButtonClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
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
            이미지 업로드하기
         </S.UploadButton>
      </S.AuthContainer>
   );
};

export default Auth;
