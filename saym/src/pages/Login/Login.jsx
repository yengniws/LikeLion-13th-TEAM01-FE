import React from 'react';
import {
   Container,
   Title,
   LogoCircle,
   KakaoButton,
   Logoimg,
} from './LoginStyle.jsx';
import logoimg from './images/logo.png';

const Login = () => {
   return (
      <>
         <Container>
            <Title>로그인</Title>

            <LogoCircle>
               <Logoimg img src={logoimg} alt="로고" />
            </LogoCircle>
            <KakaoButton>
               💬
               <span>카카오 로그인</span>
            </KakaoButton>
         </Container>
      </>
   );
};

export default Login;
