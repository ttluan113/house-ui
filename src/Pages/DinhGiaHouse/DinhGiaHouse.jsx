import classNames from 'classnames/bind';
import styles from './DinhGiaHouse.module.scss';

import Header from '../../Components/Header/Header';
import imgBgr from '../../assets/img/test.png';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';

import axios from 'axios';
import HouseChungCu from './Components/HouseChungCu/HouseChungCu';
import HouseNhaDat from './Components/HouseNhaDat/HouseNhaDat';

const cx = classNames.bind(styles);

function DinhGiaHouse() {
    useEffect(() => {
        document.title = 'Thông tin định giá';
    }, []);

    const [checkData, setCheckData] = useState(false);

    const [checkTab, setCheckTab] = useState(0);

    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

    const data = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Dữ liệu theo tháng',
                data: [30, 25, 35, 50, 55, 45, 60, 70, 65, 75, 85, 90],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Để làm đường mịn hơn
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('search')}>
                    <img src={imgBgr} alt="" />
                    <div className={cx('form-search')}>
                        <div>
                            <h1>Xác định giá trị bất động sản nhanh và chính xác nhất</h1>
                            <div style={{ display: 'flex', gap: '20px', paddingTop: '30px' }}>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>1,110+ dự án</span>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>5,247,000+ BĐS đã xác thực</span>
                                <span style={{ fontSize: '23px', fontWeight: '500' }}>1,000,000+ lượt định giá</span>
                            </div>
                        </div>

                        <div className={cx('form')}>
                            <div className={cx('title')}>
                                <h4>Định Giá Căn Hộ Chung Cư</h4>
                            </div>

                            <div className={cx('form-btn')}>
                                <button onClick={() => setCheckTab(0)} id={cx(checkTab === 0 ? 'active' : '')}>
                                    Nhà Đất
                                </button>
                                <button onClick={() => setCheckTab(1)} id={cx(checkTab === 1 ? 'active' : '')}>
                                    Chung Cư
                                </button>
                            </div>

                            {checkTab === 1 ? <HouseChungCu /> : <HouseNhaDat />}

                            <button
                                onClick={() => setCheckData(!checkData)}
                                style={{ width: '100%' }}
                                type="button"
                                class="btn btn-primary"
                            >
                                Định Giá Ngay
                            </button>
                        </div>
                    </div>
                </div>
                {checkData ? (
                    <div className={cx('chart')}>
                        <h4>Dữ Liệu Định Giá</h4>
                        <Line data={data} options={options} />
                    </div>
                ) : (
                    <></>
                )}
            </main>
        </div>
    );
}

export default DinhGiaHouse;
