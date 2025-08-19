// FilterModal.jsx

import React, { useState } from 'react';
import * as S from './FilterModalStyle';

const REGION_MAP = {
   서울: 'SEOUL',
   인천: 'INCHEON',
   부산: 'BUSAN',
   대구: 'DAEGU',
   대전: 'DAEJEON',
   광주: 'GWANGJU',
   울산: 'ULSAN',
   세종: 'SEJONG',
   경기: 'GYEONGGI',
   강원: 'GANGWON',
   충북: 'CHUNGBUK',
   충남: 'CHUNGNAM',
   전북: 'JEONBUK',
   전남: 'JEONNAM',
   경북: 'GYEONGBUK',
   경남: 'GYEONGNAM',
   제주: 'JEJU',
};
const regions = Object.keys(REGION_MAP);

// ✨ initialAreas prop을 추가로 받습니다.
const FilterModal = ({ onClose, onApply, initialAreas = [] }) => {
   // 부모로부터 받은 초기 지역 값으로 state를 설정합니다.
   const [selectedRegions, setSelectedRegions] = useState(
      initialAreas.map((apiValue) =>
         Object.keys(REGION_MAP).find((key) => REGION_MAP[key] === apiValue),
      ),
   );

   const handleContentClick = (e) => e.stopPropagation();

   const handleRegionClick = (region) => {
      setSelectedRegions((prev) =>
         prev.includes(region)
            ? prev.filter((r) => r !== region)
            : [...prev, region],
      );
   };

   const handleConfirm = () => {
      const apiAreas = selectedRegions.map((region) => REGION_MAP[region]);
      // 부모에게 지역 배열만 전달합니다.
      onApply(apiAreas);
   };

   return (
      <S.ModalOverlay onClick={onClose}>
         <S.ModalContent onClick={handleContentClick}>
            <S.FilterGroup>
               <S.Label>원하는 지역</S.Label>
               <S.RegionContainer>
                  {regions.map((region) => (
                     <S.RegionButton
                        key={region}
                        selected={selectedRegions.includes(region)}
                        onClick={() => handleRegionClick(region)}
                     >
                        {region}
                     </S.RegionButton>
                  ))}
               </S.RegionContainer>
            </S.FilterGroup>

            <S.ConfirmButton onClick={handleConfirm}>확인</S.ConfirmButton>
         </S.ModalContent>
      </S.ModalOverlay>
   );
};

export default FilterModal;
