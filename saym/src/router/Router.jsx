import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SelectUser from '../pages/SelectUser/SelectUser';
import Layout from '../layout/Layout';
import Auth from '../components/Auth/Auth';
import Organizer from '../pages/Organizer/Organizer';
import Chatlog from '../pages/Chatlog/Chatlog';
import AiResult from '../pages/AiResult/AiResult';
import RegisterStorePage from '../pages/StorePage/RegisterStorePage';
import EditStorePage from '../pages/StorePage/EditStorePage';
import RedirectHandler from '../pages/Login/Kakao/KakaoRedirectHandler';

export const router = createBrowserRouter([
   // 최상위 라우트 배열에 RedirectHandler 추가
   {
      path: '/api/v1/oauth2',
      element: <RedirectHandler />,
   },
   {
      path: '/',
      element: <Layout />,
      children: [
         { path: '/login', element: <Login /> },
         { path: '/selectuser', element: <SelectUser /> },
         { path: '/auth', element: <Auth /> },
         { path: '/organizer', element: <Organizer /> },
         { path: '/chatlog', element: <Chatlog /> },
         { path: '/airesult/:id', element: <AiResult /> },
         { path: '/store/register', element: <RegisterStorePage /> },
         { path: '/store/edit/:storeId', element: <EditStorePage /> },
      ],
   },
]);
