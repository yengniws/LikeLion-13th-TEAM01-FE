import * as S from './AiResultStyle';
import SubHeader from '../../components/SubHeader/SubHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/Loading/Loding';

const AiResult = () => {
   const { id } = useParams(); // /airesult/:id
   const [infoBoxText, setInfoBoxText] = useState('');
   const [predictionText, setPredictionText] = useState('');
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchResult = async () => {
         const startTime = Date.now();
         try {
            const res = await axiosInstance.get(`/api/v1/ai/chat-record/${id}`);
            const data = res.data;

            const infoText = `
🧭 기획 시 고려할 요소
${data.considerations?.map((c) => `- ${c}`).join('\n')}

🎯 홍보 문구 및 추천 슬로건
${data.slogans?.map((s) => `- "${s}"`).join('\n')}
`;

            const prediction = `
🥳 긍정적 평가 예상: ${data.userEvaluation?.positive_percentage}
😵‍💫 부정적 평가 예상: ${data.userEvaluation?.negative_reasons?.join(', ')}
`;

            setInfoBoxText(infoText.trim());
            setPredictionText(prediction.trim());
         } catch (error) {
            console.error('결과 불러오기 실패:', error);
            toast.error('AI 분석 결과를 불러오지 못했습니다.');
         } finally {
            const elapsed = Date.now() - startTime;
            const remainingTime = 2000 - elapsed;
            if (remainingTime > 0) {
               setTimeout(() => setLoading(false), remainingTime);
            } else {
               setLoading(false);
            }
         }
      };

      fetchResult();
   }, [id]);

   const handlePaidFeatureClick = () => {
      toast.info('유료 기능입니다!');
   };

   if (loading) {
      return (
         <>
            <Loading />
         </>
      );
   }

   return (
      <>
         <SubHeader title="AI 평가 결과" />
         <S.AiResultContainer>
            <ToastContainer position="top-right" />
            <S.ContentArea>
               <S.InfoBox>
                  <S.BackendDataContainer>{infoBoxText}</S.BackendDataContainer>
               </S.InfoBox>

               <S.SuggestionTxt>사용자 예상 평가</S.SuggestionTxt>
               <S.PredictionBox>
                  <S.BackendDataContainer>
                     {predictionText}
                  </S.BackendDataContainer>
               </S.PredictionBox>
            </S.ContentArea>

            <S.ButtonWrapper>
               <S.ActionButton onClick={handlePaidFeatureClick}>
                  파일 추가하고 다시 결과 보기
               </S.ActionButton>
               <S.ActionButton $primary onClick={handlePaidFeatureClick}>
                  홍보하러 가기
               </S.ActionButton>
            </S.ButtonWrapper>
         </S.AiResultContainer>
      </>
   );
};

export default AiResult;
