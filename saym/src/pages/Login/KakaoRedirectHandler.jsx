import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/AxiosInstance';

const KakaoRedirectHandler = () => {
   const navigate = useNavigate();
   const code = new URL(window.location.href).searchParams.get('code');

   useEffect(() => {
      if (code) {
         localStorage.setItem('kakao_code', code);
         // console.log(code);

         axiosInstance
            .get('/api/v1/oauth2', { params: { code } })
            .then((res) => {
               const { accessToken, refreshToken, userType, approvalStatus } =
                  res.data.data || {};
               console.log('카카오 로그인 응답:', res.data);

               if (!accessToken || !refreshToken) throw new Error('토큰 없음');

               localStorage.setItem('access_token', accessToken);
               localStorage.setItem('refresh_token', refreshToken);
               if (userType) localStorage.setItem('userType', userType);
               if (approvalStatus)
                  localStorage.setItem('approvalStatus', approvalStatus);

               if (!userType || userType === 'GENERAL') {
                  // userType이 null 또는 GENERAL
                  navigate('/selectuser');
               } else if (
                  approvalStatus === 'PENDING' ||
                  approvalStatus === 'REJECTED'
               ) {
                  navigate('/auth');
               } else if (approvalStatus === 'APPROVED') {
                  if (userType === 'ORGANIZER') {
                     navigate('/organizer');
                  } else if (userType === 'OWNER') {
                     navigate('/userscreen');
                  } else {
                     navigate('/selectuser'); // fallback
                  }
               } else {
                  navigate('/login'); // 알 수 없는 값
               }
            })
            .catch((err) => {
               console.error('카카오 로그인 실패:', err);
               navigate('/login');
            });
      } else {
         console.error('인가 코드 없음');
         navigate('/login');
      }
   }, [code, navigate]);

   return null;
};

export default KakaoRedirectHandler;
