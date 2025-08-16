// components/Modal/FilterModalStyle.js

import styled from 'styled-components';

// ... ModalOverlay는 기존과 동일 ...
export const ModalOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
`;

export const ModalContent = styled.div`
   background-color: #a5d6ff;
   padding: 25px;
   border-radius: 15px;
   width: 90%;
   max-width: 400px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   gap: 10px; // 그룹 간 간격을 조금 줄입니다.
`;

// 👇 '원하는 지역', '원하는 날짜' 텍스트 스타일
export const Label = styled.p`
   font-size: 16px;
   font-weight: 500;
   color: #ffffff;
   margin: 200; // 기본 마진 제거
   width: 100px; // 텍스트 영역 너비 고정flex-wrap: wrap;
`;

// 👇 하늘색 배경을 가진 필터 그룹 (핵심 변경)
export const FilterGroup = styled.div`
   border-radius: 10px;
   padding: 15px;
   width: 200 px;
   display: flex;
   align-items: center; // 세로 중앙 정렬
   gap: 15px;
`;

// 지역 버튼 (노란색으로 변경)
export const RegionButton = styled.button`
   flex: 1;
   padding: 8px;
   border-radius: 20px; // 더 동그랗게
   border: none; // 테두리 제거
   background-color: ${(props) =>
      props.selected ? '#4daeff' : '#fff1a7'}; // 선택 시 파랑, 기본은 노랑
   color: ${(props) => (props.selected ? 'white' : '#555')};
   font-size: 15px;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s ease-in-out;
`;

// 날짜 입력 필드 (노란색으로 변경)
export const DateInput = styled.input`
   width: 50px; // 너비 고정
   padding: 8px;
   border-radius: 20px; // 더 동그랗게
   border: none; // 테두리 제거
   background-color: #fff1a7; // 노란색 배경
   text-align: center;
   font-size: 15px;

   &::placeholder {
      color: #aaa;
   }

   &:focus {
      outline: none;
   }
`;

// 👇 날짜 단위를 보여줄 텍스트 스타일 추가
export const DateUnit = styled.span`
   font-size: 15px;
   color: #555;
`;

// 👇 날짜 입력 필드와 단위를 묶는 컨테이너 추가
export const DateInputContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;
