import { useState, useEffect } from 'react';
import SubHeader from '../../SubHeader/SubHeader';
import ImageUploader from '../ImageUploader';
import TimeSelector from '../TimeSelector';
import CouponInput from '../CouponInput';
import MenuInput from '../MenuInput';
import { useKakaoAddressFinder } from '../../../hooks/KakaoAddressFinder';
import * as S from './StoreInfoStyle';

export default function StoreInfo({ isEdit, initialData }) {
   const [storeData, setStoreData] = useState(
      initialData || {
         storeName: '',
         storePhone: '',
         businessStart: '00',
         businessEnd: '00',
         breakStart: '00',
         breakEnd: '00',
         holiday: '없음',
         address: {
            zipcode: '',
            mainAddress: '',
            extraAddress: '',
            detailAddress: '',
         },
         coupons: [
            { price: '', startTime: '00', endTime: '00', timeEnabled: true },
         ],
         menus: [{ name: '', price: '' }],
      },
   );

   const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

   // 수정 페이지 초기 데이터 세팅
   useEffect(() => {
      if (isEdit && initialData) setStoreData(initialData);
   }, [isEdit, initialData]);

   // 카카오 우편번호 api
   useKakaoAddressFinder(setStoreData, isPostcodeOpen);

   const handleInputChange = (field, value) => {
      setStoreData((prev) => ({ ...prev, [field]: value }));
   };

   const handleAddressChange = (field, value) => {
      setStoreData((prev) => ({
         ...prev,
         address: { ...prev.address, [field]: value },
      }));
   };

   // 쿠폰 관련
   const handleCouponChange = (index, field, value) => {
      const updatedCoupons = [...storeData.coupons];
      updatedCoupons[index][field] = value;
      setStoreData((prev) => ({ ...prev, coupons: updatedCoupons }));
   };
   const toggleCouponTime = (index) => {
      const updatedCoupons = [...storeData.coupons];
      updatedCoupons[index].timeEnabled = !updatedCoupons[index].timeEnabled;
      setStoreData((prev) => ({ ...prev, coupons: updatedCoupons }));
   };
   const addCouponField = () => {
      setStoreData((prev) => ({
         ...prev,
         coupons: [
            ...prev.coupons,
            { price: '', startTime: '00', endTime: '00', timeEnabled: true },
         ],
      }));
   };

   // 메뉴 관련
   const handleMenuChange = (index, field, value) => {
      const updatedMenus = [...storeData.menus];
      updatedMenus[index][field] = value;
      setStoreData((prev) => ({ ...prev, menus: updatedMenus }));
   };
   const addMenuField = () => {
      setStoreData((prev) => ({
         ...prev,
         menus: [...prev.menus, { name: '', price: '' }],
      }));
   };

   const handleSubmit = () => {
      if (isEdit) {
         console.log('수정 API 호출');
         // PUT 요청
      } else {
         console.log('등록 API 호출');
         // POST 요청
      }
   };

   return (
      <>
         <SubHeader title={isEdit ? '가게 수정하기' : '가게 등록하기'} />
         <S.Container>
            <S.Title>가게 정보를 입력해 주세요</S.Title>

            <S.Label>가게 대표 이미지</S.Label>
            <ImageUploader />

            <S.Label>가게 이름</S.Label>
            <S.Input
               placeholder="가게 이름을 입력해주세요"
               value={storeData.storeName}
               onChange={(e) => handleInputChange('storeName', e.target.value)}
            />

            <S.Label>가게 전화번호</S.Label>
            <S.Input
               placeholder="숫자만 입력해주세요"
               value={storeData.storePhone}
               onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  handleInputChange('storePhone', onlyNumbers);
               }}
            />

            <S.Label>영업 시간</S.Label>
            <TimeSelector
               label="영업"
               startHour={storeData.businessStart}
               endHour={storeData.businessEnd}
               onStartChange={(e) =>
                  handleInputChange('businessStart', e.target.value)
               }
               onEndChange={(e) =>
                  handleInputChange('businessEnd', e.target.value)
               }
            />
            <br />
            <TimeSelector
               label="브레이크타임"
               startHour={storeData.breakStart}
               endHour={storeData.breakEnd}
               onStartChange={(e) =>
                  handleInputChange('breakStart', e.target.value)
               }
               onEndChange={(e) =>
                  handleInputChange('breakEnd', e.target.value)
               }
            />

            <S.SmlLabel>정기 휴일</S.SmlLabel>
            <S.Select
               value={storeData.holiday}
               onChange={(e) => handleInputChange('holiday', e.target.value)}
            >
               <option>없음</option>
               <option>월요일</option>
               <option>화요일</option>
               <option>수요일</option>
               <option>목요일</option>
               <option>금요일</option>
               <option>토요일</option>
               <option>일요일</option>
            </S.Select>

            {/* 가게 위치 */}
            <S.Label>가게 위치</S.Label>
            <S.AddressWrapper>
               <S.Input
                  placeholder="우편번호"
                  readOnly
                  value={storeData.address.zipcode}
               />
               <S.Button type="button" onClick={() => setIsPostcodeOpen(true)}>
                  우편번호 찾기
               </S.Button>
            </S.AddressWrapper>
            <S.Input
               placeholder="주소"
               readOnly
               value={storeData.address.mainAddress}
            />
            <S.Input
               placeholder="상세 주소"
               value={storeData.address.detailAddress}
               onChange={(e) =>
                  handleAddressChange('detailAddress', e.target.value)
               }
            />

            {/* embed 모달 */}
            {isPostcodeOpen && (
               <div
                  style={{
                     position: 'fixed',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     backgroundColor: 'rgba(0,0,0,0.5)',
                     zIndex: 9999,
                  }}
               >
                  <div
                     style={{
                        width: '400px',
                        height: '500px',
                        margin: '100px auto',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                     }}
                  >
                     <div
                        id="daum-postcode"
                        style={{ width: '100%', height: '100%' }}
                     />
                  </div>
                  <S.Button
                     type="button"
                     onClick={() => setIsPostcodeOpen(false)}
                     style={{ position: 'absolute', top: 20, right: 20 }}
                  >
                     닫기
                  </S.Button>
               </div>
            )}

            {/* 쿠폰 */}
            <S.Label>쿠폰 설정</S.Label>
            {storeData.coupons.map((coupon, idx) => (
               <CouponInput
                  key={idx}
                  coupon={coupon}
                  index={idx}
                  onCouponChange={handleCouponChange}
                  onToggleTime={toggleCouponTime}
               />
            ))}
            <S.AddButton type="button" onClick={addCouponField}>
               + 쿠폰 추가
            </S.AddButton>

            {/* 메뉴 */}
            <S.Label>메뉴</S.Label>
            {storeData.menus.map((menu, idx) => (
               <MenuInput
                  key={idx}
                  menu={menu}
                  index={idx}
                  onMenuChange={handleMenuChange}
               />
            ))}
            <S.AddButton type="button" onClick={addMenuField}>
               + 메뉴 추가
            </S.AddButton>

            <S.SubmitButton type="button" onClick={handleSubmit}>
               {isEdit ? '수정 완료' : '다음'}
            </S.SubmitButton>
         </S.Container>
      </>
   );
}
