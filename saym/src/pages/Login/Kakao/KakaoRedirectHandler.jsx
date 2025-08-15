import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/AxiosInstance';
import SelectUser from '../../SelectUser/SelectUser';

const RedirectHandler = () => {
   const navigate = useNavigate();
   const code = new URL(window.location.href).searchParams.get('code');

   useEffect(() => {
      if (code) {
         axiosInstance
            .post('/api/v1/oauth2', { code })
            .then((response) => {
               const { data } = response;
               const { isNewUser, accessToken, refreshToken } = data;

               // 로컬 스토리지 키를 'access_token'과 'refresh_token'으로 통일
               localStorage.setItem('access_token', accessToken);
               localStorage.setItem('refresh_token', refreshToken);

               if (isNewUser) {
                  console.log(
                     '신규 사용자입니다. 회원가입 페이지로 이동합니다.',
                  );
                  navigate('/internal/join'); // 토큰을 로컬 스토리지에 저장했으므로 state로 넘길 필요 없음
               } else {
                  console.log(
                     '기존 사용자입니다. 로그인 완료 후 메인 페이지로 이동합니다.',
                  );
                  navigate('/main');
               }
            })
            .catch((error) => {
               console.error('로그인/회원가입 실패', error);
               alert('로그인에 실패했습니다. 다시 시도해주세요.');
               navigate('/login');
            });
      } else {
         console.error('인가 코드를 찾을 수 없음');
         alert('로그인에 필요한 정보가 없습니다.');
         navigate('/login');
      }
   }, [code, navigate]);

   // ...
   return <div>로그인 처리 중입니다... 잠시만 기다려 주세요.</div>;
};

export default RedirectHandler;
