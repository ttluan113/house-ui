import classNames from 'classnames/bind';
import styles from './Main.module.scss';

import { useEffect, useState } from 'react';

import UiBuyHouse from '../UiBuyHouse/UiBuyHouse';
import CardBody from '../CardBody/CardBody';
import { requestGetAllHouse } from '../../Config';

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
                        <UiBuyHouse />
                    </div>
                </div>
            </div>
            <div className={cx('main')}>
                <h3>Gợi ý cho bạn</h3>
                <div className={cx('form-card')}>
                    {dataHouseAll.slice(0, 8).map((house) => (
                        <CardBody key={house?.postId} house={house} />
                    ))}
                </div>

                {/* <div className={cx('btn-watch-all')}>
                    <button>Xem Tất Cả</button>
                </div> */}
            </div>
        </div>
    );
}

export default Main;
