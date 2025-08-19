import * as S from './StoreInfo/StoreInfoStyle';

export default function CouponInput({ couponName, onChange }) {
   return (
      <S.Input
         placeholder="할인할 가격 또는 서비스 품목명"
         value={couponName}
         onChange={(e) => onChange(e.target.value)}
      />
   );
}
