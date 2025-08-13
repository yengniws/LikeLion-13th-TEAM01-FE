import StoreInfo from '../../components/StoreInfoComponents/StoreInfo/StoreInfo';

export default function EditStorePage() {
   const dummyData = {
      storeName: '테스트 가게',
      storePhone: '01012345678',
      businessStart: '09',
      businessEnd: '21',
      breakStart: '13',
      breakEnd: '14',
      holiday: '월요일',
      address: {
         zipcode: '12345',
         mainAddress: '서울시 강남구',
         extraAddress: '',
         detailAddress: '2층',
      },
      coupons: [
         { price: '1000', startTime: '10', endTime: '12', timeEnabled: true },
      ],
      menus: [{ name: '아메리카노', price: '4000' }],
   };

   return <StoreInfo isEdit={true} initialData={dummyData} />;
}
