import { useState } from 'react';
import SubHeader from '../../components/SubHeader/SubHeader';
import ImageUploader from '../../components/StoreInfoComponents/ImageUploader';
import TimeSelector from '../../components/StoreInfoComponents/TimeSelector';
import CouponInput from '../../components/StoreInfoComponents/CouponInput';
import MenuInput from '../../components/StoreInfoComponents/MenuInput';
import { useKakaoAddressFinder } from '../../hooks/KakaoAddressFinder';

import * as S from './StoreInfoStyle';

export default function StoreInfo() {
   const [storeData, setStoreData] = useState({
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
   });

   // 카카오 우편번호 API 훅
   const openPostcode = useKakaoAddressFinder(setStoreData);

   // 기본 인풋 처리
   const handleInputChange = (field, value) => {
      setStoreData((prev) => ({ ...prev, [field]: value }));
   };

   // 상세주소 처리
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

   return (
      <>
         <SubHeader title="가게 등록하기" />
         <S.Container>
            <S.Title>가게 정보를 입력해 주세요</S.Title>

            {/* 가게 대표 이미지 */}
            <S.Label>가게 대표 이미지</S.Label>
            <ImageUploader />

            {/* 가게 이름 */}
            <S.Label>가게 이름 [상호명]</S.Label>
            <S.Input
               placeholder="가게 이름을 입력해주세요"
               value={storeData.storeName}
               onChange={(e) => handleInputChange('storeName', e.target.value)}
            />

            {/* 가게 전화번호 */}
            <S.Label>가게 전화번호</S.Label>
            <S.Input
               placeholder="숫자만 입력해주세요"
               value={storeData.storePhone}
               onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  handleInputChange('storePhone', onlyNumbers);
               }}
            />

            {/* 영업시간 */}
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

            {/* 정기 휴일 */}
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
                  id="zipcode"
                  placeholder="우편번호"
                  readOnly
                  value={storeData.address.zipcode}
               />
               <S.Button type="button" onClick={openPostcode}>
                  우편번호 찾기
               </S.Button>
            </S.AddressWrapper>

            <S.Input
               id="address"
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

            {/* 쿠폰 설정 */}
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

            {/* 메뉴 입력 */}
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

            {/* 다음 버튼 */}
            <S.SubmitButton
               type="button"
               onClick={() => console.log(storeData)}
            >
               다음
            </S.SubmitButton>
         </S.Container>
      </>
   );
}
