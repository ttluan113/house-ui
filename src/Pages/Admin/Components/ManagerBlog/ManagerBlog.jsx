import classNames from 'classnames/bind';
import styles from './ManagerBlog.module.scss';
import { requestGetStatusHouse, requestUpdateStatus, requestAuthMe } from '../../../../Config';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ManagerBlog() {
    const [dataBDS, setDataBDS] = useState([]);

    const handleSuccessBlog = async (id) => {
        const res = await requestUpdateStatus(id, 'approved');
        const updatedData = await fetchDataWithPosterDetails();
        setDataBDS(updatedData || []);
    };

    const handleRejectBlog = async (id) => {
        const res = await requestUpdateStatus(id, 'rejected');
        const updatedData = await fetchDataWithPosterDetails();
        setDataBDS(updatedData || []);
    };

    const fetchDataWithPosterDetails = async () => {
        try {
            const res = await requestGetStatusHouse();
            const enrichedData = await Promise.all(
                res.map(async (house) => {
                    console.log(house);
                    const userData = await requestAuthMe(house.userId); // Fetch poster details
                    return {
                        ...house,
                        posterName: userData.username,
                        isVerified: userData.isVerified,
                    };
                }),
            );
            return enrichedData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const enrichedData = await fetchDataWithPosterDetails();
            setDataBDS(enrichedData || []);
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
                            <th scope="col">STT</th>
                            <th scope="col">Người Đăng</th>
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
                        {currentProducts.map((house, index) => (
                            <tr key={house.postId}>
                                <td>{startIndex + index + 1}</td> {/* Số Thứ Tự */}
                                <td style={{ width: '120px' }}>
                                    {house.posterName || 'N/A'}
                                    {house.isVerified && (
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            style={{ color: 'green', marginLeft: '5px' }}
                                        />
                                    )}
                                </td>
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
                                <td>{house.paymentStatus === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                <td className={cx('action')}>
                                    <button
                                        disabled={house.paymentStatus !== 1 && house.charged === 1}
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
                                    <button
                                        onClick={() => handleRejectBlog(house.postId)}
                                        type="button"
                                        className="btn btn-warning ml-2"
                                    >
                                        Từ Chối
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <Stack spacing={2}>
                    <Pagination count={totalPages} color="primary" page={page} onChange={handlePageChange} />
                </Stack>
            </div>
        </div>
    );
}

export default ManagerBlog;
