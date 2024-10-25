import classNames from 'classnames/bind';
import styles from './ManagerBlog.module.scss';
import { requestGetStatusHouse, requestUpdateStatus } from '../../../../Config';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ManagerBlog() {
    const [dataBDS, setDataBDS] = useState([]);

    const handleSuccessBlog = async (id) => {
        const res = await requestUpdateStatus(id);
        const updatedData = await requestGetStatusHouse();
        setDataBDS(updatedData || []);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetStatusHouse();
            setDataBDS(res || []);
        };
        fetchData();
    }, []);

    const [page, setPage] = useState(1);
    const productsPerPage = 4;
    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = dataBDS.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(dataBDS.length / productsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu Đề</th>
                            <th scope="col">Mô Tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Loại Bài Đăng</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((house) => (
                            <tr>
                                <td>
                                    <img style={{ width: '200px' }} src={house?.property?.images[0]} alt="" />
                                </td>
                                <td>{house.postTitle}</td>
                                <td>{house.postContent}</td>
                                <td>{Number(house.price).toLocaleString()} VND</td>
                                <td>{house.charged === 0 ? 'Miễn Phí' : 'Mất Phí'}</td>
                                <td>{house.status}</td>
                                <td>
                                    <button
                                        disabled={house.paymentStatus && (house.charged === 1) !== 1 ? true : false}
                                        onClick={() => handleSuccessBlog(house.postId)}
                                        type="button"
                                        className={`btn ${
                                            house.paymentStatus !== 1 && house.charged === 1
                                                ? 'btn-danger'
                                                : 'btn-primary'
                                        }`}
                                    >
                                        Duyệt Tin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        color="primary"
                        totalPages={totalPages}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default ManagerBlog;
