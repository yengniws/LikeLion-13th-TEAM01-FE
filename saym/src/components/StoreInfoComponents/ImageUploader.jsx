import { useRef, useState, useEffect } from 'react';
import * as S from '../StoreInfoComponents/StoreInfo/StoreInfoStyle';
import uploadPlaceholder from '../../assets/img/imgUpload.png';

export default function ImageUploader({ onFileSelect, initialImage }) {
   const fileInputRef = useRef(null);
   const [preview, setPreview] = useState(null);

   useEffect(() => {
      if (initialImage) setPreview(initialImage);
   }, [initialImage]);

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setPreview(URL.createObjectURL(file));
         if (onFileSelect) onFileSelect(file);
      }
   };

   const handleClickUpload = () => {
      fileInputRef.current.click();
   };

   return (
      <S.Wrapper>
         <input
            type="file"
            accept="image/jpeg"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
         />

         {!preview ? (
            <S.UploadButton onClick={handleClickUpload}>
               <img src={uploadPlaceholder} alt="이미지 첨부" />
            </S.UploadButton>
         ) : (
            <S.PreviewWrapper>
               <S.PreviewImage src={preview} alt="미리보기" />
               <S.ChangeButton onClick={handleClickUpload}>
                  이미지 변경하기
               </S.ChangeButton>
            </S.PreviewWrapper>
         )}
      </S.Wrapper>
   );
}
