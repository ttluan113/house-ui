import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import { useEffect, useState } from 'react';
import { requestGetAllUser } from '../../../../Config';

const cx = classNames.bind(styles);

function ManagerUser() {
    const [dataAllUser, setDataAllUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllUser();
            setDataAllUser(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <table className="table table-hover table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên Người Dùng</th>
                        <th scope="col">Email Người Dùng</th>
                        <th scope="col">Số Điện Thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAllUser.map((user) => (
                        <tr>
                            <th scope="row">{user.id}</th>
                            <th scope="row">{user.name}</th>
                            <th scope="row">{user.email}</th>
                            <th scope="row">{user.phone}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagerUser;
