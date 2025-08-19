import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SelectUser from '../pages/SelectUser/SelectUser';
import Layout from '../layout/Layout';
import UserScreen from '../pages/UserScreen/UserScreen';
import Auth from '../components/Auth/Auth';
import Organizer from '../pages/Organizer/Organizer';
import Chatlog from '../pages/Chatlog/Chatlog';
import AiResult from '../pages/AiResult/AiResult';
import RegisterStorePage from '../pages/StorePage/RegisterStorePage';
import EditStorePage from '../pages/StorePage/EditStorePage';
import KakaoRedirectHandler from '../pages/Login/KakaoRedirectHandler';
import MyPage from '../pages/myPage/myPage';
import EventDetail from '../pages/EventDetail/EventDetail';
import StoreDetail from '../pages/StoreDetail/StoreDetail';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         { path: '/login', element: <Login /> },
         { path: '/api/v1/oauth2', element: <KakaoRedirectHandler /> },
         { path: '/selectuser', element: <SelectUser /> },
         { path: '/userscreen', element: <UserScreen /> },
         { path: '/event/:id', element: <EventDetail /> },
         { path: '/store/:storeId', element: <StoreDetail /> },
         { path: '/auth', element: <Auth /> },
         { path: '/organizer', element: <Organizer /> },
         { path: '/chatlog', element: <Chatlog /> },
         { path: '/airesult/:id', element: <AiResult /> },
         { path: '/store/register', element: <RegisterStorePage /> },
         { path: '/store/edit/:storeId', element: <EditStorePage /> },
         { path: '/mypage', element: <MyPage /> },
      ],
   },
]);
