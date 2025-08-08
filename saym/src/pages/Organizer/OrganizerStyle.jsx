import styled, { keyframes } from 'styled-components';
import OrganizerBackground from '../../assets/img/or_bg.png';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const OrganizerContainer = styled.div`
   width: 100%;
   height: 100vh;
   background-image: url(${OrganizerBackground});
   background-size: contain;
   background-position: center;
   background-repeat: no-repeat;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 30px;
   position: relative;
`;

export const OrganizerTxt = styled.div`
   font-size: 17px;
   font-weight: 500;
   color: black;
   letter-spacing: 0.5px;
   animation: ${float} 4s ease-in-out infinite;
`;

export const InputBarContainer = styled.div`
   position: absolute;
   bottom: 40px;
   left: 50%;
   transform: translateX(-50%);
   width: 90%;
   display: flex;
   align-items: center;
   gap: 15px;
   background-color: rgba(235, 245, 255, 0.8);
   border: 1px solid #cce3ff;
   padding: 10px 15px;
   border-radius: 50px;
`;

export const IconButton = styled.button`
   background: #d4e8ff;
   border: none;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   color: #4daeff;
   font-size: 22px;
`;

export const TextInput = styled.input`
   flex-grow: 1;
   border: none;
   background: transparent;
   outline: none;
   font-size: 16px;
   color: #333;

   &::placeholder {
      color: #8a9db0;
   }
`;

export const UploadedFileDisplay = styled.div`
   position: absolute;
   bottom: 110px;
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
