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
   padding: 25px;
   border-radius: 15px;
   width: 90%;
   max-width: 400px;
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

export const RegionButtonRow = styled.div`
   display: flex;
   gap: 10px;
   width: 100%;
   justify-content: flex-start;
`;

export const RegionButton = styled.button`
   width: 70px;
   flex-shrink: 0;
   flex-grow: 0;
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
