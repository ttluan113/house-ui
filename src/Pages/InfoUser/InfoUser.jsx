import className from 'classnames/bind';
import styles from './InfoUser.module.scss';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBlog, faChevronDown, faHouse, faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import HouseMe from './Components/HouseMe/HouseMe';
import UploadHouse from './Components/UploadHouse/UploadHouse';
import HouseHeart from './Components/HouseHeart/HouseHeart';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const cx = className.bind(styles);

function InfoUser() {
    const [checkSubMenu, setChecSubMenu] = useState(false);
    const [checkSubMenu2, setChecSubMenu2] = useState(false);

    const [typeMenu, setTypeMenu] = useState(1);

    const navigate = useNavigate();

    const handleCheckSubMenu = () => {
        setChecSubMenu(!checkSubMenu);
        // setTypeMenu(1);
    };

    const hanleLogout = () => {
        Cookies.remove('Token');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('column-left')}>
                    <ul>
                        <li onClick={handleCheckSubMenu}>
                            <FontAwesomeIcon icon={faHeart} />
                            Yêu Thích
                            <FontAwesomeIcon id={cx('icon')} icon={faChevronDown} />
                        </li>
                        {checkSubMenu ? (
                            <ul className={cx('sub-menu')}>
                                <li onClick={() => setTypeMenu(7)}>
                                    <FontAwesomeIcon icon={faHouse} />
                                    Căn Nhà
                                </li>

                                <li>
                                    <FontAwesomeIcon icon={faBlog} />
                                    Bài Viết
                                </li>
                            </ul>
                        ) : (
                            <></>
                        )}

                        <li onClick={() => setChecSubMenu2(!checkSubMenu2)}>
                            <FontAwesomeIcon icon={faHouse} />
                            Nhà Của Tôi
                            <FontAwesomeIcon id={cx('icon')} icon={faChevronDown} />
                        </li>
                        {checkSubMenu2 ? (
                            <ul className={cx('sub-menu')}>
                                <li onClick={() => setTypeMenu(10)}>
                                    <FontAwesomeIcon icon={faHouse} />
                                    Căn Nhà Của Tôi
                                </li>
                            </ul>
                        ) : (
                            <></>
                        )}
                        <li onClick={() => setTypeMenu(3)}>
                            <FontAwesomeIcon icon={faPen} />
                            Bài Viết Của Tôi
                        </li>
                        <li onClick={() => setTypeMenu(4)}>
                            <FontAwesomeIcon icon={faUser} />
                            Tài Khoản
                        </li>
                        <li onClick={hanleLogout} style={{ color: 'red' }}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Đăng Xuất
                        </li>
                    </ul>
                </div>
                <div className={cx('column-right')}>
                    {/* {typeMenu === 2 ? <HouseMe /> : <></>} */}
                    {typeMenu === 10 ? <HouseMe /> : <></>}
                    {typeMenu === 6 ? <UploadHouse /> : <></>}
                    {typeMenu === 7 ? <HouseHeart /> : <></>}
                </div>
            </main>
        </div>
    );
}

export default InfoUser;
