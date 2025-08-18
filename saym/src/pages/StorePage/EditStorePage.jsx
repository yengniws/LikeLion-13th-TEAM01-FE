import { useState, useEffect } from 'react';
import StoreInfo from '../../components/StoreInfoComponents/StoreInfo/StoreInfo';
import axiosInstance from '../../api/AxiosInstance';
import { useParams } from 'react-router-dom';

export default function EditStorePage() {
   const { storeId } = useParams();
   const [storeData, setStoreData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStore = async () => {
         try {
            const res = await axiosInstance.get(`/api/v1/store/${storeId}`);
            // 서버에서 받은 데이터가 StoreInfo 형식에 맞게 변환 필요할 수 있음
            const data = {
               name: res.data.storeName,
               phoneNumber: res.data.storePhone,
               openTime: res.data.businessStart,
               closeTime: res.data.businessEnd,
               breakStart: res.data.breakStart,
               breakEnd: res.data.breakEnd,
               holiday: res.data.holiday,
               address: res.data.address.mainAddress,
               addressDetail: res.data.address.detailAddress,
               coupons: res.data.coupons.map((c) => ({
                  price: c.price,
                  startTime: c.startTime,
                  endTime: c.endTime,
                  timeEnabled: c.timeEnabled,
               })),
               menus: res.data.menus.map((m) => ({
                  menuName: m.name,
                  price: m.price,
                  isSignature: m.isSignature || false,
               })),
               id: res.data.id, // 수정 시 PATCH용
            };
            setStoreData(data);
         } catch (err) {
            console.error(err);
            alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
         } finally {
            setLoading(false);
         }
      };

      fetchStore();
   }, [storeId]);

   if (loading) return <div>로딩 중...</div>;
   if (!storeData) return <div>가게 정보를 불러올 수 없습니다.</div>;

   return <StoreInfo isEdit={true} initialData={storeData} />;
}
