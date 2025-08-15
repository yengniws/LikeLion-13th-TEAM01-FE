import axios from 'axios';

// axios 인스턴스 생성 및 기본 설정
const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
   (config) => {
      // 로컬 스토리지에서 액세스 토큰 가져오기
      const token = localStorage.getItem('access_token');
      if (token) {
         // 토큰이 존재하면 Authorization 헤더에 추가
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      // 요청 에러가 발생한 경우 에러를 반환
      return Promise.reject(error);
   },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         // 토큰 만료 에러 시
         // 요청 인터셉터와 동일한 'access_token' 키 사용
         localStorage.removeItem('access_token');
         // refresh_token도 함께 삭제
         localStorage.removeItem('refresh_token');
         window.location.href = '/login';
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;
