import React from 'react';
import { Container, LogoCircle, KakaoButton, Logoimg } from './LoginStyle.jsx';
import logoimg from './images/logo.png';
import KakaoLoginButton from './Kakao/KakaoLoginButton.jsx';

const Login = () => {
   return (
      <>
         <Container>
            <LogoCircle>
               <Logoimg src={logoimg} alt="로고" />
            </LogoCircle>
            <KakaoButton>
               <KakaoLoginButton />
            </KakaoButton>
         </Container>
      </>
   );
};

export default Login;
