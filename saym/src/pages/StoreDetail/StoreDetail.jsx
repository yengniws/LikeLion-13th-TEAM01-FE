import { useState, useEffect } from 'react';
import * as S from './StoreDetailStyle';
import Header from '../../components/Header/Header_ customer/Header_ customer';
import { FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import couponBg from '../../assets/img/couponBgImage.png';
import axiosInstance from '../../api/AxiosInstance';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../components/Loading/Loding';

const StoreDetail = () => {
   const { storeId } = useParams();
   const [storeData, setStoreData] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedCoupon, setSelectedCoupon] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStoreDetail = async () => {
         try {
            const startTime = Date.now();

            const [storeRes, reviewRes] = await Promise.all([
               axiosInstance.get(`/api/v1/store/${storeId}`),
               axiosInstance.get(`/api/v1/store/review/${storeId}`),
            ]);

            const apiData = storeRes.data?.data;
            const reviewData = reviewRes.data?.data || [];

            setStoreData({
               id: apiData.id,
               name: apiData.name,
               pictureUrl: apiData.pictureUrl,
               operatingHours:
                  apiData.operatingHours ||
                  `${apiData.openTime} - ${apiData.closeTime}`,
               coupons: apiData.couponName
                  ? [
                       {
                          id: 1,
                          name: apiData.couponName,
                       },
                    ]
                  : [],
               menu: apiData.menus.map((m) => ({
                  id: m.id,
                  name: m.menuName,
                  price: `${m.price}원`,
               })),
               location: {
                  address: apiData.address,
                  parking: apiData.parkingNote,
               },
               reviews: reviewData.map((r) => ({
                  id: r.id,
                  content: r.content,
               })),
            });

            const elapsed = Date.now() - startTime;
            const remaining = 2000 - elapsed;
            setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
         } catch (err) {
            console.error('가게 정보 불러오기 실패:', err);
            setLoading(false);
         }
      };

      fetchStoreDetail();
   }, [storeId]);

   const handleCouponClick = (coupon) => {
      setSelectedCoupon(coupon);
      setIsModalOpen(true);

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

         // 쿠폰 이름 (중앙)
         ctx.font = '24px Arial';
         ctx.fillText(coupon.name, canvas.width / 2, canvas.height / 2 - 20);

         // 가게 이름 (하단)
         ctx.font = '18px Arial';
         ctx.fillText(storeData.name, canvas.width / 2, canvas.height - 30);

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

   if (loading) {
      return <LoadingScreen />;
   }

   if (!storeData) {
      return (
         <S.PageContainer>
            <Header />
            <S.ContentWrapper>
               <p>가게 정보를 불러올 수 없습니다.</p>
            </S.ContentWrapper>
         </S.PageContainer>
      );
   }

   return (
      <S.PageContainer>
         <Header />

         <S.ContentWrapper>
            {/* 가게 기본 정보 */}
            <S.StoreInfoSection>
               {storeData.pictureUrl ? (
                  <img
                     src={storeData.pictureUrl}
                     alt={storeData.name}
                     style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                     }}
                  />
               ) : (
                  <S.StoreImagePlaceholder />
               )}
               <S.InfoTextWrapper>
                  <S.StoreName>{storeData.name}</S.StoreName>
                  <S.OperatingHours>
                     영업시간 : {storeData.operatingHours}
                  </S.OperatingHours>
               </S.InfoTextWrapper>
            </S.StoreInfoSection>

            {/* 쿠폰 섹션 */}
            {storeData.coupons.length > 0 && (
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
            )}

            {/* 메뉴판 섹션 */}
            <S.Section>
               <S.SectionTitle>메뉴판</S.SectionTitle>
               <S.MenuGrid>
                  {storeData.menu.map((item) => (
                     <S.MenuItem key={item.id}>
                        <S.MenuName>{item.name}</S.MenuName>
                        <br />
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
                  </S.SectionTitle>
               </S.SectionHeader>
               <S.InfoBox>
                  {storeData.reviews.length > 0 ? (
                     storeData.reviews.map((review) => (
                        <S.ReviewItem key={review.id}>
                           <S.ReviewText>{review.content}</S.ReviewText>
                        </S.ReviewItem>
                     ))
                  ) : (
                     <p>아직 리뷰가 없습니다.</p>
                  )}
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
