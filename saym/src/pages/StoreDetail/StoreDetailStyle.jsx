import styled from 'styled-components';
// 쿠폰 배경 이미지 import
import couponBgImage from '../../assets/img/couponBgImage.png'; // 실제 이미지 경로로 수정해주세요.

export const PageContainer = styled.div`
   width: 100%;
   height: 100dvh;
   display: flex;
   flex-direction: column;
   box-sizing: border-box;
   position: relative;
   padding-top: 75px;
`;

export const ContentWrapper = styled.div`
   padding: 0 25px;
`;

export const StoreInfoSection = styled.section`
   display: flex;
   align-items: center;
   padding: 20px 0;
   gap: 20px;
   position: relative;
   margin-bottom: 20px;
`;

export const StoreImagePlaceholder = styled.div`
   width: 100px;
   height: 100px;
   background-color: #f0f0f0;
   border-radius: 8px;
   flex-shrink: 0;
`;

export const InfoTextWrapper = styled.div`
   display: flex;
   flex-direction: column;
`;

export const StoreName = styled.h2`
   font-size: 20px;
   font-weight: bold;
   margin-bottom: 50px;
`;

export const OperatingHours = styled.p`
   font-size: 14px;
   color: #888;
   margin: 0;
`;

export const EditButton = styled.button`
   position: absolute;
   top: 20px;
   right: 0;
   background: none;
   border: none;
   margin-top: 10px;
   color: #888;
   font-size: 12px;
   cursor: pointer;
`;

export const CouponSection = styled.section`
   display: flex;
   justify-content: space-between;
   gap: 10px;
   margin-bottom: 30px;
`;

export const CouponWrapper = styled.div`
   flex: 1;
   background-image: url(${couponBgImage});
   background-size: cover;
   background-position: center;
   color: #000000;
   padding: 10px;
   border-radius: 8px;
   align-items: center;
   cursor: pointer;
   margin-bottom: 20px;
   min-height: 40px;
   display: flex;
   justify-content: center; /* 가로 중앙 정렬 */
   align-items: center; /* 세로 중앙 정렬 */
   gap: 3px;
`;

export const CouponText = styled.span`
   font-size: 12px;
`;

export const Section = styled.section`
   margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
   font-size: 18px;
   font-weight: bold;
   margin: 0 0 15px 0;
   display: flex;
   align-items: center;
   margin-bottom: 30px;
   gap: 8px;
`;

export const SectionHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

export const WriteReviewLink = styled.a`
   font-size: 12px;
   color: #555;
   text-decoration: none;
`;

export const MenuGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 20px 10px;
`;

export const MenuItem = styled.div`
   text-align: center;
   margin-bottom: 30px;
`;

export const MenuName = styled.p`
   margin: 0 0 5px 0;
   font-size: 14px;
`;

export const MenuPrice = styled.p`
   margin: 0;
   font-size: 14px;
   color: #555;
`;

export const InfoBox = styled.div`
   border: 1px solid #e0e0e0;
   border-radius: 8px;
   padding: 15px;
   font-size: 14px;
   color: #333;

   p {
      margin: 0 0 8px 0;
      &:last-child {
         margin-bottom: 0;
      }
   }
`;

export const ReviewItem = styled.div`
   display: flex;
   align-items: center;
   gap: 15px;
`;

export const ReviewImagePlaceholder = styled.div`
   width: 60px;
   height: 60px;
   background-color: #f0f0f0;
   border-radius: 4px;
   flex-shrink: 0;
`;

export const ReviewText = styled.p`
   margin: 0;
   font-size: 14px;
`;

// --- Modal Styles ---

export const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
`;

export const ModalContent = styled.div`
   background-color: white;
   padding: 20px;
   border-radius: 10px;
   width: 80%;
   max-width: 300px;
   text-align: center;

   h3 {
      margin-top: 0;
   }

   p {
      margin-bottom: 20px;
   }
`;

export const CloseButton = styled.button`
   background-color: #4daeff;
   color: white;
   border: none;
   padding: 10px 20px;
   border-radius: 5px;
   cursor: pointer;
`;
