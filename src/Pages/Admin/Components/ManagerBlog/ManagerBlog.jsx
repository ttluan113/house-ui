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
                <h4>Quản Lý Bất Động Sản</h4>
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tiêu Đề</th>
                            <th scope="col">Mô Tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Loại Bài Đăng</th>
                            <th scope="col">Mục đích</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Trạng Thái Thanh Toán</th>
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
                                <td>
                                    {house.postType === 'for_sale'
                                        ? `${Number(house.price).toLocaleString()} VND`
                                        : `${Number(house.price).toLocaleString()} VND /1 tháng`}
                                </td>
                                <td>{house.charged === 0 ? 'Miễn Phí' : 'Mất Phí'}</td>
                                <td>{house.postType === 'for_rent' ? 'Cho thuê' : 'Đăng bán'}</td>
                                <td>{house.status}</td>
                                <td>{house.paymentStatus == 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                <td>
                                    <button
                                        disabled={house.paymentStatus !== 1 && house.charged === 1} // Disable nếu nút có màu đỏ
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
