import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { requestAuthMe } from '../../Config/index';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const token = Cookies.get('Token');
    const idUser = Cookies.get('userId');
    const username = Cookies.get('Username'); // Retrieve the username
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (idUser) {
                const res = await requestAuthMe(idUser);
                setDataUser(res);
            }
        };

        fetchData();
    }, []); // Chỉ chạy một lần khi component render lần đầu

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to={'/'}>
                    <h1>MasterHome</h1>
                </Link>
                <div className={cx('container')}>
                    <ul>
                        <Link to={'/search'}>
                            <li>Mua</li>
                        </Link>
                        <Link to={'/dinh-gia'}>
                            <li>Định giá</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className={cx('user')}>
                {token ? (
                    <div className={cx('user-menu')}>
                        <Link to={'/trang-ca-nhan'} className={cx('user-link')}>
                            <div className={cx('avatar')}>{username.charAt(0).toUpperCase()}</div>
                            <span className={cx('username')}>{username}</span>
                            {dataUser.isVerified ? <FontAwesomeIcon id={cx('icon')} icon={faCheckCircle} /> : null}
                        </Link>
                    </div>
                ) : (
                    <Link to={'/account/login'}>
                        <button>Đăng nhập</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
