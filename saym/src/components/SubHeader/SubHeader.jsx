import * as S from './SubHeaderStyle';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const SubHeader = ({ title }) => {
   const navigate = useNavigate();

   const handleGoBack = () => {
      navigate(-1);
   };

   return (
      <S.SubHeaderContainer>
         <S.BackButton onClick={handleGoBack}>
            <IoChevronBack color="#333" />
         </S.BackButton>
         <S.Title>{title}</S.Title>
      </S.SubHeaderContainer>
   );
};

export default SubHeader;
