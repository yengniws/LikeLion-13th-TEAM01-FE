import * as S from './HeaderStyle';
import { Link } from 'react-router-dom';
import { MdOutlineLibraryBooks, MdOutlinePersonOutline } from 'react-icons/md';
import EventoryLogo from '../../assets/img/logo.png';

const Header = () => {
   return (
      <S.HeaderContainer>
         <Link to="/organizer">
            <S.Logo src={EventoryLogo} alt="Eventory Logo" />
         </Link>

         <S.IconWrapper>
            <Link to="/chatlog">
               <S.IconLink>
                  <MdOutlineLibraryBooks />
               </S.IconLink>
            </Link>

            <Link to="/mypage">
               <S.IconLinkP>
                  <MdOutlinePersonOutline />
               </S.IconLinkP>
            </Link>
         </S.IconWrapper>
      </S.HeaderContainer>
   );
};

export default Header;
