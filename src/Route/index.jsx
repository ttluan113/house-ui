import App from '../App';
import Admin from '../Pages/Admin/Admin';
import DetailHouse from '../Pages/DetailHouse/DetailHouse';
import InfoUser from '../Pages/InfoUser/InfoUser';
import LoginUser from '../Pages/LoginUser/LoginUser';
import RegisterUser from '../Pages/RegisterUser/RegisterUser';
import SearchHouse from '../Pages/SearchHouse/SearchHouse';
import DinhGiaHouse from '../Pages/DinhGiaHouse/DinhGiaHouse';

export const publicRoutes = [
    { path: '/', element: <App /> },
    { path: '/account/login', element: <LoginUser /> },
    { path: '/account/register', element: <RegisterUser /> },
    { path: '/trang-ca-nhan', element: <InfoUser /> },
    { path: '/bds/:id', element: <DetailHouse /> },

    { path: '/search', element: <SearchHouse /> },
    { path: '/dinh-gia', element: <DinhGiaHouse /> },
];

export const privateRoutes = [{ path: '/admin', element: <Admin /> }];
