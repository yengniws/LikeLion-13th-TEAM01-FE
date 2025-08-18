import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubHeader from '../../SubHeader/SubHeader';
import ImageUploader from '../ImageUploader';
import TimeSelector from '../TimeSelector';
import CouponInput from '../CouponInput';
import MenuInput from '../MenuInput';
import { useKakaoAddressFinder } from '../../../hooks/KakaoAddressFinder';
import axiosInstance from '../../../api/AxiosInstance';
import * as S from './StoreInfoStyle';
import { toast } from 'react-toastify';

export default function StoreInfo({ isEdit, initialData }) {
   const [storeData, setStoreData] = useState(
      initialData || {
         name: '',
         phoneNumber: '',
         openTime: '00',
         closeTime: '00',
         breakTimeStart: '00',
         breakTimeEnd: '00',
         holiday: '없음',
         address: '',
         addressDetail: '',
         couponName: '',
         menus: [{ menuName: '', price: '', isSignature: false }],
      },
   );
   const [pictureFile, setPictureFile] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      if (isEdit && initialData) {
         setStoreData(initialData);
      }
   }, [isEdit, initialData]);

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

   const handleSubmit = async () => {
      // ⬅️ 유효성 검사 함수
      const validateForm = () => {
         const {
            name,
            phoneNumber,
            address,
            addressDetail,
            couponName,
            menus,
         } = storeData;

         // 필수 필드 검사
         if (
            !name.trim() ||
            !phoneNumber.trim() ||
            !address.trim() ||
            !addressDetail.trim()
         ) {
            toast.error('모든 값을 입력해 주세요.');
            return false;
         }

         // 메뉴 유효성 검사
         const hasEmptyMenu = menus.some(
            (menu) => !menu.menuName.trim() || !String(menu.price).trim(),
         );
         if (hasEmptyMenu) {
            return false;
         }

         // 쿠폰 유효성 검사
         if (!couponName.trim()) {
            return false;
         }

         // 이미지 유효성 검사 (등록 시에만)
         if (!isEdit && !pictureFile) {
            return false;
         }

         return true;
      };

      if (!validateForm()) {
         return;
      }

      try {
         const formData = new FormData();
         formData.append('name', storeData.name);
         formData.append('phoneNumber', storeData.phoneNumber);
         formData.append('openTime', storeData.openTime + ':00');
         formData.append('closeTime', storeData.closeTime + ':00');
         formData.append('breakTimeStart', storeData.breakTimeStart + ':00');
         formData.append('breakTimeEnd', storeData.breakTimeEnd + ':00');
         formData.append('regularDayOffNote', storeData.holiday);
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

         formData.append('couponName', storeData.couponName || '');

         if (isEdit && initialData?.id) {
            await axiosInstance.patch(
               `/api/v1/store/${initialData.id}`,
               formData,
               { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            toast.success('가게 수정 완료');
            navigate('/mypage');
         } else {
            await axiosInstance.post('/api/v1/store', formData, {
               headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('가게 등록 완료');
            navigate('/mypage');
         }
      } catch (err) {
         console.error(err);
         toast.error('통신 중 오류 발생');
      }
   };

   const handleCouponChange = (val) => {
      setStoreData((prev) => ({ ...prev, couponName: val }));
   };

   return (
      <>
         <SubHeader title={isEdit ? '가게 수정하기' : '가게 등록하기'} />
         <S.Container>
            <S.Title>가게 정보를 입력해 주세요</S.Title>
            <S.Label>가게 대표 이미지</S.Label>
            <ImageUploader
               onFileSelect={setPictureFile}
               initialImage={initialData?.pictureUrl}
            />

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
               onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
               }
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
               startHour={storeData.breakTimeStart}
               endHour={storeData.breakTimeEnd}
               onStartChange={(e) =>
                  handleInputChange('breakTimeStart', e.target.value)
               }
               onEndChange={(e) =>
                  handleInputChange('breakTimeEnd', e.target.value)
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

            <S.Label>쿠폰 설정</S.Label>
            <S.Input
               placeholder="쿠폰 이름"
               value={storeData.couponName}
               onChange={(e) => handleCouponChange(e.target.value)}
            />

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
