import classNames from 'classnames/bind';
import styles from './ManagerUserUpBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestChangeStatusHouse, requestGetBDSPending } from '../../../../Config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ManagerUpLoadBDS() {
    const [dataBDS, setDataBDS] = useState([]);
    const [postCounts, setPostCounts] = useState({});
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const productsPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBDSPending();
            setDataBDS(res);
        };
        fetchData();
    }, []);

    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = dataBDS.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(dataBDS.length / productsPerPage);

    const handleViewDetails = (id) => {
        navigate(`/house/${id}`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleChangeStatus = async (id) => {
        try {
            const res = await requestChangeStatusHouse(id);
            toast.success('Duyệt Thành Công !!!');
            const res2 = await requestGetBDSPending();
            setDataBDS(res2);
        } catch (error) {
            toast.error('Lỗi Vui Lòng Thử Lại !!!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h4>Quản Lý Bài Đăng Bất Động Sản</h4>
            <table className={cx('table table-bordered border-primary')}>
                <thead>
                    <tr>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tiêu Đề</th>
                        <th scope="col">Mô Tả</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số Phòng</th>
                        <th scope="col">Số Tầng</th>
                        <th scope="col">Số Phòng Toilet</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((house) => (
                        <tr key={house.propertyId} style={{ height: '150px' }}>
                            <td>
                                <img style={{ width: '150px' }} src={house.images[0]} alt="" />
                            </td>
                            <td>
                                <span
                                    onClick={() => handleViewDetails(house.propertyId)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        window.open(`/house/${house.propertyId}`, '_blank');
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {house.title}
                                </span>
                            </td>
                            <td>
                                <div
                                    className={cx('description')}
                                    dangerouslySetInnerHTML={{ __html: house.description }}
                                />
                            </td>
                            <td>{Number(house.price).toLocaleString()} VND</td>
                            <td>
                                {house.location} - {house.phuong} - {house.district} - {house.province}
                            </td>
                            <td>{house.sophong}</td>
                            <td>{house.soTang}</td>
                            <td>{house.soToilet}</td>
                            <td>
                                <Button onClick={() => handleChangeStatus(house.propertyId)} variant="contained">
                                    Duyệt
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={cx('pagination')}>
                <Stack spacing={2}>
                    <Pagination count={totalPages} color="primary" page={page} onChange={handlePageChange} />
                </Stack>
            </div>
        </div>
    );
}

export default ManagerUpLoadBDS;
