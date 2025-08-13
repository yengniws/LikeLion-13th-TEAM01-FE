import styled from 'styled-components';

export const Wrapper = styled.div`
   margin: 15px 0px;
`;

export const UploadButton = styled.div`
   cursor: pointer;
   width: 110px;
   height: 110px;

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
`;

export const PreviewWrapper = styled.div`
   margin: 15px 0px;
`;

export const PreviewImage = styled.img`
   width: 110px;
   height: 110px;
   border-radius: 5px;
   object-fit: cover;
`;

export const ChangeButton = styled.div`
   margin-top: 10px;
   color: #4daeff;
   cursor: pointer;
   font-size: 15px;
`;
