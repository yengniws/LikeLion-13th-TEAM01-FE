import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Layout from '../layout/Layout';
import Auth from '../components/Auth/Auth';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         { path: '/login', element: <Login /> },
         { path: '/auth', element: <Auth /> },
      ],
   },
]);
