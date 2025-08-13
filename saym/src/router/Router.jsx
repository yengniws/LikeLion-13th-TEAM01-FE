import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SelectUser from '../pages/SelectUser/SelectUser';
import Layout from '../layout/Layout';
import Auth from '../components/Auth/Auth';
import Organizer from '../pages/Organizer/Organizer';
import Chatlog from '../pages/Chatlog/Chatlog';
import AiResult from '../pages/AiResult/AiResult';
import StoreInfo from '../pages/StoreInfo/StoreInfo';

export const router = createBrowserRouter([
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
         { path: '/storeinfo', element: <StoreInfo /> },
      ],
   },
]);
