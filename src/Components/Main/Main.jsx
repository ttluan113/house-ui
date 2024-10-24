import classNames from 'classnames/bind';
import styles from './Main.module.scss';

import { useEffect, useState } from 'react';

import UiBuyHouse from '../UiBuyHouse/UiBuyHouse';
import CardBody from '../CardBody/CardBody';
import { requestGetAllHouse } from '../../Config';
import SlideHouse from '../SlideHouse/SlideHouse';

const cx = classNames.bind(styles);

function Main() {
    const [isActiveButton, setIsActiveButton] = useState(2);

    const [dataHouseAll, setDataHouseAll] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllHouse();
            setDataHouseAll(res);
        };
        fetchData();
    }, []);

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
                    {dataHouseAll?.length > 0 ? (
                        dataHouseAll.slice(0, 8).map((house) => <CardBody key={house?.postId} house={house} />)
                    ) : (
                        <p>No houses available</p> // Hoặc hiển thị gì đó khi không có dữ liệu
                    )}
                </div>
            </div>
            <div>
                <SlideHouse dataHouseAll={dataHouseAll} />
            </div>
        </div>
    );
}

export default Main;
