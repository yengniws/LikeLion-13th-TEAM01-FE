import { Container, LogoCircle, Logoimg, KakaoImg } from './LoginStyle.jsx';
import logoimg from '../../assets/img/mainlogo.png';
import kakaoLoginImg from '../../assets/img/kakao_login_large_wide.png';

const Login = () => {
   const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
   const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

   const handleKakaoLogin = () => {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoAuthUrl;
   };

   return (
      <Container>
         <LogoCircle>
            <Logoimg src={logoimg} alt="로고" />
         </LogoCircle>
         <KakaoImg
            src={kakaoLoginImg}
            alt="카카오 로그인"
            onClick={handleKakaoLogin}
         />
      </Container>
   );
};

export default Login;
