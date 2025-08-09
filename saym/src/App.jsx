import GlobalStyle from './styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import React, { useState, useEffect } from 'react';
import Loding from './pages/Loding/Loding';

function App() {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         <GlobalStyle />
         {loading ? <Loding /> : <RouterProvider router={router} />}
      </>
   );
}

export default App;
