import styled from 'styled-components';

export const ChatlogContainer = styled.div``;

export const LogList = styled.ul`
   list-style: none;
   margin: 0;
   padding: 20px 30px;
   padding-top: 75px;
`;

export const LogItem = styled.li`
   display: flex;
   flex-direction: column;
   align-items: left;
   gap: 20px;
   padding: 20px 5px;
   border-bottom: 1px solid #f0f0f0;
   cursor: pointer;

   &:last-child {
      border-bottom: none;
   }
`;

export const Thumbnail = styled.img`
   width: 100px;
   height: 100px;
   border-radius: 12px;
   background-color: #f0f0f0;
   object-fit: cover;
`;

export const InfoWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
`;

export const Title = styled.h3`
   font-size: 16px;
   font-weight: 600;
   color: #333;
   margin: 0;
   width: 95%;
`;

export const Date = styled.p`
   font-size: 14px;
   color: #888;
   margin: 0;
`;
