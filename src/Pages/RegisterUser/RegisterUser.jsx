import classNames from 'classnames/bind';
import styles from './RegisterUser.module.scss';

import Header from '../../Components/Header/Header';
import { requestRegister } from '../../Config';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function RegisterUser() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegisterUser = async () => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone validation regex for numbers only
        const phoneRegex = /^[0-9]+$/;

        if (!emailRegex.test(email)) {
            toast.error('Email không hợp lệ');
            return;
        }

        if (!phoneRegex.test(phone)) {
            toast.error('Số điện thoại chỉ được chứa chữ số');
            return;
        }
        if (phone.length !== 10) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        if (username.length < 6) {
            toast.error('Tên đăng nhập phải có ít nhất 6 ký tự');
            return;
        }

        if (password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        try {
            const data = { email, password, name, username, phone };
            const res = await requestRegister(data);
            console.log(res);

            if (res.status === 201) {
                toast.success('Đăng ký thành công !!!');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Người dùng đã tồn tại');
            } else {
                toast.error('Đăng ký thất bại, vui lòng thử lại');
            }
        }
    };

    useEffect(() => {
        document.title = 'Đăng ký tài khoản';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <h2>Đăng Ký</h2>
                <div className={cx('form')}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Tên của bạn"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingName">Tên Của Bạn</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingUsername"
                            placeholder="Tên đăng nhập"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="floatingUsername">Tên Đăng Nhập</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPhone"
                            placeholder="Số điện thoại"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label htmlFor="floatingPhone">Số Điện Thoại</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Mật Khẩu</label>
                    </div>
                    <button onClick={handleRegisterUser}>Đăng Ký</button>
                    <span>
                        Bạn đã có tài khoản <Link to={'/account/login'}>Đăng Nhập?</Link>
                    </span>
                </div>
            </main>
        </div>
    );
}

export default RegisterUser;
