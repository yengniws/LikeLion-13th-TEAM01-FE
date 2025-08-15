import React from 'react';
import kakaoLoginImage from '../images/kakaoLoginImage.png'; // 이미지 경로를 프로젝트 구조에 맞게 수정해주세요.

// 카카오 로그인 URL을 환경 변수에서 가져오는 방식이 더 안전하고 유연합니다.
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
   return (
      <a href={kakaoURL}>
         <img src={kakaoLoginImage} alt="카카오 로그인" />
      </a>
   );
};

export default KakaoLoginButton;
