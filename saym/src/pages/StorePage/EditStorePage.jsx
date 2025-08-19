import { useState, useEffect } from 'react';
import StoreInfo from '../../components/StoreInfoComponents/StoreInfo/StoreInfo';
import axiosInstance from '../../api/AxiosInstance';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loding';

export default function EditStorePage() {
   const { storeId } = useParams();
   const [storeData, setStoreData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStore = async () => {
         try {
            const res = await axiosInstance.get(`/api/v1/store/${storeId}`);
            const data = res.data.data;

            const formatted = {
               id: data.id,
               name: data.name,
               phoneNumber: data.phoneNumber,
               openTime: data.openTime?.split(':')[0] || '00',
               closeTime: data.closeTime?.split(':')[0] || '00',
               breakTimeStart:
                  data.breakTime?.split('~')[0]?.split(':')[0] || '00',
               breakTimeEnd:
                  data.breakTime?.split('~')[1]?.split(':')[0] || '00',
               holiday: data.regularDayOffNote || '없음',
               address: data.address || '',
               addressDetail: '',
               pictureUrl: data.pictureUrl || '',
               couponName: data.couponName || '',
               menus:
                  data.menus?.map((m) => ({
                     menuName: m.menuName,
                     price: m.price,
                     isSignature: m.isSignature || false,
                  })) || [],
            };

            setStoreData(formatted);
         } catch (err) {
            console.error(err);
            alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
         } finally {
            setLoading(false);
         }
      };

      fetchStore();
   }, [storeId]);

   if (loading) return <Loading />;
   if (!storeData) return (console.error('가게 정보 없음'), null);

   return <StoreInfo isEdit={true} initialData={storeData} />;
}
