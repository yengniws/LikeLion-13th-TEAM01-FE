import styled from 'styled-components';

export const HeaderContainer = styled.header`
   width: 100%;
   padding: 30px 20px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: fixed;
   top: 0;
   left: 0;
   background-color: white;
   z-index: 1000;
   position: absolute;
`;

export const Logo = styled.img`
   width: 90px;
   height: auto;
   cursor: pointer;
`;

export const IconWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
`;

export const IconLink = styled.div`
   font-size: 28px;
   color: #4daeff;
   cursor: pointer;
   display: flex;
   align-items: center;
`;

export const IconLinkP = styled.div`
   font-size: 35px;
   color: #4daeff;
   cursor: pointer;
   display: flex;
   align-items: center;
`;
