import styled from 'styled-components';

export const SubHeaderContainer = styled.div`
   width: 100%;
   max-width: 390px;
   height: 60px;
   padding: 30px 10px;
   padding-top: 35px;
   display: flex;
   align-items: center;
   border-bottom: 1px solid #f0f0f0;
   background-color: white;
   z-index: 1000;
   position: fixed;
`;

export const BackButton = styled.button`
   background: none;
   border: none;
   font-size: 25px;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 5px;
   left: 20px;
`;

export const Title = styled.h2`
   font-size: 20px;
   font-weight: 600;
   color: #333;
`;
