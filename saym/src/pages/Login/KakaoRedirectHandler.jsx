import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/AxiosInstance';

const KakaoRedirectHandler = () => {
   const navigate = useNavigate();
   const code = new URL(window.location.href).searchParams.get('code');

   useEffect(() => {
      if (code) {
         axiosInstance
            .get('/api/v1/oauth2', { params: { code } })
            .then((res) => {
               // console.log(res.data);
               const { accessToken, refreshToken } = res.data.data || {};
               if (!accessToken || !refreshToken) throw new Error('토큰 없음');

               localStorage.setItem('access_token', accessToken);
               localStorage.setItem('refresh_token', refreshToken);
               // console.log(localStorage);

               navigate('/selectuser');
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

   return;
};

export default KakaoRedirectHandler;
