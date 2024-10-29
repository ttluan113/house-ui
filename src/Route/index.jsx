import App from '../App';
import Admin from '../Pages/Admin/Admin';
import DetailHouse from '../Pages/DetailHouse/DetailHouse';
import InfoUser from '../Pages/InfoUser/InfoUser';
import LoginUser from '../Pages/LoginUser/LoginUser';
import RegisterUser from '../Pages/RegisterUser/RegisterUser';
import SearchHouse from '../Pages/SearchHouse/SearchHouse';
import DinhGiaHouse from '../Pages/DinhGiaHouse/DinhGiaHouse';
import DetailHouseBDS from '../Pages/DetailHouse/DetailHouseBDS';
import PostByProperty from '../Pages/Admin/Components/ManagerBDS/PostByProperty';
export const publicRoutes = [
    { path: '/', element: <App /> },
    { path: '/account/login', element: <LoginUser /> },
    { path: '/account/register', element: <RegisterUser /> },
    { path: '/trang-ca-nhan', element: <InfoUser /> },
    { path: '/bds/:id', element: <DetailHouse /> },
    { path: '/house/:id', element: <DetailHouseBDS /> },
    { path: '/search', element: <SearchHouse /> },
    { path: '/dinh-gia', element: <DinhGiaHouse /> },
    { path: '/posts/properties/:propertyId', element: <PostByProperty /> }, // New route for posts
];

export const privateRoutes = [{ path: '/admin', element: <Admin /> }];
