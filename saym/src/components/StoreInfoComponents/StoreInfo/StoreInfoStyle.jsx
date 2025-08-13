import styled from 'styled-components';

export const Container = styled.div`
   padding: 80px 40px 31px 31px;
   background-color: white;
`;

export const Title = styled.div`
   font-size: 22px;
   font-weight: 600;
   padding-top: 25px;
   padding-bottom: 5px;
`;

export const Label = styled.label`
   font-weight: 600;
   margin-top: 35px;
   display: block;
   font-size: 18px;
   margin-bottom: 10px;
`;

export const SmlLabel = styled.label`
   font-weight: 600;
   margin-top: 20px;
   display: block;
   font-size: 13px;
   margin-bottom: 10px;
`;

export const Input = styled.input`
   width: 100%;
   padding: 13px;
   margin: 5px 0px;
   border: 1.5px solid #ddd;
   border-radius: 10px;

   &::placeholder {
      color: #ccc;
      font-weight: 600;
   }

   &:focus {
      outline: none;
      border-color: #4daeff;
   }
`;

export const CouponInputWrapper = styled.div`
   padding-bottom: 5px;
`;

export const CheckboxWrapper = styled.div`
   padding-bottom: 5px;
`;

export const Select = styled.select`
   padding: 10px;
   border: 1.5px solid #ddd;
   border-radius: 10px;
   font-weight: 500;

   &:focus {
      outline: none;
      border-color: #4daeff;
   }
`;

export const TimeTxt = styled.div`
   font-weight: 600;
   font-size: 15px;
   color: #bbb;
`;

export const TimeRow = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;

export const AddressWrapper = styled.div`
   display: flex;
   gap: 8px;
`;

export const Button = styled.button`
   margin: 5px 0px;
   width: 50%;
   height: 42px;
   border: none;
   background-color: #4daeff;
   color: white;
   border-radius: 10px;
   cursor: pointer;
`;

export const AddButton = styled.div`
   color: #4daeff;
   cursor: pointer;
   font-size: 13px;
   font-weight: 600;
   padding-top: 10px;
`;

export const MenuBox = styled.div`
   display: flex;
   gap: 8px;
`;

export const SubmitButton = styled.button`
   width: 100%;
   padding: 13px;
   background-color: #4daeff;
   color: white;
   font-size: 16px;
   font-weight: bold;
   border: none;
   border-radius: 10px;
   cursor: pointer;
   margin-top: 30px;
`;

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
