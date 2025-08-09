import React from 'react';
import { Container, Title, LogoCircle, KakaoButton } from './LoginStyle.jsx';
import logoimg from './imges/logo.png';

const Login = () => {
   return (
      <>
         <Container>
            <Title>로그인</Title>

            <LogoCircle>
               <img
                  src={logoimg}
                  alt="로고"
                  style={{
                     width: '90%',
                     height: '90%',
                     borderRadius: '50%',
                     objectFit: 'contain', // 이미지가 원 안에 맞춰지도록 비율 유지
                  }}
               />
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
