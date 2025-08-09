//Loding.jsx
import logoimg from './images/logo.png';
import { LodingContainer, LogoImage } from './LodingStyle';

export default function Loding() {
   return (
      <LodingContainer>
         <LogoImage src={logoimg} alt="로딩 로고" />
      </LodingContainer>
   );
}
