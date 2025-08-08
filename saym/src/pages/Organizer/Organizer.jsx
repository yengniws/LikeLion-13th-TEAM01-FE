import { useState, useRef } from 'react';
import * as S from './OrganizerStyle';
import { IoImageOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import Header from '../../components/Header/Header';

const Organizer = () => {
   const [inputValue, setInputValue] = useState('');
   const [isPromo, setIsPromo] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const fileInputRef = useRef(null);

   const handleIconClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setSelectedFile(file);
      }
      event.target.value = '';
   };

   const handleClearFile = () => {
      setSelectedFile(null);
   };

   const handleCheckboxChange = (event) => {
      const checked = event.target.checked;
      if (checked) {
         setIsPromo(true);
         toast.info('유료 기능입니다!');
         setTimeout(() => {
            setIsPromo(false);
         }, 700);
      } else {
         setIsPromo(false);
      }
   };

   return (
      <>
         <S.OrganizerContainer>
            <Header />
            <ToastContainer
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
            />

            <S.OrganizerTxt>
               행사 아이디어, AI와 함께 다듬어 볼까요?
            </S.OrganizerTxt>

            {selectedFile && (
               <S.UploadedFileDisplay>
                  <S.FileName>{selectedFile.name}</S.FileName>
                  <S.ClearButton onClick={handleClearFile}>
                     &times;
                  </S.ClearButton>
               </S.UploadedFileDisplay>
            )}

            <S.InputBarContainer>
               <S.IconButton onClick={handleIconClick}>
                  <IoImageOutline />
               </S.IconButton>

               <S.TextInput
                  placeholder="기획안을 입력하세요"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
               />

               <FormControlLabel
                  control={
                     <Checkbox
                        sx={{
                           color: '#FFF783',
                           '&.Mui-checked': { color: '#FFF783' },
                        }}
                        checked={isPromo}
                        onChange={handleCheckboxChange}
                     />
                  }
                  label="홍보"
                  sx={{
                     color: '#4daeff',
                     fontWeight: '600',
                     fontSize: '14px',
                     marginLeft: 'auto',
                     marginRight: '10px',
                     whiteSpace: 'nowrap',
                     flexShrink: 0,
                  }}
               />
            </S.InputBarContainer>

            <input
               type="file"
               accept="image/*"
               ref={fileInputRef}
               onChange={handleFileChange}
               style={{ display: 'none' }}
            />
         </S.OrganizerContainer>
      </>
   );
};

export default Organizer;
