import styled from 'styled-components';

export const AuthContainer = styled.div`
   position: relative;
   width: 100%;
   height: 100vh;
   background-color: white;
   overflow: hidden;
   padding: 30px;
`;

export const AuthTxt = styled.div`
   position: absolute;
   top: 40px;
   left: 30px;
   font-size: 27px;
   font-weight: 600;
   color: #000;
   line-height: 1.4;
   letter-spacing: -0.1px;
   padding-top: 50px;
`;

export const CardImage = styled.img`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 75%;
`;

export const ChatMsg = styled.img`
   position: absolute;
   bottom: 105px;
   left: 50%;
   transform: translateX(-50%);
   width: 70%;
`;

export const UploadButton = styled.button`
   position: absolute;
   bottom: 40px;
   left: 30px;
   right: 30px;
   background-color: #4daeff;
   border: none;
   color: white;
   font-size: 20px;
   font-weight: 600;
   padding: 14px 0;
   border-radius: 10px;
   cursor: pointer;
`;

export const HiddenFileInput = styled.input`
   display: none;
`;

export const UploadedFileDisplay = styled.div`
   position: absolute;
   bottom: 100px;
   left: 50%;
   transform: translateX(-50%);
   width: 70%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
`;

export const FileName = styled.span`
   font-size: 16px;
   color: gray;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

export const ClearButton = styled.button`
   background: none;
   border: none;
   font-size: 24px;
   font-weight: bold;
   color: gray;
   cursor: pointer;
   padding: 0;
   line-height: 1;
`;
