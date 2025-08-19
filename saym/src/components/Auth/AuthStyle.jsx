import styled from 'styled-components';

export const AuthContainer = styled.div`
   position: relative;
   width: 100%;
   height: 100dvh;
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
   padding-top: 20px;
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

export const ModalOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   min-width: 100vw;
   min-height: 100dvh;
   width: 100vw;
   height: 100dvh;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
   overflow-x: hidden;
`;

export const ModalContent = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   background: white;
   padding-left: 30px;
   padding-right: 30px;
   padding-top: 50px;
   padding-bottom: 20px;
   border-radius: 15px;
   text-align: center;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   div {
      font-size: 18px;
      color: #000;
   }
`;

export const ModalButton = styled.button`
   background-color: #4daeff;
   color: white;
   font-size: 16px;
   font-weight: 600;
   padding: 10px 20px;
   border: none;
   border-radius: 10px;
   cursor: pointer;
   margin-top: 10px;
`;
