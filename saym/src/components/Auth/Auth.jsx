import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './AuthStyle';
import cardImg from '../../assets/img/auth_card.png';
import chatMsg from '../../assets/img/auth_chat.png';
import axiosInstance from '../../api/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const fileInputRef = useRef(null);
   const navigate = useNavigate();
   const location = useLocation();
   const userType = location.state?.userType; // SelectUser 페이지에서 넘겨준 값

   // ✅ 페이지 진입 시 approvalStatus 체크
   useEffect(() => {
      const checkApprovalStatus = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/mypage');
            const { approvalStatus, userType: returnedType } = res.data.data;

            // userType이 null 또는 GENERAL → Auth 페이지에 머무름
            if (!returnedType || returnedType === 'GENERAL') {
               return;
            }

            if (approvalStatus === 'REJECTED') {
               toast.error('사업자 승인이 거절되었습니다.');
               setTimeout(() => navigate('/login'), 1500);
               return;
            }

            if (approvalStatus === 'APPROVED') {
               if (returnedType === 'ORGANIZER') {
                  navigate('/organizer');
               } else if (returnedType === 'OWNER') {
                  navigate('/store/register');
               }
               return;
            }

            if (approvalStatus === 'PENDING') {
               setShowModal(true);
            }
         } catch (error) {
            console.error('마이페이지 조회 실패:', error);
         }
      };

      checkApprovalStatus();
   }, [navigate]);

   const handleButtonClick = async () => {
      if (!selectedFile) {
         fileInputRef.current?.click();
         return;
      }

      try {
         const formData = new FormData();
         formData.append('userType', userType);
         formData.append('businessLicenseFile', selectedFile);

         const res = await axiosInstance.patch(
            '/api/v1/member/user-type',
            formData,
            {
               headers: { 'Content-Type': 'multipart/form-data' },
            },
         );

         const { approvalStatus, userType: returnedType } = res.data.data;

         if (approvalStatus === 'REJECTED') {
            toast.error('사업자 승인이 거절되었습니다.');
            setTimeout(() => navigate('/login'), 1500);
            return;
         }

         if (approvalStatus === 'APPROVED') {
            if (returnedType === 'ORGANIZER') {
               navigate('/organizer');
            } else if (returnedType === 'OWNER') {
               navigate('/store/register');
            }
            return;
         }

         if (approvalStatus === 'PENDING') {
            setShowModal(true);
         }
      } catch (error) {
         console.error('인증 요청 실패:', error);
         toast.error('인증 요청 중 오류가 발생했습니다.');
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

         {showModal && (
            <S.ModalOverlay>
               <S.ModalContent>
                  <div>인증 중입니다!</div>
                  <div>인증에는 최대 이틀까지 소요돼요.</div>
                  <S.ModalButton onClick={handleModalConfirm}>
                     확인
                  </S.ModalButton>
               </S.ModalContent>
            </S.ModalOverlay>
         )}

         <ToastContainer position="top-center" autoClose={1500} />
      </S.AuthContainer>
   );
};

export default Auth;
