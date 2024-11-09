import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import { useEffect, useState } from 'react';
import { requestGetAllUser } from '../../../../Config';

import Pagination from '@mui/material/Pagination';

const cx = classNames.bind(styles);

function ManagerUser() {
    const [dataAllUser, setDataAllUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllUser();
            console.log(res);
            setDataAllUser(res);
        };
        fetchData();
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [page, setPage] = useState(1);
    const productsPerPage = 10;
    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = dataAllUser.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(dataAllUser.length / productsPerPage);

    return (
        <div className={cx('wrapper')}>
            <table className="table table-hover table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên Người Dùng</th>
                        <th scope="col">Email Người Dùng</th>
                        <th scope="col">Số Điện Thoại</th>
                        <th scope="col">Tình trạng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((user) => (
                        <tr>
                            <th scope="row">{user.id}</th>
                            <th scope="row">{user.name}</th>
                            <th scope="row">{user.email}</th>
                            <th scope="row">{user.phone}</th>
                            <th scope="row" style={{ color: user.isVerified === 1 ? 'green' : 'gray' }}>
                                {user.isVerified === 1 ? 'Được xác thực' : 'Chưa được xác thực'}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('pagination')}>
                <Pagination count={totalPages} color="primary" onChange={handlePageChange} />
            </div>
        </div>
    );
}

export default ManagerUser;
