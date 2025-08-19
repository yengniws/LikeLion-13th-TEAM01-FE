import { useState, useRef, useEffect } from 'react';
import * as S from './OrganizerStyle';
import { IoImageOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import Header from '../../components/Header/Header';
import axiosInstance from '../../api/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loding.jsx';
import OrganizerBackground from '../../assets/img/or_bg.png';

const Organizer = () => {
   const [inputValue, setInputValue] = useState('');
   const [isPromo, setIsPromo] = useState(false);
   const [selectedFile, setSelectedFile] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const fileInputRef = useRef(null);
   const navigate = useNavigate();

   // 첫 배경 로딩
   useEffect(() => {
      const startTime = Date.now();
      const img = new Image();
      img.src = OrganizerBackground;
      img.onload = () => {
         const elapsed = Date.now() - startTime;
         const remainingTime = 2000 - elapsed;
         if (remainingTime > 0) {
            setTimeout(() => setIsLoading(false), remainingTime);
         } else {
            setIsLoading(false);
         }
      };
   }, []);

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

   const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
         if (inputValue.trim() === '' || !selectedFile) {
            toast.error('텍스트와 이미지를 모두 입력해주세요.');
            return;
         }

         if (isLoading) return; // 중복 요청 방지

         setIsLoading(true);
         const formData = new FormData();
         formData.append('description', inputValue);
         formData.append('imageFile', selectedFile);

         try {
            const response = await axiosInstance.post(
               '/api/v1/ai/analyze',
               formData,
               {
                  headers: { 'Content-Type': 'multipart/form-data' },
               },
            );

            const { aiId } = response.data;
            if (!aiId) throw new Error('aiId 없음');

            localStorage.setItem('lastAiId', aiId);

            // 로딩 끄지 않고 그대로 이동
            navigate(`/airesult/${aiId}`);
         } catch (error) {
            console.error('API 호출 에러:', error);
            toast.error('요청에 실패했습니다.');
            setIsLoading(false); // 실패했을 때만 로딩 해제
         }
      }
   };

   if (isLoading) return <Loading />;

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
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
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
               accept="image/jpeg"
               ref={fileInputRef}
               onChange={handleFileChange}
               style={{ display: 'none' }}
            />
         </S.OrganizerContainer>
      </>
   );
};

export default Organizer;
