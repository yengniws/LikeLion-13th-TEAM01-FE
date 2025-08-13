import { useRef, useState } from 'react';
import * as S from './ImageUploaderStyle';
import uploadPlaceholder from '../../assets/img/imgUpload.png';

export default function ImageUploader({ onFileSelect }) {
   const fileInputRef = useRef(null);
   const [preview, setPreview] = useState(null);

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setPreview(URL.createObjectURL(file));
         onFileSelect(file);
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
