import * as S from '../StoreInfoComponents/StoreInfo/StoreInfoStyle';

export default function MenuInput({
   menu,
   index,
   onMenuChange,
   onToggleSignature,
}) {
   return (
      <S.MenuInputWrapper>
         <S.MenuBox>
            <S.Input
               placeholder="메뉴 이름"
               value={menu.menuName}
               onChange={(e) => onMenuChange(index, 'menuName', e.target.value)}
            />
            <S.Input
               placeholder="가격"
               type="number"
               value={menu.price}
               onChange={(e) => onMenuChange(index, 'price', e.target.value)}
            />
         </S.MenuBox>
         <S.label>
            <input
               type="checkbox"
               checked={menu.isSignature}
               onChange={() => onToggleSignature(index)}
            />
            시그니처
         </S.label>
         <br />
      </S.MenuInputWrapper>
   );
}
