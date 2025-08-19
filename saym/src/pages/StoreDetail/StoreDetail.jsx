import React, { useState } from 'react';
import * as S from './StoreDetailStyle';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import { FaMapMarkerAlt, FaCommentDots, FaDownload } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import couponBg from '../../assets/img/couponBgImage.png'; // 쿠폰 배경 이미지

const storeData = {
   name: '가게 이름',
   operatingHours: '15:00 - 23:00',
   coupons: [
      {
         id: 1,
         name: '5000원 할인 쿠폰',
         description: '오후 5시부터 8시까지 사용 가능합니다.',
      },
      {
         id: 2,
         name: '미니 김치찌개 쿠폰',
         description: '메인 메뉴 주문 시 사용 가능합니다. (시간 무관)',
      },
   ],
   menu: [
      { id: 1, name: '삼겹살', price: '20000원' },
      { id: 2, name: '마라샹궈', price: '20000원' },
      { id: 3, name: '김치', price: '20000원' },
      { id: 4, name: '들기름 막국수', price: '20000원' },
      { id: 5, name: '육회', price: '20000원' },
      { id: 6, name: '말차커피', price: '20000원' },
   ],
   location: {
      address: '서울특별시 구로구 연동로 320',
      parking: '초록 상가 옆 무료 주차장',
   },
   reviews: [{ id: 1, content: '짧은 글', imageUrl: 'placeholder_url' }],
};

const StoreDetail = () => {
   const [isOwner, setIsOwner] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedCoupon, setSelectedCoupon] = useState(null);

   // 쿠폰 클릭 시 모달 열기 + 다운로드
   const handleCouponClick = (coupon) => {
      setSelectedCoupon(coupon);
      setIsModalOpen(true);

      // 다운로드
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 700;
      canvas.height = 175;

      const img = new Image();
      img.src = couponBg;
      img.onload = () => {
         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

         ctx.fillStyle = 'black';
         ctx.textAlign = 'center';
         ctx.textBaseline = 'middle';

         ctx.font = '24px Arial';
         ctx.fillText(coupon.name, canvas.width / 2, canvas.height / 2 - 20);
         ctx.font = '18px Arial';
         ctx.fillText(
            coupon.description,
            canvas.width / 2,
            canvas.height / 2 + 20,
         );

         const link = document.createElement('a');
         link.download = `${coupon.name}.png`;
         link.href = canvas.toDataURL('image/png');
         link.click();
      };
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedCoupon(null);
   };

   return (
      <S.PageContainer>
         <Header />

         <S.ContentWrapper>
            {/* 가게 기본 정보 */}
            <S.StoreInfoSection>
               <S.StoreImagePlaceholder />
               <S.InfoTextWrapper>
                  <S.StoreName>{storeData.name}</S.StoreName>
                  <S.OperatingHours>
                     영업시간 : {storeData.operatingHours}
                  </S.OperatingHours>
               </S.InfoTextWrapper>
               {isOwner && (
                  <S.EditButton>
                     <FaPen /> &nbsp;가게 정보 수정
                  </S.EditButton>
               )}
            </S.StoreInfoSection>

            {/* 쿠폰 섹션 */}
            <S.CouponSection>
               {storeData.coupons.map((coupon) => (
                  <S.CouponWrapper
                     key={coupon.id}
                     onClick={() => handleCouponClick(coupon)}
                  >
                     <S.CouponText>{coupon.name}</S.CouponText>
                     <FaDownload color="4DAEFF" size={15} />
                  </S.CouponWrapper>
               ))}
            </S.CouponSection>

            {/* 메뉴판 섹션 */}
            <S.Section>
               <S.SectionTitle>메뉴판</S.SectionTitle>
               <S.MenuGrid>
                  {storeData.menu.map((item) => (
                     <S.MenuItem key={item.id}>
                        <S.MenuName>{item.name}</S.MenuName>
                        <S.MenuPrice>{item.price}</S.MenuPrice>
                     </S.MenuItem>
                  ))}
               </S.MenuGrid>
            </S.Section>

            {/* 위치 섹션 */}
            <S.Section>
               <S.SectionTitle>
                  위치 <FaMapMarkerAlt />
               </S.SectionTitle>
               <S.InfoBox>
                  <p>위치 : {storeData.location.address}</p>
                  <p>주차장 : {storeData.location.parking}</p>
               </S.InfoBox>
            </S.Section>

            {/* 리뷰 섹션 */}
            <S.Section>
               <S.SectionHeader>
                  <S.SectionTitle>
                     리뷰 <LuNotebookPen size={20} />
                     <S.WriteReviewLink href="#">
                        + 리뷰 작성하러 가기
                     </S.WriteReviewLink>
                  </S.SectionTitle>
               </S.SectionHeader>
               <S.InfoBox>
                  {storeData.reviews.map((review) => (
                     <S.ReviewItem key={review.id}>
                        <S.ReviewImagePlaceholder />
                        <S.ReviewText>{review.content}</S.ReviewText>
                     </S.ReviewItem>
                  ))}
               </S.InfoBox>
            </S.Section>
         </S.ContentWrapper>

         {/* 쿠폰 모달 */}
         {isModalOpen && (
            <S.ModalBackdrop onClick={closeModal}>
               <S.ModalContent onClick={(e) => e.stopPropagation()}>
                  <h3>{selectedCoupon?.name}</h3>
                  <p>{selectedCoupon?.description}</p>
                  <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
               </S.ModalContent>
            </S.ModalBackdrop>
         )}
      </S.PageContainer>
   );
};

export default StoreDetail;
