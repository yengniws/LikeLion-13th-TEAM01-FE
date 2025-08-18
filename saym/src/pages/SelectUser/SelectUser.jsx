import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   Container,
   Title,
   LogoCircle,
   Logoimg,
   StyledButton,
} from './SelectUserStyle.jsx';
import logoimg from '../../assets/img/mainlogo.png';
import Loading from '../../components/Loading/Loding.jsx';

const SelectUser = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);

   const handleSelection = (userType) => {
      if (userType === '이용객') {
         navigate('/userscreen');
      } else if (userType === '행사 주최자') {
         navigate('/auth', { state: { userType: 'ORGANIZER' } });
      } else if (userType === '가맹점주') {
         navigate('/auth', { state: { userType: 'OWNER' } });
      }
   };

   useEffect(() => {
      const startTime = Date.now();

      const img = new Image();
      img.src = logoimg;
      img.onload = () => {
         const elapsed = Date.now() - startTime;
         const remainingTime = 2000 - elapsed;
         if (remainingTime > 0) {
            setTimeout(() => setLoading(false), remainingTime);
         } else {
            setLoading(false);
         }
      };
   }, []);

   if (loading) return <Loading />;

   return (
      <Container>
         <Title>유저 정보를 선택해주세요!</Title>
         <LogoCircle>
            <Logoimg src={logoimg} alt="로고" />
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
