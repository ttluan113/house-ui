import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';

import Header from '../../Components/Header/Header';
import { requestLogin } from '../../Config';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const cx = classNames.bind(styles);

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLoginUser = async () => {
        try {
            const data = { email, password };
            const res = await requestLogin(data);
            if (res.status === 200) {
                toast.success('Đăng nhập thành công !!!');
                const data = jwtDecode(res.data.accessToken);
                Cookies.set('Token', res.data.accessToken);
                Cookies.set('Username', email);
                Cookies.set('userId', data.userId);
                Cookies.set('email', data.sub);
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            if (error.status === 400) {
                toast.error('Tài khoản mật khẩu không chính xác');
            }
        }
    };

    useEffect(() => {
        document.title = 'Đăng nhập ngay';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <h2>Đăng Nhập</h2>
                <div className={cx('form')}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floatingInput">Email or UserName</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button onClick={handleLoginUser}>Đăng Nhập</button>
                    <span>
                        Bạn chưa có tài khoản <Link to={'/account/register'}>Đăng Ký ?</Link>
                    </span>
                </div>
            </main>
        </div>
    );
}

export default LoginUser;
