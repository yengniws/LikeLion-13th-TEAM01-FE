import React from 'react';
import {
   Container,
   Title,
   LogoCircle,
   Logoimg,
   StyledButton,
} from './SelectUserStyle.jsx';
import logoimg from './images/logo.png';

const SelectUser = () => {
   const handleSelection = (userType) => {
      console.log(`${userType} 선택됨`);
   };

   return (
      <Container>
         <Title>역할을 선택해주세요</Title>
         <LogoCircle>
            <Logoimg img src={logoimg} alt="로고" />
         </LogoCircle>
         <StyledButton onClick={() => handleSelection('행사 주최자')}>
            행사 주최자
         </StyledButton>
         <StyledButton onClick={() => handleSelection('가맹점주')}>
            가맹점주
         </StyledButton>
         <StyledButton onClick={() => handleSelection('이용객')}>
            이용객
         </StyledButton>
      </Container>
   );
};

export default SelectUser;
