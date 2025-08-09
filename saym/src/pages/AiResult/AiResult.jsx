import * as S from './AiResultStyle';
import SubHeader from '../../components/SubHeader/SubHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dummyData = {
   infoBoxText: `
    🎪 행사명: 2025 전주 비빔밥 축제
    일시: 2025년 10월 2일(목) ~ 10월 6일(월)
    장소: 전주한옥마을 일대

    🧭 기획 시 고려할 요소
    - 지역 특산물 연계 강화: 전주 콩나물, 오미자, 모주 등 전주만의 농산물과 연계한 시그니처 메뉴나 쿠킹 클래스 추가 필요
    - 역사적 요소 반영: 전주의 조선왕조 발원지라는 정체성을 살려 '조선시대 왕의 밥상' 콘셉트의 전통식사 체험 프로그램 가능

    🎯 홍보 문구 및 추천 슬로건
    - "맛으로 하나되다, 2025 전주 비빔밥 축제"
    🎪 행사명: 2025 전주 비빔밥 축제
일시: 2025년 10월 2일(목) ~ 10월 6일(월)
장소: 전주한옥마을 일대

🧭 기획 시 고려할 요소
- 지역 특산물 연계 강화: 전주 콩나물, 오미자, 모주 등 전주만의 농산물과 연계한 시그니처 메뉴나 쿠킹 클래스 추가 필요
- 역사적 요소 반영: 전주의 조선왕조 발원지라는 정체성을 살려 '조선시대 왕의 밥상' 콘셉트의 전통식사 체험 프로그램 가능

🎯 홍보 문구 및 추천 슬로건
- "맛으로 하나되다, 2025 전주 비빔밥 축제"

   `,
   predictionText: `
🥳 긍정적 평가 예상: 82%
😵‍💫 부정적 평가 예상: 18% (야외 위주 동선 및 혼잡 우려)
   `,
};

const AiResult = () => {
   const handlePaidFeatureClick = () => {
      toast.info('유료 기능입니다!');
   };

   return (
      <>
         <SubHeader title="AI 평가 결과" />
         <S.AiResultContainer>
            <ToastContainer position="top-right" />
            <S.ContentArea>
               <S.InfoBox>
                  <S.BackendDataContainer>
                     {dummyData.infoBoxText}
                  </S.BackendDataContainer>
               </S.InfoBox>

               <S.SuggestionTxt>사용자 예상 평가</S.SuggestionTxt>
               <S.PredictionBox>
                  <S.BackendDataContainer>
                     {dummyData.predictionText}
                  </S.BackendDataContainer>
               </S.PredictionBox>
            </S.ContentArea>

            <S.ButtonWrapper>
               <S.ActionButton onClick={handlePaidFeatureClick}>
                  파일 추가하고 다시 결과 보기
               </S.ActionButton>
               <S.ActionButton primary onClick={handlePaidFeatureClick}>
                  홍보하러 가기
               </S.ActionButton>
            </S.ButtonWrapper>
         </S.AiResultContainer>
      </>
   );
};

export default AiResult;
