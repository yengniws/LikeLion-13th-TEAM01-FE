// components/Modal/FilterModalStyle.js

import styled from 'styled-components';

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
   padding: 30px;
   border-radius: 15px;
   width: 90%;
   max-width: 380px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
   gap: 20px;
`;

export const Label = styled.p`
   font-size: 16px;
   font-weight: 500;
   color: #ffffff;
   margin: 0;
`;

export const FilterGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
`;
// ✨ 모든 지역 버튼을 감싸는 새로운 컨테이너를 추가합니다.
export const RegionContainer = styled.div`
   display: flex;
   flex-wrap: wrap; /* 버튼들이 공간이 없으면 자동으로 다음 줄로 넘어가도록 설정 */
   gap: 10px; /* 버튼 사이의 간격 */
`;

export const RegionButton = styled.button`
   /* width를 삭제하고 flex-grow: 1로 변경하여 유연하게 만듭니다. */
   /* width: 70px; */
   flex-grow: 0; /* 같은 줄에 있는 버튼들이 공간을 균등하게 나눠 가짐 */
   flex-basis: 70px; /* 버튼의 최소 너비를 설정 */

   /* 나머지 스타일은 그대로 유지 */
   padding: 8px;
   border-radius: 20px;
   border: none;
   background-color: ${(props) => (props.selected ? '#4daeff' : '#fff1a7')};
   color: ${(props) => (props.selected ? 'white' : '#555')};
   font-size: 15px;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s ease-in-out;
`;

export const DateInput = styled.input`
   width: 70px;
   padding: 8px;
   border-radius: 20px;
   border: none;
   background-color: #fff1a7;
   text-align: center;
   font-size: 15px;

   &::placeholder {
      color: #aaa;
   }

   &:focus {
      outline: none;
   }
`;

export const DateUnit = styled.span`
   font-size: 15px;
   color: #555;
`;

export const DateInputContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;

export const ConfirmButton = styled.button`
   width: 100%;
   padding: 12px;
   border-radius: 25px;
   border: none;
   background-color: #4daeff;
   color: white;
   font-size: 18px;
   font-weight: bold;
   cursor: pointer;
   margin-top: 10px;
   transition: background-color 0.2s;

   &:hover {
      background-color: #2e90e4;
   }
`;
