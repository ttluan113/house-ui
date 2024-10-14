import classNames from 'classnames/bind';
import styles from './RegisterUser.module.scss';

import Header from '../../Components/Header/Header';
import { requestRegister } from '../../Config';

import { useState } from 'react';
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
        try {
            const data = { email, password, name, username, phone };
            const res = await requestRegister(data);
            console.log(res);

            if (res.status === 201) {
                toast.success('Đăng ký thành công !!!');
            }
        } catch (error) {
            if (error.status === 400) {
                toast.error('Người dùng đã tồn tại');
            }
        }
    };

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
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label for="floatingInput">Tên Của Bạn</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label for="floatingInput">Tên Đăng Nhập</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floatingInput">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label for="floatingInput">Số Điện Thoại</label>
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
                    <button onClick={handleRegisterUser}>Đăng Ký</button>
                    <span>
                        Bạn dã có tài khoản <Link to={'/account/login'}>Đăng Nhập ?</Link>
                    </span>
                </div>
            </main>
        </div>
    );
}

export default RegisterUser;
