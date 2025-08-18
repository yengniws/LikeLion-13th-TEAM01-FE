// src/components/StoreInfoComponents/CouponInput.jsx
import * as S from './StoreInfo/StoreInfoStyle';
import TimeSelector from './TimeSelector';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';

export default function CouponInput({
   coupon,
   index,
   onCouponChange,
   onToggleTime,
}) {
   return (
      <>
         <S.CouponInputWrapper>
            <S.Input
               placeholder="할인할 가격 또는 서비스 품목명"
               value={coupon.price}
               onChange={(e) => onCouponChange(index, 'price', e.target.value)}
            />
         </S.CouponInputWrapper>
         {coupon.timeEnabled && (
            <TimeSelector
               label="사용 불가"
               startHour={coupon.startTime}
               endHour={coupon.endTime}
               onStartChange={(e) =>
                  onCouponChange(index, 'startTime', e.target.value)
               }
               onEndChange={(e) =>
                  onCouponChange(index, 'endTime', e.target.value)
               }
            />
         )}

         <S.CheckboxWrapper>
            <FormControlLabel
               control={
                  <Checkbox
                     checked={!coupon.timeEnabled}
                     onChange={() => onToggleTime(index)}
                     sx={{
                        color: '#ddd',
                        '&.Mui-checked': {
                           color: '#4daeff',
                        },
                     }}
                  />
               }
               label={
                  <Typography
                     sx={{
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#4daeff',
                     }}
                  >
                     시간 해당 없음
                  </Typography>
               }
            />
         </S.CheckboxWrapper>
      </>
   );
}
