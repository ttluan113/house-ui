import classNames from 'classnames/bind';
import styles from './ManagerUserUpBDS.module.scss';
import { useEffect, useState } from 'react';
import { requestGetAllBDS, requestCountPostsByPropertyId } from '../../../../Config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManagerUpLoadBDS() {
    const [dataBDS, setDataBDS] = useState([]);
    const [postCounts, setPostCounts] = useState({});
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const productsPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBDS();
            setDataBDS(res);

            // Fetch post counts for each property
            const counts = await Promise.all(
                res.map(async (house) => {
                    const count = await requestCountPostsByPropertyId(house.propertyId);

                    return { propertyId: house.propertyId, count };
                }),
            );

            // Update postCounts with results
            const countsMap = counts.reduce((acc, { propertyId, count }) => {
                acc[propertyId] = count;
                return acc;
            }, {});
            setPostCounts(countsMap);
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

    const handleViewPosts = (propertyId) => {
        console.log(propertyId);
        navigate(`/posts/properties/${propertyId}`); // Navigate to the posts for the selected property
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
                        <th scope="col">Số Bài đăng</th>
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
                                <span
                                    onClick={() => handleViewPosts(house.propertyId)} // Navigate to the posts
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {postCounts[house.propertyId] || 0}
                                </span>
                            </td>{' '}
                            {/* Display post count */}
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
