import classNames from 'classnames/bind';
import styles from './Main.module.scss';

import { useEffect, useState } from 'react';

import UiBuyHouse from '../UiBuyHouse/UiBuyHouse';
import CardBody from '../CardBody/CardBody';
import { requestGetAllHouse } from '../../Config';
import SlideHouse from '../SlideHouse/SlideHouse';
import Pagination from '@mui/material/Pagination'; // Import Pagination từ MUI
import Stack from '@mui/material/Stack';

const cx = classNames.bind(styles);

function Main() {
    const [isActiveButton, setIsActiveButton] = useState(2);
    const [dataHouseAll, setDataHouseAll] = useState([]);
    const [page, setPage] = useState(1); // Trạng thái cho trang hiện tại
    const housesPerPage = 8; // Số nhà trên mỗi trang

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllHouse();
            setDataHouseAll(res);
        };
        fetchData();
    }, []);

    // Tính toán danh sách nhà cho trang hiện tại
    const startIndex = (page - 1) * housesPerPage;
    const currentHouses = dataHouseAll
        .sort((a, b) => b?.charged - a?.charged)
        .slice(startIndex, startIndex + housesPerPage);

    // Tổng số trang
    const totalPages = Math.ceil(dataHouseAll.length / housesPerPage);

    const handlePageChange = (event, value) => {
        setPage(value); // Cập nhật trang hiện tại
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <div>
                        <UiBuyHouse dataHouseAll={dataHouseAll} />
                    </div>
                </div>
            </div>
            <div className={cx('main')}>
                <h3>Gợi ý cho bạn</h3>
                <div className={cx('form-card')}>
                    {currentHouses.length > 0 ? (
                        currentHouses.map((house) => <CardBody key={house?.postId} house={house} />)
                    ) : (
                        <p>No houses available</p>
                    )}
                </div>
            </div>
            {/* Thanh phân trang */}
            <div className={cx('pagination')}>
                <Stack spacing={2}>
                    <Pagination count={totalPages} color="primary" page={page} onChange={handlePageChange} />
                </Stack>
            </div>
            <div>
                <SlideHouse dataHouseAll={dataHouseAll} />
            </div>
        </div>
    );
}

export default Main;
