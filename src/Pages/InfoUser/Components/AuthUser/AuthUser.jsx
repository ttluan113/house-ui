import { useEffect, useState } from 'react';
import { requestAuthMe, requestVerifyAccount } from '../../../../Config';

import classNames from 'classnames/bind';
import styles from './AuthUser.module.scss';

import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AuthUser() {
    const [dataUser, setDataUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('Token');
        const decoded = jwtDecode(token);

        const idUser = decoded.userId;

        const fetchData = async () => {
            const res = await requestAuthMe(idUser);
            setDataUser(res);
        };

        fetchData();
    }, []);

    const handleVerify = async () => {
        toast.success('Vui lòng chờ chuyển đến trang xác thực tài khoản !!!');

        // Gọi requestVerifyAccount nhưng không cần await
        requestVerifyAccount(dataUser?.email)
            .then((res) => {
                if (res.status !== 200) {
                    toast.error('Đã có lỗi xảy ra trong quá trình xác thực.');
                }
            })
            .catch((err) => {
                console.error('Error verifying account:', err);
                toast.error('Đã có lỗi xảy ra trong quá trình xác thực.');
            });

        // Chuyển hướng ngay lập tức mà không cần chờ
        setTimeout(() => {
            navigate('/verifyaccount');
        }, 500);
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h4>Thông tin cá nhân</h4>
            <div>
                <div className={cx('avatar')}>{dataUser?.username?.slice(0, 1)}</div>
            </div>
            <div style={{ width: '100%', marginTop: '30px' }}>
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">{dataUser.id}</th>
                        </tr>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">{dataUser?.email}</th>
                        </tr>
                        <tr>
                            <th scope="col">Họ Và Tên</th>
                            <th scope="col">{dataUser?.name}</th>
                        </tr>
                        <tr>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">0{dataUser?.phone}</th>
                        </tr>

                        <tr>
                            <th scope="col">Tình Trạng Tài Khoản</th>
                            <th scope="col">
                                {!dataUser?.isVerified === null ? (
                                    <>
                                        <span>Đã xác thực tài khoản</span>
                                        <FontAwesomeIcon id={cx('icon-check')} icon={faCheckCircle} />
                                    </>
                                ) : (
                                    <Button onClick={handleVerify} variant="contained">
                                        Xác thực tài khoản
                                    </Button>
                                )}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default AuthUser;
