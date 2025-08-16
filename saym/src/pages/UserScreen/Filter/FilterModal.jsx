// components/Modal/FilterModal.jsx

import React, { useState } from 'react';
import * as S from './FilterModalStyle';

const FilterModal = ({ onClose }) => {
   const [selectedRegion, setSelectedRegion] = useState('인천');

   const handleContentClick = (e) => {
      e.stopPropagation();
   };

   return (
      <S.ModalOverlay onClick={onClose}>
         <S.ModalContent onClick={handleContentClick}>
            <S.FilterGroup>
               <S.Label>원하는 지역</S.Label>
               {[
                  '서울',
                  '인천',
                  '부산',
                  '대구',
                  '대전',
                  '광주',
                  '울산',
                  '세종',
                  '경기',
                  '강원',
                  '충북',
                  '충남',
                  '전북',
                  '전남',
                  '경북',
                  '경남',
                  '제주',
               ].map((region) => (
                  <S.RegionButton
                     key={region}
                     selected={selectedRegion === region}
                     onClick={() => setSelectedRegion(region)}
                  >
                     {region}
                  </S.RegionButton>
               ))}
            </S.FilterGroup>

            <S.FilterGroup>
               <S.Label>원하는 날짜</S.Label>
               <S.DateInputContainer>
                  <S.DateInput type="text" placeholder="YYYY" />
                  <S.DateUnit>년</S.DateUnit>
                  <S.DateInput type="text" placeholder="MM" />
                  <S.DateUnit>월</S.DateUnit>
                  <S.DateInput type="text" placeholder="DD" />
                  <S.DateUnit>일</S.DateUnit>
               </S.DateInputContainer>
            </S.FilterGroup>
         </S.ModalContent>
      </S.ModalOverlay>
   );
};

export default FilterModal;
