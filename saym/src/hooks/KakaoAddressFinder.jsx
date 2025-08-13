export const useKakaoAddressFinder = (setStoreData) => {
   const openPostcode = () => {
      if (!window.daum) {
         alert('우편번호 api 로드 실패');
         return;
      }

      new window.daum.Postcode({
         oncomplete: function (data) {
            let addr = '';
            let extraAddr = '';

            if (data.userSelectedType === 'R') {
               addr = data.roadAddress;

               if (data.bname && /[동|로|가]$/g.test(data.bname))
                  extraAddr += data.bname;
               if (data.buildingName && data.apartment === 'Y')
                  extraAddr += extraAddr
                     ? ', ' + data.buildingName
                     : data.buildingName;
               if (extraAddr) extraAddr = ` (${extraAddr})`;
            } else {
               addr = data.jibunAddress;
            }

            setStoreData((prev) => ({
               ...prev,
               address: {
                  ...prev.address,
                  zipcode: data.zonecode,
                  mainAddress: addr,
                  extraAddress: extraAddr,
               },
            }));
         },
      }).open();
   };

   return openPostcode;
};
