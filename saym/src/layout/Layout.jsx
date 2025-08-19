import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   width: 100%;
   max-width: 390px;
`;

const Layout = () => {
   return (
      <LayoutWrapper>
         <Outlet />
      </LayoutWrapper>
   );
};

export default Layout;
