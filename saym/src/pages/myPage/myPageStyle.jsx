import styled from 'styled-components';

export const MyPageContainer = styled.div`
   display: flex;
   flex-direction: column;
   min-height: 100dvh;
   width: 100%;
   max-width: 390px;
   box-sizing: border-box;
   padding: 0px 31px;
   position: relative;
   background-color: white;
   overscroll-behavior: contain;
   overflow: hidden;
`;

export const ContentContainer = styled.div`
   padding: 20px;
   padding-top: 100px;
   flex-grow: 1;
   position: relative;
   flex-shrink: 1;
   min-height: 0;
   overflow: hidden;
`;

export const ProfileSection = styled.div`
   display: flex;
   align-items: center;
   padding-bottom: 10px;
`;

export const ProfileImage = styled.img`
   width: 70px;
   height: 70px;
   background-color: #d9d9d9;
   border-radius: 50%;
`;

export const NameSection = styled.div`
   display: flex;
   align-items: center;
   margin-left: 15px;
   flex-grow: 1;
`;

export const ProfileName = styled.span`
   font-size: 18px;
   font-weight: bold;
   max-width: 100px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   display: inline-block;
`;

export const NameInput = styled.input`
   font-size: 18px;
   font-weight: bold;
   border: none;
   border-bottom: 1px solid #ccc;
   outline: none;
   background: transparent;
   width: 50px;
`;

export const EditIcon = styled.div`
   margin-left: 8px;
   cursor: pointer;
   color: #888;
   &:hover {
      color: #000;
   }
`;

export const UseHistoryButton = styled.button`
   background-color: #d2f0ff;
   border: none;
   border-radius: 10px;
   padding: 5px 12px;
   font-size: 14px;
   color: #333;
   cursor: pointer;
`;

export const Divider = styled.hr`
   border: none;
   border-top: 1px solid #4daeff;
   /* margin-bottom: 20px; */
`;

export const SavedEventsSection = styled.div`
   background-color: #fffacd;
   border-radius: 10px;
   padding: 12px 15px;
   margin: 20px 0px;
`;

export const SectionTitle = styled.h2`
   font-size: 13px;
   font-weight: normal;
   margin-bottom: 10px;
`;

export const EventsList = styled.div`
   max-height: 200px;
   overflow-y: auto;
   &::-webkit-scrollbar {
      width: 5px;
   }
   &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 10px;
   }
   &::-webkit-scrollbar-track {
      background-color: transparent;
   }
`;

export const EventItem = styled.div`
   display: flex;
   align-items: center;
   padding: 5px 0;
   cursor: pointer;
   &:not(:last-child) {
      border-bottom: 1px solid #ddd;
   }
`;

export const EventImage = styled.img`
   width: 50px;
   height: 50px;
   background-color: #d9d9d9;
   border-radius: 8px;
   margin-right: 15px;
`;

export const EventName = styled.span`
   font-size: 16px;
`;

export const ButtonSection = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;
   padding-bottom: 30px;
`;

export const ActionButton = styled.button`
   background-color: #d2f0ff;
   color: #333;
   border: none;
   border-radius: 10px;
   padding: 12px;
   font-size: 16px;
   font-weight: bold;
   cursor: pointer;
   &:hover {
      background-color: #a3e5ff;
   }
`;

export const ActionButtonStore = styled.button`
   background-color: #e1c9ff;
   color: #333;
   border: none;
   border-radius: 10px;
   padding: 12px;
   font-size: 16px;
   font-weight: bold;
   cursor: pointer;
   &:hover {
      background-color: #c99fff;
   }
`;

export const Footer = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 0px 30px;
`;

export const FooterLink = styled.a`
   font-size: 14px;
   color: #888;
   text-decoration: none;
`;

export const NoEventMessage = styled.div`
   width: 100%;
   text-align: center;
   color: #aaa;
   font-size: 16px;
   padding: 30px 0;
`;
