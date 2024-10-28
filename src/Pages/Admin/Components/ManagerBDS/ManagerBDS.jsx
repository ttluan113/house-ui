import classNames from 'classnames/bind';
import styles from './ManagerBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestGetAllBDS } from '../../../../Config';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để điều hướng
const cx = classNames.bind(styles);

function ManagerBDS() {
    const [dataBDS, setDataBDS] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBDS();
            setDataBDS(res);
        };
        fetchData();
    }, []);
    const navigate = useNavigate(); // Khởi tạo điều hướng
    const [page, setPage] = useState(1);
    const productsPerPage = 4;
    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = dataBDS.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(dataBDS.length / productsPerPage);
    // Điều hướng đến trang chi tiết căn nhà
    const handleViewDetails = (id) => {
        console.log(id);
        navigate(`/house/${id}`);
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={cx('wrapper')}>
            <h4>Danh sách BDS</h4>
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
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((house) => (
                        <tr style={{ height: '150px' }}>
                            <td>
                                <img style={{ width: '150px' }} src={house.images[0]} alt="" />
                            </td>
                            <td>
                                <span
                                    onClick={() => handleViewDetails(house.propertyId)}
                                    onContextMenu={(e) => {
                                        e.preventDefault(); // Prevent default context menu
                                        window.open(`/house/${house.propertyId}`, '_blank'); // Open in new tab
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
                            <td style={{ height: '150px' }}>{house.soToilet}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default ManagerBDS;
