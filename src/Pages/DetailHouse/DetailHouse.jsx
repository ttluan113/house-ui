import classNames from 'classnames/bind';
import styles from './DetailHouse.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState } from 'react';
import { requestGetOneHouse } from '../../Config';

import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function DetailHouse() {
    const { id } = useParams();

    const [dataHouse, setDataHouse] = useState({});

    const [activeBtn, setActiveBtn] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetOneHouse(id);
            setDataHouse(res);
        };
        fetchData();
    }, []);

    console.log(dataHouse);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('img-detail')}>
                    <div className={cx('img-big')}>
                        {dataHouse.property?.images[0] && <img src={dataHouse.property.images[0]} alt="big-img" />}
                    </div>
                    <div className={cx('img-small')}>
                        {dataHouse.property?.images.slice(1).map((img, index) => (
                            <img key={index} src={img} alt={`img-${index}`} />
                        ))}
                    </div>
                </div>
                <div className={cx('btn-detail')}>
                    <button onClick={() => setActiveBtn(0)} id={cx(activeBtn === 0 && 'active-button')}>
                        Giá Bán
                    </button>
                    <button onClick={() => setActiveBtn(1)} id={cx(activeBtn === 1 && 'active-button')}>
                        Tiện ích
                    </button>
                </div>
                <div className={cx('info-house')}>
                    <h2 style={{ color: '#000' }}>{dataHouse.property?.title}</h2>
                    <h4>Mô Tả Căn Nhà</h4>
                    <div className={cx('column-detail')}>
                        <div className={cx('info-house-1')}>
                            <span>Giá Bán</span>
                            <p>{Number(dataHouse.property?.price).toLocaleString()} VND</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Địa Chỉ</span>
                            <p>{`${dataHouse.property?.location} - ${dataHouse.property?.phuong} - ${dataHouse.property?.district} - ${dataHouse.property?.province}`}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Phòng</span>
                            <p>{dataHouse.property?.sophong || 0}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Tầng</span>
                            <p>{dataHouse.property?.soTang || 0}</p>
                        </div>
                        <div className={cx('info-house-1')}>
                            <span>Số Toilet</span>
                            <p>{dataHouse.property?.soToilet || 0}</p>
                        </div>
                        {/* <div className={cx('info-house-1')}>
                            <span>Tình trạng bàn giao</span>
                            <p>Đang thuê</p>
                        </div> */}
                    </div>
                    <div className={cx('des')}>
                        <p>{dataHouse.property?.description}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailHouse;
