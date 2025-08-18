import GlobalStyle from './styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   return (
      <>
         <GlobalStyle />
         <ToastContainer position="top-right" autoClose={2000} />
         <RouterProvider router={router} />
      </>
   );
}

export default App;
