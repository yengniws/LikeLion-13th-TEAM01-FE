import * as S from './StoreInfo/StoreInfoStyle';

export default function TimeSelector({
   startHour,
   endHour,
   onStartChange,
   onEndChange,
   label,
}) {
   const hours = Array.from({ length: 24 }, (_, i) =>
      String(i).padStart(2, '0'),
   );

   return (
      <S.TimeRow>
         <S.Select value={startHour} onChange={onStartChange}>
            {hours.map((h) => (
               <option key={h}>{h}</option>
            ))}
         </S.Select>
         <S.TimeTxt>시 부터</S.TimeTxt>
         <S.Select value={endHour} onChange={onEndChange}>
            {hours.map((h) => (
               <option key={h}>{h}</option>
            ))}
         </S.Select>
         <S.TimeTxt>시 까지 {label}</S.TimeTxt>
      </S.TimeRow>
   );
}
