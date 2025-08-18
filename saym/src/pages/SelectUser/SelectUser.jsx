import { useNavigate } from 'react-router-dom';
import {
   Container,
   Title,
   LogoCircle,
   Logoimg,
   StyledButton,
} from './SelectUserStyle.jsx';
import logoimg from '../../assets/img/mainlogo.png';

const SelectUser = () => {
   const navigate = useNavigate();

   const handleSelection = (userType) => {
      if (userType === '이용객') {
         navigate('/userscreen');
      } else if (userType === '행사 주최자') {
         navigate('/auth', { state: { userType: 'ORGANIZER' } });
      } else if (userType === '가맹점주') {
         navigate('/auth', { state: { userType: 'OWNER' } });
      }
   };

   return (
      <Container>
         <Title>역할을 선택해주세요</Title>
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
