import className from 'classnames/bind';
import styles from './Admin.module.scss';
import Header from '../../Components/Header/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faPlus, faRightFromBracket, faShield, faSignal, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import ManagerUser from './Components/ManagerUser/ManagerUser';
import ManagerBlog from './Components/ManagerBlog/ManagerBlog';
import ManagerBDS from './Components/ManagerBDS/ManagerBDS';
import ManagerStatistics from './Components/ManagerStatistics/ManagerStatistics';
import ManagerUtils from './Components/ManagerUtils/ManagerUtils';
import ManagerUpLoadBDS from './Components/ManagerUserUpBDS/ManagerUserUpBDS';

const cx = className.bind(styles);

function Admin() {
    const [checkType, setCheckType] = useState(1);

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('Token');
        navigate('/');
    };

    useEffect(() => {
        document.title = 'Quản trị admin';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('column-left')}>
                    <ul>
                        <li onClick={() => setCheckType(1)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faUser} />
                            Quản Lý Người Dùng
                        </li>
                        <li onClick={() => setCheckType(2)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faShield} />
                            Duyệt Và Kiểm Duyệt Tin Đăng
                        </li>
                        <li onClick={() => setCheckType(3)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHouse} />
                            Quản Lý Bất Động Sản
                            <FontAwesomeIcon id={cx('icon')} />
                        </li>
                        <li onClick={() => setCheckType(12)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faUpload} />
                            Quản Lý Bài Đăng Bất Động Sản
                            <FontAwesomeIcon id={cx('icon')} />
                        </li>
                        <li onClick={() => setCheckType(11)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faSignal} />
                            Quản Lý Tiện Ích
                        </li>
                        <li onClick={() => setCheckType(5)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faPlus} />
                            Tạo Bất Động Sản
                        </li>

                        <li onClick={() => setCheckType(6)}>
                            <FontAwesomeIcon id={cx('icon')} icon={faPlus} />
                            Thống kê
                        </li>

                        <li onClick={handleLogout}>
                            <FontAwesomeIcon style={{ color: 'red' }} icon={faRightFromBracket} />
                            Đăng Xuất
                        </li>
                    </ul>
                </div>
                <div className={cx('column-right')}>
                    {checkType === 1 && <ManagerUser />}
                    {checkType === 2 && <ManagerBlog />}
                    {checkType === 3 && <ManagerBDS />}
                    {checkType === 6 && <ManagerStatistics />}
                    {checkType === 11 && <ManagerUtils />}
                    {checkType === 12 && <ManagerUpLoadBDS />}
                </div>
            </main>
        </div>
    );
}

export default Admin;
