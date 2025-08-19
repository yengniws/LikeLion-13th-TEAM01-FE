// hooks/useHorizontalScroll.js

import { useRef, useEffect, useCallback } from 'react';

export const useHorizontalScroll = () => {
   const elementRef = useRef(null);

   const handleWheel = useCallback((e) => {
      const element = elementRef.current;

      if (element) {
         const delta = e.deltaY; // 마우스 휠의 세로 움직임 값을 가져옵니다.
         element.scrollLeft += delta; // 가로 스크롤 값에 더해줍니다.
         e.preventDefault(); // 페이지 전체의 세로 스크롤을 막습니다.
      }
   }, []);

   useEffect(() => {
      const element = elementRef.current;

      if (element) {
         // 'wheel' 이벤트를 감지하도록 리스너를 추가합니다.
         element.addEventListener('wheel', handleWheel);

         // 컴포넌트가 사라질 때 이벤트 리스너를 제거합니다 (메모리 누수 방지).
         return () => {
            element.removeEventListener('wheel', handleWheel);
         };
      }
   }, [handleWheel]);

   return elementRef; // JSX에서 사용할 ref를 반환합니다.
};
