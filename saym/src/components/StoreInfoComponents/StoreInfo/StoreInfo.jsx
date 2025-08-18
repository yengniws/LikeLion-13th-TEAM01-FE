// src/components/StoreInfoComponents/StoreInfo/StoreInfo.jsx
import { useState, useEffect } from 'react';
import SubHeader from '../../SubHeader/SubHeader';
import ImageUploader from '../ImageUploader';
import TimeSelector from '../TimeSelector';
import CouponInput from '../CouponInput';
import MenuInput from '../MenuInput';
import { useKakaoAddressFinder } from '../../../hooks/KakaoAddressFinder';
import axiosInstance from '../../../api/AxiosInstance';
import * as S from './StoreInfoStyle';

export default function StoreInfo({ isEdit, initialData }) {
   const [storeData, setStoreData] = useState(
      initialData || {
         name: '',
         phoneNumber: '',
         openTime: '00',
         closeTime: '00',
         breakStart: '00',
         breakEnd: '00',
         holiday: '없음',
         address: '',
         addressDetail: '',
         coupons: [
            { price: '', startTime: '00', endTime: '00', timeEnabled: true },
         ],
         menus: [{ menuName: '', price: '', isSignature: false }],
      },
   );
   const [pictureFile, setPictureFile] = useState(null);

   // 수정 페이지 초기 데이터 세팅
   useEffect(() => {
      if (isEdit && initialData) {
         setStoreData(initialData);
      }
   }, [isEdit, initialData]);

   // 카카오 우편번호 api
   const openPostcode = useKakaoAddressFinder((addrData) => {
      setStoreData((prev) => ({
         ...prev,
         address: addrData.mainAddress,
         addressDetail: addrData.detailAddress || '',
      }));
   });

   const handleInputChange = (field, value) => {
      setStoreData((prev) => ({ ...prev, [field]: value }));
   };

   const handleMenuChange = (index, field, value) => {
      const updatedMenus = [...storeData.menus];
      updatedMenus[index][field] = value;
      setStoreData((prev) => ({ ...prev, menus: updatedMenus }));
   };

   const toggleMenuSignature = (index) => {
      const updatedMenus = [...storeData.menus];
      updatedMenus[index].isSignature = !updatedMenus[index].isSignature;
      setStoreData((prev) => ({ ...prev, menus: updatedMenus }));
   };

   const addMenuField = () => {
      setStoreData((prev) => ({
         ...prev,
         menus: [
            ...prev.menus,
            { menuName: '', price: '', isSignature: false },
         ],
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

   const handleSubmit = async () => {
      try {
         const formData = new FormData();
         formData.append('name', storeData.name);
         formData.append('phoneNumber', storeData.phoneNumber);
         formData.append('openTime', storeData.openTime + ':00');
         formData.append('closeTime', storeData.closeTime + ':00');
         formData.append('address', storeData.address);
         formData.append('addressDetail', storeData.addressDetail);
         formData.append('parkingNote', '없음');

         if (pictureFile) {
            formData.append('pictureFile', pictureFile);
         }

         formData.append(
            'menus',
            JSON.stringify(
               storeData.menus.map((m) => ({
                  menuName: m.menuName,
                  price: Number(m.price) || 0,
                  isSignature: !!m.isSignature,
               })),
            ),
         );

         // 로그 확인용
         for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
         }

         if (isEdit && initialData?.id) {
            await axiosInstance.patch(
               `/api/v1/store/${initialData.id}`,
               formData,
               { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            alert('가게 수정 완료');
         } else {
            await axiosInstance.post('/api/v1/store', formData, {
               headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('가게 등록 완료');
         }
      } catch (err) {
         console.error(err);
         alert('통신 중 오류 발생');
      }
   };

   return (
      <>
         <SubHeader title={isEdit ? '가게 수정하기' : '가게 등록하기'} />
         <S.Container>
            <S.Title>가게 정보를 입력해 주세요</S.Title>

            <S.Label>가게 대표 이미지</S.Label>
            <ImageUploader onFileSelect={setPictureFile} />

            <S.Label>가게 이름</S.Label>
            <S.Input
               placeholder="가게 이름을 입력해주세요"
               value={storeData.name}
               onChange={(e) => handleInputChange('name', e.target.value)}
            />

            <S.Label>가게 전화번호</S.Label>
            <S.Input
               placeholder="전화번호를 입력해주세요"
               value={storeData.phoneNumber}
               onChange={(e) => {
                  handleInputChange('phoneNumber', e.target.value);
               }}
            />

            <S.Label>영업 시간</S.Label>
            <TimeSelector
               label="영업"
               startHour={storeData.openTime}
               endHour={storeData.closeTime}
               onStartChange={(e) =>
                  handleInputChange('openTime', e.target.value)
               }
               onEndChange={(e) =>
                  handleInputChange('closeTime', e.target.value)
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
                  placeholder="주소"
                  readOnly
                  value={storeData.address ?? ''}
               />
               <S.Button type="button" onClick={openPostcode}>
                  주소 찾기
               </S.Button>
            </S.AddressWrapper>
            <S.Input
               placeholder="상세 주소"
               value={storeData.addressDetail || ''}
               onChange={(e) =>
                  handleInputChange('addressDetail', e.target.value)
               }
            />

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
                  onToggleSignature={toggleMenuSignature}
               />
            ))}
            <S.AddButton type="button" onClick={addMenuField}>
               + 메뉴 추가
            </S.AddButton>

            <S.SubmitButton type="button" onClick={handleSubmit}>
               {isEdit ? '수정 완료' : '등록 완료'}
            </S.SubmitButton>
         </S.Container>
      </>
   );
}
