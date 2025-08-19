import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.status === 401) {
         const refreshToken = localStorage.getItem('refresh_token');
         if (refreshToken) {
            try {
               const res = await axiosInstance.post('/api/v1/oauth2/token', {
                  refreshToken,
               });
               const newAccessToken = res.data?.accessToken;
               if (!newAccessToken) throw new Error('새 토큰 없음');

               localStorage.setItem('access_token', newAccessToken);

               // 실패했던 요청 재시도
               error.config.headers['Authorization'] =
                  `Bearer ${newAccessToken}`;
               return axiosInstance(error.config);
            } catch (err) {
               console.error('토큰 재발급 실패:', err);
               localStorage.removeItem('access_token');
               localStorage.removeItem('refresh_token');
               window.location.href = '/login';
            }
         } else {
            // refresh token도 없으면 강제 로그아웃
            localStorage.removeItem('access_token');
            window.location.href = '/login';
         }
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;
