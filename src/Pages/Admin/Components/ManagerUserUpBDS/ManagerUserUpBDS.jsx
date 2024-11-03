import classNames from 'classnames/bind';
import styles from './ManagerUserUpBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestChangeStatusHouse, requestGetBDSPending, requestAuthMe } from '../../../../Config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ManagerUpLoadBDS() {
    const [dataBDS, setDataBDS] = useState([]);
    const [postCounts, setPostCounts] = useState({});
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestGetBDSPending();
                const enrichedData = await Promise.all(
                    res.map(async (house) => {
                        const userData = await requestAuthMe(house.ownerId); // Gọi requestAuthMe với ownerId
                        return { ...house, ownerName: userData.username, isVerified: userData.isVerified }; // Thêm tên người đăng vào mỗi bài đăng
                    }),
                );
                setDataBDS(enrichedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
                        <th scope="col">Người Đăng</th> {/* Cột mới */}
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
                            <td style={{ width: '120px' }}>
                                {house.ownerName}
                                {house.isVerified ? (
                                    <FontAwesomeIcon id={cx('icon')} icon={faCheckCircle} style={{ color: 'green' }} />
                                ) : null}
                            </td>
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
