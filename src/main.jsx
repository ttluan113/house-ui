import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { privateRoutes, publicRoutes } from './Route/index';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode'; // Sửa lại import
import cookies from 'js-cookie';

const token = cookies.get('Token');

const checkToken = () => {
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.roles.includes('ROLE_ADMIN');
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    }
    return false; // Trả về false nếu không có token
};

function ProtectedRoute({ element }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken()) {
            navigate('/'); // Điều hướng về trang Login nếu không phải admin
        }
    }, [navigate]);

    return element;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                {/* Các route công khai */}
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}

                {/* Các route riêng tư */}
                {privateRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={<ProtectedRoute element={route.element} />} />
                ))}
            </Routes>
        </Router>
    </StrictMode>,
);
