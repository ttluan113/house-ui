import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const token = Cookies.get('Token');
const decodedJWT = () => {
    if (!token) return;
    const dataToken = jwtDecode(token);
    return dataToken;
};

export default decodedJWT;
