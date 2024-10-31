import className from 'classnames/bind';
import styles from './InfoUser.module.scss';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBlog, faChevronDown, faHouse, faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import HouseMe from './Components/HouseMe/HouseMe';
import UploadHouse from './Components/UploadHouse/UploadHouse';
import HouseHeart from './Components/HouseHeart/HouseHeart';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CreateBDS from './Components/CreateHouse/CreateBDS';
import ManagerUtils from './Components/ManagerUtils/ManagerUtils';
import MyPost from './Components/MyPost/MyPost';
import AuthUser from './Components/AuthUser/AuthUser';

const cx = className.bind(styles);

function InfoUser() {
    const [checkSubMenu, setChecSubMenu] = useState(false);
    const [checkSubMenu2, setChecSubMenu2] = useState(false);

    const [typeMenu, setTypeMenu] = useState(7);

    const navigate = useNavigate();

    const handleCheckSubMenu = () => {
        setTypeMenu(7);
        setChecSubMenu(!checkSubMenu);
        // setTypeMenu(1);
    };

    const hanleLogout = () => {
        Cookies.remove('Token');
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        document.title = 'Thông tin cá nhân';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('column-left')}>
                    <ul>
                        <li onClick={() => setChecSubMenu2(!checkSubMenu2)}>
                            <FontAwesomeIcon id={cx('icons')} icon={faHouse} />
                            Nhà Của Tôi
                            <FontAwesomeIcon id={cx('icons')} icon={faChevronDown} />
                        </li>
                        {checkSubMenu2 ? (
                            <ul className={cx('sub-menu')}>
                                <li onClick={() => setTypeMenu(10)}>
                                    <FontAwesomeIcon id={cx('icons')} icon={faHouse} />
                                    Căn Nhà Của Tôi
                                </li>

                                <li onClick={() => setTypeMenu(11)}>
                                    <FontAwesomeIcon id={cx('icons')} icon={faHouse} />
                                    Tạo Bất Động Sản
                                </li>

                                <li onClick={() => setTypeMenu(5)}>
                                    <FontAwesomeIcon id={cx('icons')} icon={faHouse} />
                                    Tạo Tiện Ích Cho Bài Đắng
                                </li>
                            </ul>
                        ) : (
                            <></>
                        )}
                        <li onClick={handleCheckSubMenu}>
                            <FontAwesomeIcon id={cx('icons')} icon={faHeart} />
                            Yêu Thích
                        </li>
                        <li onClick={() => setTypeMenu(3)}>
                            <FontAwesomeIcon id={cx('icons')} icon={faPen} />
                            Bài Viết Của Tôi
                        </li>
                        <li onClick={() => setTypeMenu(4)}>
                            <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                            Tài Khoản
                        </li>
                        <li onClick={hanleLogout} style={{ color: 'red' }}>
                            <FontAwesomeIcon id={cx('icons')} icon={faRightFromBracket} />
                            Đăng Xuất
                        </li>
                    </ul>
                </div>
                <div className={cx('column-right')}>
                    {/* {typeMenu === 2 ? <HouseMe /> : <></>} */}
                    {typeMenu === 10 ? <HouseMe /> : <></>}
                    {typeMenu === 6 ? <UploadHouse /> : <></>}
                    {typeMenu === 7 ? <HouseHeart /> : <></>}
                    {typeMenu === 11 ? <CreateBDS /> : <></>}
                    {typeMenu === 5 ? <ManagerUtils /> : <></>}
                    {typeMenu === 4 ? <AuthUser /> : <></>}
                    {/* Bai viet cua toi */}
                    {typeMenu === 3 ? <MyPost /> : <></>}
                </div>
            </main>
        </div>
    );
}

export default InfoUser;
