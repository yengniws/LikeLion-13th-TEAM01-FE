import * as S from '../pages/StoreInfo/StoreInfoStyle';

export default function MenuInput({ menu, index, onMenuChange }) {
   return (
      <S.MenuBox>
         <S.Input
            placeholder="메뉴 이름"
            value={menu.name}
            onChange={(e) => onMenuChange(index, 'name', e.target.value)}
         />
         <S.Input
            placeholder="가격"
            value={menu.price}
            onChange={(e) => onMenuChange(index, 'price', e.target.value)}
         />
      </S.MenuBox>
   );
}
