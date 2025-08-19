import styled from 'styled-components';

export const AiResultContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 20px 30px;
   padding-top: 100px;
   height: 100dvh;
   overflow: hidden;
`;

export const ContentArea = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
   gap: 10px;
   overflow: hidden;
`;

export const InfoBox = styled.div`
   background-color: #def3ff;
   border-radius: 15px;
   padding: 15px;
   overflow-y: auto;
   flex: 1;
   white-space: pre-wrap;
   box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
`;

export const BackendDataContainer = styled.div`
   color: #333;
   line-height: 1.6;
   font-size: 13px;
   overflow-y: auto;
   flex: 1;
   white-space: pre-wrap;
   padding-right: 8px;
`;

export const PredictionBox = styled.div`
   background-color: #fff9a6;
   border-radius: 15px;
   padding: 15px 15px;
   font-weight: 600;
   white-space: pre-wrap;
   margin-bottom: 20px;
   box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonWrapper = styled.div`
   display: flex;
   gap: 20px;
   padding-top: 20px;
`;

export const ActionButton = styled.button`
   flex: 1;
   padding: 13px 8px;
   border: none;
   border-radius: 10px;
   font-size: 11px;
   font-weight: 700;
   cursor: pointer;
   background-color: #4daeff;
   color: #fff;
   margin-bottom: 15px;
`;

export const SuggestionTxt = styled.div`
   padding-top: 20px;
   font-size: 14px;
   color: black;
   font-weight: 700;
`;
